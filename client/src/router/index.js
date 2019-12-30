import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dosing-calculation',
    name: 'dosingCalculation',
    component: () => import('../views/DosingCalculation.vue')
  },
  {
    path: '/data-management',
    name: 'dataManagement',
    component: () => import('../views/DataManagement.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
