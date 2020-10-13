// 1. 面向对象的写法
// 2. 函数式
import Lazy from '@/components/lazy-load/lazy';

const install = (Vue, options) => {
  const lazy = new Lazy(Vue,options);
  Vue.directive('lazy', {
    bind: lazy.add.bind(lazy),
    unbind: lazy.destroy.bind(lazy)
  });
};

export default install;
