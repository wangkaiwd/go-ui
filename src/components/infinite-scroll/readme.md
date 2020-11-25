## 无限滚动组件
> * 源码地址
> * `demo`演示

组件效果如下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-11-25-11%3A32.gif)
当我们滚动列表内容到底部的时候，会自动加载新的内容到列表容器中，而不是一次性请求所有内容。

下面我们会通过`Vue`中的自定义指令来一步步实现该组件。

### 使用组件
首先需要通过`Vue.use`来注册组件，之后为需要滚动的列表容器添加`v-infinite-scroll`指令。代码如下：
```vue
<template>
  <div class="infinite-scroll">
    <div class="list">
      <ul
        v-infinite-scroll="load"
        infinite-scroll-distance="60"
        infinite-scroll-disabled="disabled"
        infinite-scroll-immediate="immediate"
      >
        <li class="item" v-for="i in count" :key="i">{{ i }}</li>
      </ul>
      <p class="load-text" v-if="disabled && hasMore">loading...</p>
      <p class="load-text" v-if="!hasMore">
        no more!
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import InfiniteScroll from './infinite-scroll'
Vue.use(InfiniteScroll)
export default {
  name: 'InfiniteScroll',
  data () {
    return {
      count: 0,
      disabled: false,
      hasMore: true,
      immediate: true
    };
  },
  methods: {
    load () {
      if (this.count >= 40) {
        return this.hasMore = false;
      }
      this.disabled = true;
      setTimeout(() => {
        this.count += 5;
        this.disabled = false;
      }, 1000);
    }
  }
};
</script>
```
需要注意的是，组件的参数通过`html`属性传入，传入的值为字符串，并且要和`data`中返回的属性相对应。

用户加载数据的方法`load`会传递到`v-infinite-scroll`指令中。当数据进行加载或没有更多数据时，要将滚动加载禁用，当数据请求完成时，恢复滚动加载。

### 实现组件的基础结构
由于该组件通过`Vue.use`进行使用，我们需要为组件暴露`install`方法: 
```javascript
const scope = 'GoInfiniteScroll'; // 之后可以以该值为`key`，进行数据共享 
const install = (Vue) => {
  Vue.directive('infinite-scroll', {
    name: scope,
    bind (el, binding, VNode) { // 只会调用一次，当指令被第一次绑定到元素的时候调用。在这里你可以做一次性的初始化设置工作 
      Vue.nextTick(() => {
        // 可以进行dom操作
      });
    },
    unbind (el) {
      // do something ...
    }
  });
};
```

当用户为元素绑定了`v-infinite-scroll`指令后，组件中会进行如下逻辑：
* 找到元素对应的最近的设置滚动的父元素
* 处理用户传入的配置项
* 为父元素添加滚动事件
* 当用户滚动时，要计算列表内容是否小于："容器的高度" + "容器被卷去的高度(`scrollTop`)" + "列表的预加载距离"，如果小于会执行`load`方法进行加载

下面画图来解释下这个逻辑：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201125144455.png)

### 滚动到底部加载列表元素
在自定义指令的`bind`钩子函数中，我们可以拿到绑定指令的元素:`el`，找到容器元素，并且会处理用户传入的配置项来配合后续逻辑的书写。最后为容器元素绑定`scroll`事件，实现滚动到底部加载加载列表元素。
```javascript
const install = (Vue) => {
  Vue.directive('infinite-scroll', {
    name: scope,
    bind (el, binding, VNode) { 
      Vue.nextTick(() => {
        // 获取容器元素
        const container = getContainer(el);
        const vm = VNode.context;
        // 处理组件选项
        const { immediate, delay } = getOptions(el, vm);
        const onScroll = throttle(scrollHandler, delay).bind(container, el, binding.value);
        // 函数之间的共享变量放到这里
        el[scope] = { container, onScroll, vm };
        // 为容器元素绑定滚动事件
        container.addEventListener('scroll', onScroll);
      });
    },
  });
};
```

接下来我们分别看下每一个步骤的对应逻辑。

首先我们会通过`while`循环不停的查找组件的父元素，如果其设置了`overflow:auto`、`overflow:scroll`、`overflow-y:scroll`、`overflow-y:auto`属性中的一个，即将该元素返回，作为容器元素
```javascript
const getContainer = (el) => {
  let container = el;
  while (container) {
    if (container === document) {
      return container;
    }
    const { overflowY, overflow } = getComputedStyle(container);
    const regexp = /auto|scroll/;
    if (regexp.test(overflow) || regexp.test(overflowY)) {
      return container;
    }
    container = container.parentNode;
  }
};
```

