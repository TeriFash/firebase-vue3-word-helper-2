import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useTabActive } from '@utils/utils';
import Layout from '@/layouts/Layout.vue';
import Blank from '@/components/Blank.vue';
import NotFound from '@/components/NotFound.vue';

// import Home from '@/views/Home.vue';
import Account from '@/views/Account.vue';
import About from '@/views/About.vue';
import Words from '@/views/Words.vue';

const routeChildren: Array<RouteRecordRaw> = [
  {
    path: '',
    component: Words, //Home,
    meta: {
      tabbar: true,
    },
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'account',
    component: Account,
  },
  {
    path: 'words',
    component: Words,
    meta: {
      tabbar: true,
    },
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/:lang',
        component: Blank,
        children: routeChildren,
      },
      {
        path: '',
        component: Blank,
        children: routeChildren,
        beforeEnter(to, from, next) {
          const tabbar = to.matched.some((record) => record.meta?.tabbar);
          if (tabbar) {
            useTabActive();
            next();
          }
          next();
        },
      },
    ],
  },
  {
    path: '/:page(.*)',
    name: 'NotFoundPage',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
