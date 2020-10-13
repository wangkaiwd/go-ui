import ReactiveListener from '@/components/lazy-load/listener';

class Lazy {
  constructor (Vue, options) {
    this.Vue = Vue;
    this.options = options;
    this.listenerQueue = [];
    this.hasBindScroll = false;
    this.parent = undefined;
    // 将原型上的方法绑定到自身的属性上
    this.lazyHandler = this.throttle(this.lazyHandler.bind(this), 200);
  }

  add (el, binding) {
    // 确保能获取到dom元素
    this.Vue.nextTick(() => {
      this.parent = this.getScrollParent(el);
      if (!this.hasBindScroll) {
        this.parent.addEventListener('scroll', this.lazyHandler);
        this.hasBindScroll = true;
      }
      const listener = new ReactiveListener({
        el,
        src: binding.value,
        parent: this.parent,
        lazyOptions: this.options
      });
      this.listenerQueue.push(listener);
      this.lazyHandler();
    });
  }

  lazyHandler () {
    this.listenerQueue.forEach(listener => {
      if (listener.checkInView() && (listener.state === 'init')) {
        listener.load();
      }
    });
  }

  throttle (fn, wait = 0) {
    let timerId = null;
    return function (...args) {
      if (timerId) {return;}
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, wait);
    };
  }

  destroy () {
    this.parent.removeEventListener('scroll', this.lazyHandler);
    this.listenerQueue = [];
    this.hasBindScroll = false;
  }

  getScrollParent (el) {
    let parent = el.parentNode;
    while (parent && parent !== window) {
      // 返回一个对象，该对象包含在应用激活的样式表和解析这些值可能包含的任何基础计算后的一个元素的所有CSS属性值。
      // 单独的CSS属性值通过对象提供的APIs或者通过CSS属性名索引访问
      const { overflow, overflowY } = getComputedStyle(parent);
      if (/scroll|auto/.test(overflow) || /scroll|auto/.test(overflowY)) {break;}
      parent = parent.parentNode;
    }
    return parent;
  }
}

export default Lazy;
