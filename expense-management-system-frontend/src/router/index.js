import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";
import Signup from "../views/Signup";
import Expense from "../views/Expense";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
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
  {
    path: '/signup',
    name: 'SignUp',
    component: Signup
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
