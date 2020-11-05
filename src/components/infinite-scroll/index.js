const scope = 'GoInfiniteScroll';
// set default props for components
// user will pass it by html attributes
const defaultProps = {

};
const getContainer = (el) => {
  let container = el;
  while (container) {
    if (container === document) {
      return container;
    }
    const { overflow, overflowY } = getComputedStyle(el);
    const reg = /auto|scroll/;
    // 找出最近的滚动父元素
    if (reg.test(overflow) || reg.test(overflowY)) {
      return container;
    }
    container = container.parentNode;
  }
};
const loadData = (parent, el, load) => {
  const loadHeight = parent.scrollTop + el[scope].infiniteScrollDistance + parent.offsetHeight;
  const scrollHeight = parent.scrollHeight;
  if (scrollHeight <= loadHeight) {
    load();
  }
};
const onScroll = function (el, load) {
  loadData(this, el, load);
};

const install = (Vue) => {
  Vue.directive('infinite-scroll', {
    bind (el, binding) {
      Vue.nextTick(() => {
        const infiniteScrollDistance = Number(el.getAttribute('infinite-scroll-distance'));
        el[scope] = { infiniteScrollDistance };
        const container = getContainer(el);
        container.addEventListener('scroll', onScroll.bind(container, el, binding.value));
      });
    },
    unbind (el) {

    }
  });
};

export default install;
