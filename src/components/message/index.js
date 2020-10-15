import Message from './message';

const createMessage = (Vue, options) => {
  const Constructor = Vue.extend(Message);
  const instance = new Constructor({
    propsData: {}
  });
  const el = instance.$mount().$el;
  document.body.appendChild(el);
};
const install = (Vue, options) => {
  Vue.prototype.$message = function () {
    createMessage(Vue, options);
  };
};

// 使用 Vue.use(GoMessage,options)
// this.$message.success('success')
// this.$message.warning('warning')
// this.$message.info('info')
// this.$message.error('error')
export default install;
