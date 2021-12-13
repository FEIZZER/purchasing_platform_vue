<!--
 * @Author: feizzer
 * @Date: 2021-11-01 09:51:22
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-13 15:20:33
 * @Description: 
-->

<template>
    
  <div style="height: 100%">
      <div style="height:120px">
      </div>
        <div id="login-area">
            <div class="login-left">
                <img src="" alt="" style="heigth=100%;width=68%">
            </div>
            <div class="login-form">
                <el-tabs v-model="loginType" @tab-click="handleClick">
                  <el-tab-pane name="account" label="账户登录"></el-tab-pane>
                  <el-tab-pane name="phone" label="手机号登录"></el-tab-pane>
                </el-tabs>
                <div v-if="loginType == 'account'">
                  <el-form hide-required-asterisk :model="accountData" :rules="Rules"  
                          ref="accountForm">
                    <el-form-item label="账户" label-width="55px" prop="username">
                      <el-input v-model="accountData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="55px" prop="password">
                      <el-input type="password" v-model="accountData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" label-width="55px" prop="roleType">
                      <el-select v-model="accountData.roleType">
                        <el-option value="772a7b13dabc015c495d9056aed54a85" label="超级管理员"></el-option>
                        <el-option value="f2779e805950be76390fff2b186879ad" label="管理员"></el-option>
                        <el-option value="ebeda8021fccea8209458c3f89b80aad" label="采购员"></el-option>
                        <el-option value="ebd95568c552bc9e808c9b6b680eb6f8" label="供应商"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="" label-width="60px">
                      <el-button type="primary" @click="accountLogin">登录</el-button>
                    </el-form-item>
                  </el-form>
                </div>


                <div v-else>
                  <el-form :model="phoneData" :rules="Rules" hide-required-asterisk ref="phoneitem">
                    <el-form-item label="手机号" label-width="60px" prop="mobilePhone">
                      <el-input v-model="phoneData.mobilePhone"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-form :model="phoneData" :inline="true" :rules="Rules" hide-required-asterisk 
                              ref="codeitem">
                    <el-form-item label="验证码" label-width="60px" prop="verifyCode">
                      <el-input v-model="phoneData.verifyCode"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="getCode">获取验证码</el-button>
                    </el-form-item>
                  </el-form>
                  <el-form :model="phoneData" :rules="Rules" ref="roleitem">
                    <el-form-item label="角色" label-width="60px" prop="roleType">
                      <el-select v-model="phoneData.roleType">
                        <el-option value="772a7b13dabc015c495d9056aed54a85" label="超级管理员"></el-option>
                        <el-option value="f2779e805950be76390fff2b186879ad" label="管理员"></el-option>
                        <el-option value="ebeda8021fccea8209458c3f89b80aad" label="采购员"></el-option>
                        <el-option value="ebd95568c552bc9e808c9b6b680eb6f8" label="供应商"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="" label-width="60px">
                      <el-button type="primary" @click="phoneLogin">
                        登录
                      </el-button>
                    </el-form-item>
                  </el-form>

                </div>
            </div>
        </div>
  </div>

</template>

<script>

export default {
  name: "PurchasingPlatformVueLogin",
  components: {
      
  },
  data() {
    return {
      loginType: 'account',
      accountData: {
        username:'superAccount',
        password: '123456',
        roleType: '772a7b13dabc015c495d9056aed54a85',
      },
      phoneData: {
        mobilePhone: '',
        verifyCode: '',
        roleType: '',
      },



      Rules: {
        username: [
          {required: true, message: '请输入您的账户信息', trigger: 'blur'}
        ],
        password: [
          {required: true, min: 6, max: 20, message: '请输入6~20长的密码', trigger: ['blur', 'change']}
        ],
        roleType: [
          {required: true, message: '请选择您的角色信息', trigger: 'blur'}
        ],
        mobilePhone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, 
                     message: '请输入正确的手机号', trigger: 'blur'}
          
        ],
        verifyCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
    };
  },

  mounted() {

  },

  methods: {
    accountLogin() {
      this.$refs.accountForm.validate(res => {
        if (res) {
          this.$http.get('/getTokenByUserName', {
            params: this.accountData
          })
          .then(res => {
            let data = res.data
            if (data.success) {
              this.$router.push({
                path: 'home'
              })
            }else {
              this.$message({
                type: 'warning',
                message: data.msg
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
        }
      })
    },
    async phoneLogin() {
      let a = await this.$refs.phoneitem.validate()
      let b = await this.$refs.codeitem.validate()
      let c = await this.$refs.roleitem.validate()
      if (a && b && c) {
        console.log('phoneLogin goi right ...')
      }
    },
    getCode() {
      this.$refs.phoneitem.validate(res => {
        if (res) {
          console.log('validate go right')
          //this.$http.get()
        } else {
          console.log('wrong')
        }
      })
    },
    handleClick(){}
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
    width: 45%;
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
