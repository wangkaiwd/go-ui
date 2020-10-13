// 1. 面向对象的写法
// 2. 函数式
import Lazy from '@/components/lazy-load/lazy';

let _Vue = undefined;
const install = (Vue, options) => {
  _Vue = Vue;
  const lazy = new Lazy(options);
  Vue.directive('lazy', {
    bind: lazy.add.bind(lazy),
    unbind: lazy.destroy.bind(lazy)
  });
};

// 导出的内容会随着变量的更新而更新
export { _Vue };
export default install;
