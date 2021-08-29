import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
