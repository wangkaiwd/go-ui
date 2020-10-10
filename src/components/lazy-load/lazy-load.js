import { getScrollParent } from '@/components/lazy-load/util';

const onScroll = function (e) {
  console.log('scrollTop', e);
  console.log('scroll');
};
const inView = function () {
  if (true) {
    console.log('需要加载');
  } else {
    console.log('不需要加载');
  }
};
// illustrate: https://excalidraw.com/#json=5662514637438976,7QpXQ40OSUH8xaw1jbiH-Q
// lifecycle hooks:
// bind: 只调用一次，当指令被第一次绑定到元素的时候。这里你可以做一次性启动工作
// inserted: 在绑定元素已经插入到它的父节点时调用(这只保证父节点存在，不一定在`document`中)
// scrollHeight: 测量一个元素内容高度的只读属性，包括由于`overflow`在屏幕上不可见的内容
const install = (Vue, options) => {
  console.log('options', options);
  Vue.directive('lazy', {
    inserted (el) {
      const parent = getScrollParent(el);
      parent.addEventListener('scroll', onScroll);
      const { height } = parent.getBoundingClientRect();
      // 判断el是否在可视范围内
    }
  });
};

export default install;

