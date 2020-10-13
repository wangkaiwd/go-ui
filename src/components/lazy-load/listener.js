class ReactiveListener {
  constructor (options) {
    const { lazyOptions } = options;
    this.el = options.el;
    this.src = options.src;
    this.parent = options.parent;
    this.preload = lazyOptions.preload;
    this.loading = lazyOptions.loading;
    this.error = lazyOptions.error;
    this.state = 'init'; // init, pending, success, failure
  }

  checkInView () {
    const { top, height } = this.parent.getBoundingClientRect();
    const { top: elTop } = this.el.getBoundingClientRect();
    return elTop - height * this.preload < top;
  }

  load () {
    this.state = 'pending';
    this.el.src = this.loading;
    this.loadImage(() => {
      this.state = 'success'
      this.el.src = this.src
    },() => {
      this.state = 'failure'
      this.el.src = this.error
    })
  }

  loadImage (resolve, reject) {
    const image = new Image();
    image.src = this.src;
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
  }
}

export default ReactiveListener;
