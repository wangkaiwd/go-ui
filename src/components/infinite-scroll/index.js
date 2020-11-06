const scope = 'GoInfiniteScroll';
const getContainer = (el) => {
  let container = el;
  while (container) {
    if (container === document) {
      return container;
    }
    const { overflowY, overflow } = getComputedStyle(container);
  }
};
const install = (Vue) => {
  Vue.directive(scope, {
    name: scope,
    bind (el) { // Only called once, when the directive is first bound to the element. This is where you can do one-time setup work

    }
  });
};

export default install;
