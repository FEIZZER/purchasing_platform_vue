<!--
 * @Author: feizzer
 * @Date: 2021-11-04 14:01:32
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-22 22:04:39
 * @Description: 
-->
<template>
  <el-container class="out-container">
    <el-header>Header</el-header>
    <el-container class="inside-container">
      <el-aside width="200px">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" text-color="#fff"
                    @close="handleClose" :collapse="isCollapse" background-color="#292D30">
          <el-menu-item index="1">
            <i class="el-icon-help"></i>
            <span slot="title">产品资格申请</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">正在招标</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-area">
          <product-in-need-table></product-in-need-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ProductInNeedTable from './producter/productInNeed_Table.vue'
export default {
  name: "PurchasingPlatformVueMain",
  components: {
      ProductInNeedTable,
  },
  data() {
    return {};
  },

  mounted() {
  },

  methods: {
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
