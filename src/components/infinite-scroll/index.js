const key = '_infinite-scroll';
const getScrollParent = (el) => {
  let parent = el;
  while (parent) {
    if (parent === window) {
      return parent;
    }
    const { overflow, overflowY } = getComputedStyle(el);
    const reg = /auto|scroll/;
    // 找出最近的滚动父元素
    if (reg.test(overflow) || reg.test(overflowY)) {
      return parent;
    }
    parent = parent.parentNode;
  }
};
const loadData = (parent, el, load) => {
  const loadHeight = parent.scrollTop + el[key].infiniteScrollDistance + parent.offsetHeight;
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
        el[key] = { infiniteScrollDistance };
        const parent = getScrollParent(el);
        parent.addEventListener('scroll', onScroll.bind(parent, el, binding.value));
      });
    }
  });
};

export default install;
