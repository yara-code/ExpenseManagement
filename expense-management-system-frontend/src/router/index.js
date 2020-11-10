import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";
import Expense from "../views/Expense";
import Landing from "../views/Landing";
import Login from "../views/Login";
import SignUp from "../views/SignUp";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/index',
    name: 'landing',
    component: Landing
  },
  {
    path: '/index.html',
    name: 'landing',
    component: Landing
  },
  {
    path: '/landing',
    name: 'landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/expense',
    name: 'expense',
    component: Expense
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