在处理配置项时，会在代码中先定义一些默认配置。之后会获取指令绑定元素中传入的以`infinite-scroll`开头的属性，通过其属性值在用户使用的组件实例中进行查找。如果用户传入了对应配置，以用户传入的为主，否则使用默认配置
```javascript
const defaultProps = {
  disabled: false,
  distance: 0,
  immediate: true,
  delay: 200
};
const getOptions = (el, vm) => {
  return Object.entries(defaultProps).reduce((options, [key, val]) => {
    const attr = el.getAttribute(`infinite-scroll-${key}`);
    // 在组件实例中查找用户是否提供了该配置，否则使用默认配置
    options[key] = vm[attr] ?? val;
    return options;
  }, {});
};
```
在每次需要对应的选项的时候，都需要通过调用该方法来获取到最新的选项值。

在容器的`scroll`事件中，会根据用户传入的配置项来计算出需要加载数据的高度，如果真实的列表数据高度小于前者，那么执行`load`方法进行数据加载
```javascript
// 在指定时间内只触发一次
function throttle (fn, delay) {
  let timerId = null;
  return function (...args) {
    if (timerId) {return;}
    timerId = setTimeout(() => {
      fn.call(this, ...args);
      timerId = null;
    }, delay);
  };
}
function scrollHandler (el, load) {
  // 如果没有加载到指定高度，就会调用load方法进行加载
  const { vm, observer } = el[scope];
  const { disabled, distance } = getOptions(el, vm);
  if (disabled) {return;}
  // 需要加载数据的高度
  const loadHeight = this.offsetHeight + distance + this.scrollTop;
  const scrollHeight = this.scrollHeight;
  if (scrollHeight <= loadHeight) {
    load();
  }
}
```
由于滚动事件触发过于频繁，在代码中对其进行了节流操作：在前一个定时器没有完成前，不会再设置新的定时器。这样保证了在特定时间内，滚动事件只会触发一次。

### 首次数据填满屏幕
当用户传入`infinite-scroll-immediate`属性传入`true`时，会自动将列表数据加载至充满当前"容器区域 + 预加载区域(`distance`)"。

这里我们使用`MutationObserver`来帮助我们监听容器元素中子元素的内容变化，当其内容发生变化，便执行`load`方法进行加载数据。加载数据后会继续导致容器子元素发生变化，进而继续触发`load`事件，直到充满"容器"。
```javascript
const install = (Vue) => {
  Vue.directive('infinite-scroll', {
    name: scope,
    bind (el, binding, VNode) {
      Vue.nextTick(() => {
        const container = getContainer(el);
        const vm = VNode.context;
        const { immediate, delay } = getOptions(el, vm);
        const onScroll = throttle(scrollHandler, delay).bind(container, el, binding.value);
        el[scope] = { container, onScroll, vm };
        // 如果传入immediate，首次会先将内容加载至充满"容器"
        if (immediate) {
          const observer = el[scope].observer = new MutationObserver(onScroll);
          // 监听子节点的变化
          observer.observe(container, {
            childList: true,
            subtree: true
          });
          // 先手动加载一次数据
          onScroll();
        }
        container.addEventListener('scroll', onScroll);
      });
    },
  });
};
```
这里我们在`el[scope]`对象中添加了`observer`属性，之后可以在首屏加载完毕后将`observer`断开连接，防止对事件进行不必要的触发：
```javascript
function scrollHandler (el, load) {
  // 1. 如果没有加载到指定高度，就会调用load方法进行加载
  const { vm, observer } = el[scope];
  const { disabled, distance } = getOptions(el, vm);
  if (disabled) {return;}
  const loadHeight = this.offsetHeight + distance + this.scrollTop;
  const scrollHeight = this.scrollHeight;
  if (scrollHeight <= loadHeight) {
    load();
  }
  // 首屏加载完成后，如果有observer属性，将其断开连接，并且置为null
  if ((scrollHeight > loadHeight) && observer) {
    observer.disconnect();
    el[scope].observer = null;
  }
}
```

这样就可以先帮用户将首屏数据加载完毕，之后在滚动到底部后继续加载新内容。

### 结语
代码与实现参考了[`element ui`](https://github.com/ElemeFE/element/blob/dev/packages/infinite-scroll/src/main.js) ,感兴趣的小伙伴可以去阅读源码。

组件的实现主要是依赖于原生`dom`操作，一步步实现组件可以帮助我们很好的巩固和掌握原生`dom`操作的相关知识点。希望在看完本篇教程后，大家能掌握组件实现的核心思路，可以自己实现组件。

最后，如果文章内容对你有帮助的话，请点赞鼓励一下作者😬!
