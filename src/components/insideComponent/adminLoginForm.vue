<!--
 * @Author: feizzer
 * @Date: 2021-12-05 13:50:58
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-06 10:16:47
 * @Description: 
-->
<template>
  <div>
    <el-form ref="form" :model="formData" label-width="60px" label-position="left" :rules="rules">
      <el-form-item>
        <div class="login-title">管理员登录</div>
      </el-form-item>
      <el-form-item label="账户" prop="account">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="normal" @click="doLogin">登录</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "PurchasingPlatformVueLoginform",
  components: {
  },

  data() {
    return {
      formData: {
        account: "superAccount",
        password: "123456"
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

  mounted() {
      console.log('this is state', this.$store.state.logined)
  },

  methods: {
    reset() {
      this.formData.account = '',
      this.formData.password = ''
    },
    doLogin() {
      this.$refs.form.validate( res => {
        this.$http.get('/getTokenByUserName', {
          params: {
            username: this.formData.account,
            password: this.formData.password,
            roleType: 'f2779e805950be76390fff2b186879ad'

          }
        })
        .then( res => {
          if(res) {
            console.log(res)
            let data = res.data
            if (data.code === 200 && data.success) {
                localStorage.setItem('token', data.data)
                this.$router.push({ path: '/home',})
            }
            else {
              this.$message({
                type: 'warning',
                message: data.msg,
              })
            }
          } else{
            this.$message({
              type: 'warning',
              message: '请正确填写登录信息'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      })

    }
  }
};
</script>

<style lang="css" scoped>
.login-title {
  font-size: 20px;
  margin: 0 30px;
  color: #555555;
}
</style>
