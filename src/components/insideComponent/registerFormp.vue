<!--
 * @Author: feizzer
 * @Date: 2021-11-03 11:42:23
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-11 13:55:03
 * @Description: 
-->
<template>
    <div class="form-box">
        <el-form ref="registerform" :rules="rules" :model="formData" label-width="80px" label-position="left">
            <el-form-item label="账户名" prop="name" label-width="80px">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phonenum" label-width="80px">
                <el-input v-model="formData.phonenum"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" label-width="80px">
                <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="80px">
                <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2" label-width="80px">
                <el-input v-model="formData.password2" type="password"></el-input>
            </el-form-item>
            <el-form-item label-width="80px">
                <el-button type="primary" @click="toNextStep">下一步</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueRegisterformp',

    data() {
        let repassword =  (rule, value, callback) => {
            if (value != this.formData.password) {
                callback(
                    new Error('两次密码输入不一致')
                )
            }
            callback()
        }
        return {
            formData: {
                name: 'zs',
                phonenum: '15153266878',
                password: '',
                password2: '',
                email: 'hahah@qq.com'
            },
            rules: {
                name: [
                    {required: true, message: '请输入用户姓名', trigger: 'blur'},
                ],
                phonenum: [
                    {required: true, message: '请输入手机号', trigger: ['blur', 'change']},
                    {pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, 
                     message: '请输入正确的手机号', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入您的邮箱' ,trigger: 'blur'},
                    {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                message: '请输入正确的邮箱格式', trigger: 'blur'}
                ],
                password: [
                    {required: true, min: 6, max: 20, message: '请输入6~20位的密码', trigger: 'blur'}
                ],
                password2: [
                    {required: true, message: '请输入您的确认密码', trigger: 'blur'},
                    {validator: repassword, trigger: 'blur'},
                ],
            },
        };
    },
    mounted() {
        
    },

    methods: {
        getCode() {
        },
        toNextStep() {
            this.$refs.registerform.validate(res => {
                if (res) {
                    this.$http.get('/accountIsExist', {
                        params: {
                            username: this.formData.name,
                            phone: this.formData.phonenum,
                            email: this.formData.email
                        }
                    })
                    .then(res => {
                        let data = res.data
                        if (data.success) {
                            this.$emit('next-step1', 1, this.formData)
                        } else{
                            this.$message({
                                type: 'warning',
                                message: data.msg,
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
                }else {
                    this.$message({
                        message: '请正确填写信息',
                        type: 'error'
                    })
                }
            })
        }
    },
};
</script>

<style lang="css" scoped>
.form-box{
    display: flex;
    justify-content: center;
    align-content: center;
}
form{
    width: 30%;
    margin-top: 60px;
}
</style>
