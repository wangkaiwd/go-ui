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
      { path: '/button', name: 'Button', component: () => import('@/demo/button/button') },
      { path: '/icon', name: 'Icon', component: () => import('@/demo/icon/icon') },
      { path: '/layout', name: 'Layout', component: () => import('@/demo/layout/layout') },
      { path: '/grid', name: 'Grid', component: () => import('@/demo/grid/grid') },
      { path: '/lazy-load', name: 'LazyLoad', component: () => import('@/demo/lazy-load/lazy-load') },
      { path: '/tabs', name: 'Tabs', component: () => import('@/demo/tabs/tabs') },
      { path: '/message', name: 'Message', component: () => import('@/demo/message/message') },
      { path: '/upload', name: 'Upload', component: () => import('@/demo/upload/upload') },
      { path: '/date-picker', name: 'DatePicker', component: () => import('@/demo/date-picker/date-picker') },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
