## go ui 组件库
项目技术栈：
* `vue` + `vue-router`
* `scss`
### `CSS`约定
* 组件的类名要以`go-`开头

### 制作`logo`
* [logo maker](https://hatchful.shopify.com/)

### 问题记录
#### `Button`
* 如何添加`loading`出现时的动画，而不至于效果太生硬？

#### `Grid`
* `Col`组件中最好放一个`div`，否则会出现内容超出的问题
* 由于为`Row`组件设置了负`margin`，所以会将`Row`以及`Col`撑开，导致这俩个组件对应的根`div`会大于预期内容的宽度
* col中如何接收gutter属性：
    1. this.$parent
    2. parent: assign value to each $children instance
    3. provide/inject

#### `Tabs`
如何显示`tab label`列表 ？  
* 在`tabs`中遍历`$children`属性，并获取到它的`label`属性
* 传入一个方法，用于获取子组件的实例，但是这里是通过`slot`来建立父子组件的关系，所以无法通过`props`传参
* `offsetHeight`: height + padding + border + height of scrollbar
* `clientHeight`: height + padding

#### `Message`
* 如何实现组件动画？
  * 内部设置一个`visible`变量，默认为`false`,控制根元素的显示和隐藏，方便动画
  * 在`mounted/created`钩子中可以将`visible`设置为`true`, 此时会触发`transition`组件的进入动画，并添加进入的CSS类名
  * 在组件销毁之前，将`visible`设置为`false`，此时会触发`transition`组件的离开动画，并添加CSS离开类名，以及触发`@after-leave`钩子
  * `@after-leave`钩子会保证离开动画完成后执行，在此钩子函数中执行组件销毁操作
    
#### `LazyLoad`
[illustration](https://excalidraw.com/#json=5945096507752448,hzn3v29a-PoMgRyPdWtRgw)

lifecycle hooks:
* bind: 只调用一次，当指令被第一次绑定到元素的时候。这里你可以做一次性启动工作
* inserted: 在绑定元素已经插入到它的父节点时调用(这只保证父节点存在，不一定在`document`中)
* scrollHeight: 测量一个元素内容高度的只读属性，包括由于`overflow`在屏幕上不可见的内容

知识点：  
* export 导出的变量，在文件内更新以后，导出的变量也会更新
* directive hooks: 
  * bind: 此时还不能获取到绑定指令的元素，可以通过`Vue.$nextTick`来保证`DOM`更新后获取最新的`DOM`
  * inserted: 在绑定元素已经被插入到它的父节点的时候调用(这只能保证父节点存在，不一定在文档内)

思路整理： 
1. 使用方式
    ```jsx
    import Vue from 'vue'
    import LazyLoad from 'lazy-load'
    // 之后就可以全局通过`v-lazy`指令进行使用
    Vue.use(LazyLoad,{
    	preload: 1.3,
    	error: '@/demo/error.png',
    	loading: '@/demo/loading.png'
    })
    ```
2. 文档阅读
    1. `Vue.use` 方法
    2. `custom directive` 
3. 根据绑定指令元素查找其最近的设置`overflow:scroll` 的父元素，作为滚动容器
4. 根据`preload` 计算出需要加载图片的区域
5. 检查所有绑定指令的元素是否在加载区域内
6. 如果在加载区域内，需要进行异步加载，异步加载过程如下：
    1. 创建一个假的`img` HTML元素，地址为真实图片的地址
    2. 监听`img` HTML元素的事件，模拟其加载过程
    3. 加载完成后，为真实的`img` 标签设置`src` 的值
7. 监听父元素的滚动事件，滚动后，判断所有绑定指令的元素是否在加载区域内，如果是，调用`load` 
8. 滚动事件比较耗费性能，可以通过节流函数来进行优化，特定时间内只执行一次滚动函数
