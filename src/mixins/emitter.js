const emitter = {
  methods: {
    dispatch (event, params, componentName) {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === componentName) {
          return parent.$emit(event, params);
        }
        parent = parent.$parent;
      }
    },
    broadcast () {

    }
  }
};

export default emitter;
