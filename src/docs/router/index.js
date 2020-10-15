import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/docs/home')
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import('@/docs/example'),
    children: [
      {
        path: '/button',
        name: 'Button',
        component: () => import('@/demo/button')
      },
      {
        path: '/icon',
        name: 'Icon',
        component: () => import('@/demo/icon')
      },
      {
        path: '/layout',
        name: 'Layout',
        component: () => import('@/demo/layout')
      },
      {
        path: '/grid',
        name: 'Grid',
        component: () => import('@/demo/grid')
      },
      {
        path: '/lazy-load',
        name: 'LazyLoad',
        component: () => import('@/demo/lazy-load')
      },
      {
        path: '/tabs',
        name: 'Tabs',
        component: () => import('@/demo/tabs')
      },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
