<!--
 * @Author: feizzer
 * @Date: 2021-11-02 14:51:40
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-02 16:43:37
 * @Description: 
-->
<template>
  <div>
    <el-form :model="formData" label-width="60px" label-position="left">
      <el-form-item>
        <div class="login-title">采购员登录</div>
      </el-form-item>
      <el-form-item label="账户">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="normal">登录</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
      <span style="font-size: 13px"><a href="#">立即注册</a></span> 
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PurchasingPlatformVueLoginform",

  data() {
    return {
      formData: {
        account: "",
        password: ""
      }
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="css" scoped>
.login-title {
  font-size: 20px;
  margin: 0 30px;
  color: #555555;
}
</style>