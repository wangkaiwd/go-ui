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
const getOptions = (el, vm) => {
  return Object.entries(defaultProps).reduce((options, [key, val]) => {
    const attr = el.getAttribute(`infinite-scroll-${key}`);
    options[key] = vm[attr] ?? val;
    return options;
  }, {});
};

function scrollHandler (el, load) {
  // 1. 如果没有加载到指定高度，就会调用load方法进行加载
  const { vm, observer } = el[scope];
  const { disabled, distance } = getOptions(el, vm);
  if (disabled) {return;}
  const loadHeight = this.offsetHeight + distance + this.scrollTop;
  const scrollHeight = this.scrollHeight;
  if (scrollHeight <= loadHeight) {
    load();
  }
  if ((scrollHeight > loadHeight) && observer) {
    observer.disconnect();
    el[scope].observer = null;
  }
}

// 在指定时间内只触发一次
function throttle (fn, delay) {
  let timerId = null;
  return function (...args) {
    if (timerId) {return;}
    timerId = setTimeout(() => {
      fn.call(this, ...args);
      timerId = null;
    }, delay);
  };
}

// 如果用户传入immediate: true,需要默认将数据填满container
// MutationObserver: 提供了观察对dom树更改的能力
const install = (Vue) => {
  Vue.directive('infinite-scroll', {
    name: scope,
    bind (el, binding, VNode) { // Only called once, when the directive is first bound to the element. This is where you can do one-time setup work
      Vue.nextTick(() => {
        const container = getContainer(el);
        const vm = VNode.context;
        const { immediate, delay } = getOptions(el, vm);
        const onScroll = throttle(scrollHandler, delay).bind(container, el, binding.value);
        el[scope] = { container, onScroll, vm };
        if (immediate) {
          const observer = el[scope].observer = new MutationObserver(() => {
            return onScroll();
          });
          observer.observe(container, {
            childList: true,
            subtree: true
          });
          onScroll();
        }
        container.addEventListener('scroll', onScroll);
      });
    },
    unbind (el) {
      const { container, onScroll, observer } = el[scope];
      container.removeEventListener('scroll', onScroll);
      if (observer) {
        observer.disconnect();
      }
    }
  });
};

export default install;
