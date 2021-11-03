import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login.vue"
import Index from '@/components/index.vue'
import Registerp from '@/components/registerp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registerp',
      name: 'registerp',
      component: Registerp

    }
  ]
})
