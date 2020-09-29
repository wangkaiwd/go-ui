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
