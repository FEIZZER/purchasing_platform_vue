<!--
 * @Author: feizzer
 * @Date: 2021-11-02 14:51:40
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-22 21:29:26
 * @Description: 
-->
<template>
  <div>
    <el-form :model="formData" label-width="60px" label-position="left" :rules="rules">
      <el-form-item>
        <div class="login-title">采购员登录</div>
      </el-form-item>
      <el-form-item label="账户" prop="account">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="normal">登录</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
      <span style="font-size: 13px">
        <a href="#">立即注册</a>
      </span>
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
      },
      rules: {
        account: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, min: 6, max:20, message: '请输入6~20位密码' ,trigger: ['blur', 'change']}
        ]
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