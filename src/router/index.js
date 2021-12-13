import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login.vue"
import Index from '@/components/index.vue'
import Registerp from '@/components/registerp.vue'
import Wait from '@/components/wait.vue'
import Main from '@/components/logined/main.vue'




Vue.use(Router)

const constant = [
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
    path: '/wait',
    name: 'wait',
    component: Wait
  },
]
const superadmin = [
  {
    path: '/home',
    name: 'home',
    component: Main,
    children: [
      {
        path: 'manageadmins', 
        component: () => import('@/components/logined/adminSuper/adminpage')
      },
      {
        path: 'manageorganization', 
        component: () => import('@/components/logined/adminSuper/orgnizationPage')
      },
    ]
  }
]
const supplier = [
  {
    path: '/home',
    name: 'home',
    component:Main,
    children: [
      {
        path: 'applyauthor',
        component: () => import('@/components/logined/producter/applyauthor.vue')
      },
      {
        path: 'appliedauthor',
        component: () => import('@/components/logined/producter/appliedauthor.vue')
      },
      {
        path: 'productinneed',
        component: () => import('@/components/logined/producter/productinneed.vue')
      },
      {
        path: 'manageinvitation',
        component: () => import('@/components/logined/producter/manageinvitation.vue')
      },
      {
        path: 'producttocom',
        component: () => import('@/components/logined/producter/producttocom.vue')
      }
    ]
  }
]

const purchase = [
  {
    path: '/home',
    name: 'home',
    component: Main,
    children: [
      {
        path: 'projectauditing',
        component: () => import('@/components/logined/purchase/releaseproduct.vue')
      },
      {
        path: 'auditauthor',
        component: () => import('@/components/logined/purchase/authorized.vue')
      }
    ]
  }
]

const admin = [
  {
    path: '/home',
    name: 'home',
    component: Main,
    children: [
      {
        path: 'auditproject',
        component: () => import('@/components/logined/admin/auditproject.vue')
      },
      {
        path: 'manageproject',
        component: () => import('@/components/logined/admin/manageproject')
      },
      {
        path: 'manageproduct',
        component: () => import('@/components/logined/admin/manageproduct')
      },
      {
        path: 'managetype',
        component: () => import('@/components/logined/admin/managetype')
      },
      {
        path: 'purchase',
        component: () => import('@/components/logined/admin/purchase')
      },
      {
        path: 'supplier',
        component: () => import('@/components/logined/admin/supplier')
      }
    ]
  }
]

const createRouter = () => new Router({
  routes: constant
});


const router = createRouter()

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && localStorage.getItem('role')) {
    next()
  }
  else{
    if (to.path.indexOf('home') == -1) {
      next()
    }
    else{
      next('/login')
    }
  }
})
let menus
import { superMenus } from './menus'
import {adminMenus} from './menus'
import {purchaseMenus} from './menus'
import {supplierMenus} from './menus'
function addAsyncRoutes() {
  let role = JSON.parse(localStorage.getItem('role'))
  if (role == '772a7b13dabc015c495d9056aed54a85') {
    router.addRoutes(superadmin)
    menus = superMenus
  }
  if (role == 'f2779e805950be76390fff2b186879ad') {
    router.addRoutes(admin)
    menus = adminMenus
  }
  if (role == 'ebd95568c552bc9e808c9b6b680eb6f8') {
    router.addRoutes(supplier)
    menus = supplierMenus
  }
  if (role == 'ebeda8021fccea8209458c3f89b80aad'){
    //采购员
    router.addRoutes(purchase)
    menus = purchaseMenus
  }
  
}
export default router
export {addAsyncRoutes, createRouter, menus}

















/*
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
     {path: 'releaseproduct', component: ReleaseProduct} ,

     {path: 'adminpage', component: adminpage},
     {path: 'orgnizationpage', component: orgnizationpage}
  ]
}
*/
