## 无限滚动组件
* 理解其功能和界面效果

### 逻辑
* 滚动到底部，加载更多数据
* 需要加载的距离设置
* 禁用更新
* 优化滚动事件

### 原理
* 找到设置`v-infinite-scroll`指令指定的元素以及距其最近的滚动的父元素
* 用户会传入滚动距离`distance`
* 滚动元素高度 + 滚动距离 + 滚动元素内部滚出滚动元素的高度 如果 大于 滚动元素的scrollHeight，说明需要加载内容，执行用户传入的`load`方法


### 自定义指定代码优化思考
#### `LazyLoad`组件
* 在`unbind`中使用`dom`操作，需要使用`Vue.nextTick`保证`dom`加载完毕
* 跨函数之间共享变量(参考`element ui`)：
  * 可以定义一个`scope`,其值为`GoInfiniteScroll`，之后会将所有的全局共享的信息都作为对象放到`el[scope]`中，方便在不同函数和自定义指令生命周期中使用
  * [define](https://github.com/wangkaiwd/js-deep/blob/cd2c105b2b75199df4041186f644ca31eba651a7/advanced/vue-usage/vue-components/src/components/directives/infinite-scroll.js#L46)
  * [usage](https://github.com/wangkaiwd/js-deep/blob/cd2c105b2b75199df4041186f644ca31eba651a7/advanced/vue-usage/vue-components/src/components/directives/infinite-scroll.js#L59-L6)
* 整理其核心思路
  
