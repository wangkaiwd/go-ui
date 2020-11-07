const scope = 'GoInfiniteScroll';
const defaultProps = {
  disabled: false,
  distance: 40,
  immediate: true,
  delay: 300
};
const getContainer = (el) => {
  let container = el;
  while (container) {
    if (container === document) {
      return container;
    }
    const { overflowY, overflow } = getComputedStyle(container);
    const regexp = /auto|scroll/;
    if (regexp.test(overflow) || regexp.test(overflowY)) {
      return container;
    }
    container = container.parentNode;
  }
};
const getOptions = (el) => {
  return Object.entries(defaultProps).reduce((options, [key, val]) => {
    options[key] = el.getAttribute(`infinite-scroll-${key}`) ?? val;
    return options;
  }, {});
};

function handleScroll (el, load, e) {
  // 1. 如果没有加载到指定高度，就会调用load方法进行加载
  const { distance } = getOptions(el);
  const loadHeight = this.offsetHeight + Number(distance) + this.scrollTop;
  const scrollHeight = this.scrollHeight;
  if (scrollHeight <= loadHeight) {
    load();
  }
}

const install = (Vue) => {
  Vue.directive('infinite-scroll', {
    name: scope,
    bind (el, binding) { // Only called once, when the directive is first bound to the element. This is where you can do one-time setup work
      Vue.nextTick(() => {
        const container = getContainer(el);
        const onScroll = handleScroll.bind(container, el, binding.value);
        el[scope] = {
          container
        };
        container.addEventListener('scroll', onScroll);
      });
    }
  });
};

export default install;
