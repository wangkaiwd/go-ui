import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/docs/home')
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import('@/docs/example')
  }
];

const router = new VueRouter({
  routes
});

export default router;
