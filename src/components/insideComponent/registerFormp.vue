<!--
 * @Author: feizzer
 * @Date: 2021-11-03 11:42:23
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-03 17:41:10
 * @Description: 
-->
<template>
    <div class="form-box">
        <el-form ref="registerform" :rules="rules" :model="formData" label-width="80px" label-position="left">
            <el-form-item label="用户姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phonenum">
                <el-input v-model="formData.phonenum"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-col :span="16">
                    <el-input v-model="formData.code"></el-input>
                </el-col>
                <!-- <el-col :span="2"> &nbsp; </el-col> -->
                <el-col :span="8">
                    <el-button @click="getCode">获取验证码</el-button>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toNextStep">下一步</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueRegisterformp',

    data() {
        return {
            formData: {
                name: 'zs',
                phonenum: '15153266878',
                code: '1890'
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
                code: [
                    {required: true, message: '请输入验证码' ,trigger: 'blur'}
                ]
                
            }
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
                    this.$emit('next-step', 1);
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
