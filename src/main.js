import Vue from 'vue';
import App from './App.vue';
import router from './docs/router';
import '@/assets/styles/index.scss';
import GoButton from '@/components/button/button';
import GoIcon from '@/components/icon/icon';
import GoLayout from '@/components/layout/layout';
import GoMain from '@/components/layout/main';
import GoHeader from '@/components/layout/header';
import GoFooter from '@/components/layout/footer';
import GoAside from '@/components/layout/aside';
import GoCol from '@/components/grid/col';
import GoRow from '@/components/grid/row';
import GoLazyLoad from '@/components/lazy-load';
import GoTabs from '@/components/tabs/tabs';
import GoTabPane from '@/components/tabs/tab-pane';
import GoMessage from '@/components/message/index';
import GoUpload from '@/components/upload/upload';
import GoDatePicker from '@/components/date-picker/date-picker';
import GoDateRangePicker from '@/components/date-picker/date-range-picker';
import GoTable from '@/components/table/table';
import GoInput from '@/components/input/input';

Vue.component(GoButton.name, GoButton);
Vue.component(GoIcon.name, GoIcon);
Vue.component(GoLayout.name, GoLayout);
Vue.component(GoMain.name, GoMain);
Vue.component(GoHeader.name, GoHeader);
Vue.component(GoFooter.name, GoFooter);
Vue.component(GoAside.name, GoAside);
Vue.component(GoRow.name, GoRow);
Vue.component(GoCol.name, GoCol);
Vue.component(GoTabs.name, GoTabs);
Vue.component(GoTabPane.name, GoTabPane);
Vue.component(GoUpload.name, GoUpload);
Vue.component(GoDatePicker.name, GoDatePicker);
Vue.component(GoDateRangePicker.name, GoDateRangePicker);
Vue.component(GoTable.name, GoTable);
Vue.component(GoInput.name, GoInput);

Vue.use(GoLazyLoad, {
  preload: 1.3,
  error: require('@/demo/lazy-load/error.png'),
  loading: require('@/demo/lazy-load/loading.png')
});
Vue.use(GoMessage);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
