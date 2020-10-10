import { getScrollParent } from '@/components/lazy-load/util';

// diagram: https://excalidraw.com/#json=5687798237495296,zq8RZQuzBC1jbVIr9C7lDw
const loadItems = [];
// throttle: 每等待的毫秒之间最多调用函数一次
const throttle = (handler, time = 0) => {
  let timerId = null;
  return function (...args) {
    if (timerId) {return;}
    timerId = setTimeout(() => {
      handler(...args);
      timerId = null;
    }, time);
  };
};
const onScroll = function (e) {
  loadItems.forEach(({ el, src }) => {
    if (!el.state && inView(e.target, el)) {
      load(el, src);
    }
  });
};
const inView = function (parent, el) {
  const { height, top } = parent.getBoundingClientRect();
  const { top: elTop } = el.getBoundingClientRect();
  const { preload } = el.options;
  return elTop - height * preload < top;
};

// 通过新创建一个图片，只是用来模拟图片的加载过程
function asyncImageLoader (src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
  });
}

const load = function (el, src) {
  const { loading, error } = el.options;
  el.src = loading;
  el.state = 'loading';
  asyncImageLoader(src).then(
    () => {
      el.src = src;
      el.state = 'loaded';
    },
    () => {
      el.src = error;
      el.state = 'error';
    }
  );
};

// illustrate: https://excalidraw.com/#json=5662514637438976,7QpXQ40OSUH8xaw1jbiH-Q
// lifecycle hooks:
// bind: 只调用一次，当指令被第一次绑定到元素的时候。这里你可以做一次性启动工作
// inserted: 在绑定元素已经插入到它的父节点时调用(这只保证父节点存在，不一定在`document`中)
// scrollHeight: 测量一个元素内容高度的只读属性，包括由于`overflow`在屏幕上不可见的内容
// 思路：
//  1. 找到设置overflow的父元素
//  2. 通过dom操作计算出元素是否在图片加载区域内
//  3. 如果在加载区域内的话，通过new Image()或者document.createElement('img')来创建一个"假"的img标签
//  4. img标签的src为真实的src,用于模拟加载过程，在加载成功和失败后分别进行对应的处理
//  5. 监听父元素的滚动事件，每次滚动都要计算所有添加指令的图片子元素是否在容器中，如果在并且没有加载过的话，进行加载
//  6. 通过节流优化滚动事件
const install = (Vue, options) => {
  Vue.directive('lazy', {
    inserted (el, binding) {
      el.options = options;
      const parent = getScrollParent(el);
      if (!el.state && inView(parent, el)) {
        load(el, binding.value);
      }
      // 要对每一个el都进行判断
      // 在滚动的时候继续进行加载文件
      loadItems.push({ el, src: binding.value });
      const scroll = throttle(onScroll, 300);
      parent.removeEventListener('scroll', scroll);
      parent.addEventListener('scroll', scroll);
    }
  });
};

export default install;

