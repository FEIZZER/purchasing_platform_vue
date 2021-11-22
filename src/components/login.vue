<!--
 * @Author: feizzer
 * @Date: 2021-11-01 09:51:22
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-22 21:25:17
 * @Description: 
-->

<template>
    
  <div>
    <div>
      <el-row class="title-area">
        <el-col :span="12">
          <img src="../assets/title-logo.png"/>
        </el-col>
        <el-col :span="6">
            <div style="height:100%" class="rolepickbox">
                <div class="roleChoice" @click="showprovide()" > 
                    <i class="el-icon-guide"></i>
                    供应商登录
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div style="height:100%" class="rolepickbox">
                <div class="roleChoice" @click="showbuyer()">
                    <i class="el-icon-goods"></i>
                    采购员登录</div>
            </div>
        </el-col>
      </el-row>
    </div>

    <div id="login-area">
      <div class="login-left">
          <img src="" alt="" style="heigth=100%;width=78%">
      </div>
      <div class="login-form">
          <login-form v-if="showWhichForm"></login-form>
          <login-form-another v-else></login-form-another>
      </div>
    </div>
  </div>

</template>

<script>
import LoginForm from '@/components/insideComponent/loginForm.vue'
import LoginFormAnother from '@/components/insideComponent/LoginFormAnother.vue'
export default {
  name: "PurchasingPlatformVueLogin",
  components: {
      LoginForm,
        LoginFormAnother
  },
  data() {
    return {
        showWhichForm: true
    };
  },

  mounted() {
    this.setPageSize()
    window.addEventListener("DOMContentLoaded", this.setPageSize);
  },

  methods: {
      showprovide() {

          this.showWhichForm = false
      },
      showbuyer() {
          this.showWhichForm = true
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
