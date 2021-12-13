<!--
 * @Author: feizzer
 * @Date: 2021-11-04 14:01:32
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-13 22:25:12
 * @Description: 
-->
<template>
  <el-container class="out-container">
    <el-header>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container class="inside-container">
      <el-aside width="200px">
        <el-menu router default-active="1" class="el-menu-vertical-demo" 
        @open="handleOpen" text-color="#fff" @close="handleClose" background-color="#292D30">
          <el-submenu v-for="(menu, index) in thismenus" :key="index" :index="menu.name">
             <template slot="title">
               <span>{{menu.name}}</span>
             </template>
             <el-menu-item v-for="submenu in menu.childrens" :key="submenu.name" :index="submenu.name"
                  :route="'/home'+submenu.route">
               <span>{{submenu.name}}</span>
             </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main-area">
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {menus, createRouter, addAsyncRoutes} from '@/router/index.js'
export default {
  name: "PurchasingPlatformVueMain",
  components: {
    menus,
    createRouter,
    addAsyncRoutes
  },
  data() {
    return {
      thismenus:[]
    };
  },

  mounted() {
    createRouter()
    addAsyncRoutes()
    this.thismenus = menus
  },
  created() {

  },
  methods: {
    handleOpen() {},
    handleClose(){},
    isCollapse(){},
    logout() {
      localStorage.clear()
      this.$router.push({
        path: 'login'
      })
    }
  }
};
</script>

<style lang="css" scoped>
.el-menu{
  border: none;
}
.el-header {
  background-color: #f0f8ff;
  height: 100px !important;
}
.el-container{
  height: 100%;
}

.el-aside {
  background-color: #292D30;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
