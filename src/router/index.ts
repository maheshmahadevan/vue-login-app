import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//import Home from '../views/Home.vue'
import Main from '../views/Main.vue';
import Profile from '../views/Profile.vue';
import ExternalApiView from '../views/ExternalApi.vue';
import {routeGuard} from '../auth/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    beforeEnter: routeGuard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: routeGuard
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: routeGuard
  },
  {
    path: '/external-api',
    name: 'external-api',
    component: ExternalApiView,
    beforeEnter: routeGuard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
