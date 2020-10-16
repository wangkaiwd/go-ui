import Main from './message';

const install = (Vue) => {
  let instance = undefined;
  const Message = function (options) {
    if (instance) {
      instance.close();
    }
    createMessage(Vue, options);
  };

  const createMessage = (Vue, options) => {
    const Constructor = Vue.extend(Main);
    if (typeof options === 'string') {
      options = { message: options };
    }
    instance = new Constructor({
      propsData: options
    });
    const el = instance.$mount().$el;
    document.body.appendChild(el);
  };

  const types = ['info', 'success', 'warning', 'error'];
  types.forEach(type => {
    Message[type] = function (options) {
      if (typeof options === 'string') {
        options = { message: options };
      }
      options.type = type;
      Message(options);
    };
  });

  Vue.prototype.$message = Message;
};
export default install;
