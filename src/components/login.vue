<!--
 * @Author: feizzer
 * @Date: 2021-11-01 09:51:22
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-06 10:29:16
 * @Description: 
-->

<template>
    
  <div style="height: 100%">
    <div style="height:120px">
      <el-row class="title-area">
        <el-col :span="12">
          <img src="../assets/title-logo.png"/>
        </el-col>
        <el-col :span="3">
            <div style="height:100%" class="rolepickbox">
                <div class="roleChoice" @click="changeForm(1)" > 
                    <i class="el-icon-guide"></i>
                    供应商登录
                </div>
            </div>
        </el-col>
        <el-col :span="3">
            <div style="height:100%" class="rolepickbox">
                <div class="roleChoice" @click="changeForm(2)">
                    <i class="el-icon-goods"></i>
                    采购员登录</div>
            </div>
        </el-col>
        <el-col :span="3">
            <div style="height:100%" class="rolepickbox">
                <div class="roleChoice" @click="changeForm(3)">
                    <i class="el-icon-goods"></i>
                    管理员登录</div>
            </div>
        </el-col>
        <el-col :span="3">
            <div style="height:100%" class="rolepickbox">
                <div class="roleChoice" @click="changeForm(4)">
                    <i class="el-icon-goods"></i>
                    超级管理员登录</div>
            </div>
        </el-col>
      </el-row>
    </div>

    <div id="login-area">
      <div class="login-left">
          <img src="" alt="" style="heigth=100%;width=78%">
      </div>
      <div class="login-form">
          <login-form v-if="showWhichForm == 1"></login-form>
          <login-form-another v-if="showWhichForm == 2"></login-form-another>
          <admin v-if="showWhichForm == 3"></admin>
          <sadmin v-if="showWhichForm == 4"></sadmin>
      </div>
    </div>
  </div>

</template>

<script>
import LoginForm from '@/components/insideComponent/loginForm.vue'
import LoginFormAnother from '@/components/insideComponent/LoginFormAnother.vue'
import admin from '@/components/insideComponent/adminLoginForm'
import sadmin from '@/components/insideComponent/sadminLoginForm'
export default {
  name: "PurchasingPlatformVueLogin",
  components: {
      LoginForm,
        LoginFormAnother,
      admin,
      sadmin
  },
  data() {
    return {
        showWhichForm: 1
    };
  },

  mounted() {

  },

  methods: {
      changeForm(data) {
        this.showWhichForm = data
      },
      setPageSize() {
        let hei = window.innerHeight;
        let loginArea = document.getElementById("login-area");
        loginArea.style.height = hei - 120 + "px";
      }
  }
};
</script>

<style lang="css" scoped>
body {
  height: 100%;
  width: 100%;
}
html {
  height: 100%;
  width: 100%;
}
.rolepickbox{
  display: flex;
  justify-content: center;
  align-items: center;  
  height: 100%;
}
.roleChoice {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    cursor: pointer;
    height: 50%;
    width: 60%;
    padding: auto;
    text-align: center;
}
.title-area > * {
  height: 120px;
  background-color: aliceblue;
  margin: auto;
}
#login-area {
  background-color: #2d61e0;
  display: flex;
  justify-content: center;
  height: 86%;
}
.login-left {
    margin: auto;
    width: 50%;
}
.login-form {
  width: 30%;
  padding: 20px;
  margin: auto;
  background-color: aliceblue;
  border-radius: 3%;
}
img {
  height: 100%;
  width: 70%;
}
</style>
