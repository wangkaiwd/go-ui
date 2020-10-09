import { getScrollParent } from '@/components/lazy-load/util';

const onScroll = function (e) {
  console.log('scroll');
};
// lifecycle hooks:
//  bind: 只调用一次，当指令被第一次绑定到元素的时候。这里你可以做一次性启动工作
//  inserted: 在绑定元素已经插入到它的父节点时调用(这只保证父节点存在，不一定在`document`中)
const install = (Vue, options) => {
  console.log('options', options);
  Vue.directive('lazy', {
    inserted (el) {
      const parent = getScrollParent(el);
      parent.addEventListener('scroll', onScroll);
      const { height } = parent.getBoundingClientRect();
    }
  });
};

export default install;

