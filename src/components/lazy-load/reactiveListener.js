class ReactiveListener {
  constructor (options) {
    this.el = options.el;
    this.src = options.src;
  }

  checkInView (parent) {

  }

  load () {

  }

  loadImage (resolve, reject) {
    const image = new Image();
    image.src = this.src;
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
  }
}

export default ReactiveListener;
