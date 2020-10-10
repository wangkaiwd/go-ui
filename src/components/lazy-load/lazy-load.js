import { getScrollParent } from '@/components/lazy-load/util';

const onScroll = function (e) {
  // console.log('scrollTop', e);
  // console.log('scroll');
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
    image.addEventListener('error', resolve);
  });
}

const load = function (el, src) {
  const { loading, error } = el.options;
  el.src = loading;
  asyncImageLoader(src).then(() => {
    el.src = src;
    el.loaded = true;
  }, () => {el.src = error;});
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
const install = (Vue, options) => {
  Vue.directive('lazy', {
    inserted (el, binding) {
      el.options = options;
      const parent = getScrollParent(el);
      parent.addEventListener('scroll', onScroll);
      if (!el.loaded && inView(parent, el)) {
        load(el, binding.value);
      }
    }
  });
};

export default install;

