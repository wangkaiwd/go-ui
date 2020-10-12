import { _Vue } from '@/components/lazy-load/index';
import ReactiveListener from '@/components/lazy-load/reactiveListener';

class Lazy {
  constructor (options) {
    this.options = options;
    this.listenerQueue = [];
    this.hasBindScroll = false;
  }

  add (el, binding) {
    // 确保能获取到dom元素
    _Vue.$nextTick(() => {
      const parent = this.getScrollParent(el);
      if (!this.hasBindScroll) {
        parent.addEventListener('scroll', this.lazyHandler.bind(this));
        this.hasBindScroll = true;
      }
      const listener = new ReactiveListener({ el, src: binding.value });
      this.listenerQueue.push(listener);
    });
  }

  lazyHandler () {

  }

  getScrollParent (el) {
    let parent = el.parentNode;
    while (parent && parent !== window) {
      // 返回一个对象，该对象包含在应用激活的样式表和解析这些值可能包含的任何基础计算后的一个元素的所有CSS属性值。
      // 单独的CSS属性值通过对象提供的APIs或者通过CSS属性名索引访问
      const { overflow, overflowY } = getComputedStyle(parent);
      if (/scroll|auto/.test(overflow) || /scroll|auto/.test(overflowY)) {
        break;
      }
      parent = parent.parentNode;
    }
    return parent;
  }
}

export default Lazy;
