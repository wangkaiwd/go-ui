import { getScrollParent } from '@/components/lazy-load/util';

const loadItems = [];
// throttle: 每次等待的毫秒之间最多调用函数一次
const throttle = (handler, time = 0) => {
  let timerId = null;
  return function (...args) {
    if (timerId) {return;}
    timerId = setTimeout(() => {
      handler(...args);
      timerId = null;
    }, time);
  };
};
const onScroll = function (e) {
  loadItems.forEach(({ el, src }) => {
    if (!el.state && inView(e.target, el)) {
      load(el, src);
    }
  });
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
    image.addEventListener('error', reject);
  });
}

const load = function (el, src) {
  const { loading, error } = el.options;
  el.src = loading;
  el.state = 'loading';
  asyncImageLoader(src).then(
    () => {
      el.src = src;
      el.state = 'loaded';
    },
    () => {
      el.src = error;
      el.state = 'error';
    }
  );
};

const install = (Vue, options) => {
  Vue.directive('lazy', {
    inserted (el, binding) {
      el.options = options;
      const parent = getScrollParent(el);
      if (!el.state && inView(parent, el)) {
        load(el, binding.value);
      }
      // 要对每一个el都进行判断
      // 在滚动的时候继续进行加载文件
      loadItems.push({ el, src: binding.value });
      const scroll = throttle(onScroll, 300);
      parent.removeEventListener('scroll', scroll);
      parent.addEventListener('scroll', scroll);
    }
  });
};

export default install;

