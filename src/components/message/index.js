import Message from './message';

let instance = undefined;
const createMessage = (Vue, options) => {
  const Constructor = Vue.extend(Message);
  instance = new Constructor({
    propsData: options
  });
  const el = instance.$mount().$el;
  document.body.appendChild(el);
};
const install = (Vue) => {
  const $message = Vue.prototype.$message = function (options) {
    if (instance) {
      instance.close();
    }
    createMessage(Vue, options);
  };
  const types = ['info', 'success', 'warning', 'error'];
  types.forEach(type => {
    $message[type] = function (options) {
      options.type = type;
      $message(options);
    };
  });
};

// 使用 Vue.use(GoMessage,options)
// this.$message.success('success')
// this.$message.warning('warning')
// this.$message.info('info')
// this.$message.error('error')
export default install;
