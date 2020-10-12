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
* 由于为`Row`组件设置了负`margin`，所以会将`Row`以及`Col`撑开，导致这俩个组件对应的根`div`会预期内容的宽度
* col中如何接收gutter属性：
    1. this.$parent
    2. parent: assign value to each $children instance
    3. provide/inject
    
#### `LazyLoad`
[illustration](https://excalidraw.com/#json=5687798237495296,zq8RZQuzBC1jbVIr9C7lDw)

lifecycle hooks:
* bind: 只调用一次，当指令被第一次绑定到元素的时候。这里你可以做一次性启动工作
* inserted: 在绑定元素已经插入到它的父节点时调用(这只保证父节点存在，不一定在`document`中)
* scrollHeight: 测量一个元素内容高度的只读属性，包括由于`overflow`在屏幕上不可见的内容

思路：
  1. 找到设置overflow的父元素
  2. 通过dom操作计算出元素是否在图片加载区域内
  3. 如果在加载区域内的话，通过new Image()或者document.createElement('img')来创建一个"假"的img标签
  4. img标签的src为真实的src,用于模拟加载过程，在加载成功和失败后分别进行对应的处理
  5. 监听父元素的滚动事件，每次滚动都要计算所有添加指令的图片子元素是否在容器中，如果在并且没有加载过的话，进行加载
  6. 通过节流优化滚动事件
