import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/reset.scss";

import GoButton from "@/components/go-button/go-button";
import GoIcon from "@/components/go-icon/go-icon";

Vue.use(GoButton.name, GoButton);
Vue.use(GoIcon.name, GoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
