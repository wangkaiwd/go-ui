import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/styles/reset.scss';
// import '@/shared/autoRegister';
import GoButton from '@/components/button/button';
import GoIcon from '@/components/icon/icon';

Vue.component(GoButton.name, GoButton);
Vue.component(GoIcon.name, GoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
