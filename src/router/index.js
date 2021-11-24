import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login.vue"
import Index from '@/components/index.vue'
import Registerp from '@/components/registerp.vue'
import Main from '@/components/logined/main.vue'
import Qualification from '@/components/logined/producter/qualification.vue'
import Productindemand from '@/components/logined/producter/productInNeed_Table.vue'
import ProductAccountInfo from '@/components/logined/producter/proAccountInfo.vue'

import Message from '@/components/logined/messages.vue'
import Integral from '@/components/logined/producter/integral.vue'
import History from '@/components/logined/producter/history.vue'
import ProductAuthorized from '@/components/logined/producter/productauthorized.vue'

import Authorized from '@/components/logined/purchase/authorized.vue'
import ReleaseProduct from '@/components/logined/purchase/releaseproduct.vue'
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

    },
    {
      path: '/home',
      name: 'home',
      component: Main,
      children: [
        {path: 'qualification',  component: Qualification, },
        {path: 'productindemand', component: Productindemand},
        {path: 'accountinfo', component: ProductAccountInfo,
         children: [
           {path: "messages", component: Message},
           {path: 'integral', component: Integral},
           {path: 'history', component: History},
           {path: 'productauthorized', component: ProductAuthorized},
         ]},

         {path: 'authorized', component: Authorized},
         {path: 'releaseproduct', component: ReleaseProduct}
      ]
    }
  ]
})
