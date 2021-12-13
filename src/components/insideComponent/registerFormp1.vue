<!--
 * @Author: feizzer
 * @Date: 2021-11-03 15:08:21
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-13 14:48:38
 * @Description: 
-->
<template>
    <div class="form-box">
        <el-form ref="registerFormP1" :rules="rules" :model="formData" label-position="left" label-width="90px" hide-required-asterisk>
            <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="formData.companyName"></el-input>
            </el-form-item>
            <el-form-item label="公司电话" prop="companyPhone">
                <el-input v-model="formData.companyPhone"></el-input>
            </el-form-item>
            <el-form-item label="公司传真" prop="companyFax">
                <el-input v-model="formData.companyFax"></el-input>
            </el-form-item>
            <el-form-item label="法人代表" prop="corporateRepresentative">
                <el-input v-model="formData.corporateRepresentative"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证" prop="identityCard">
                <el-input v-model="formData.identityCard"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱" prop="companyEmail">
                <el-input v-model="formData.companyEmail"></el-input>
            </el-form-item>
            <el-form-item label="公司网站" prop="companyWebsite">
                <el-input v-model="formData.companyWebsite"></el-input>
            </el-form-item>
            <el-button type="primary" @click="toNextStep">下一步</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueRegisterformp1',

    data() {
        return {
            formData: {
                companyName: '肥宅快乐厂',
                companyPhone: '15151577652',
                companyFax: '123-1234567-1',
                corporateRepresentative: '肥宅',
                identityCard: '320681199911044413',
                companyAddress: '没设置格式校验',
                companyEmail: '23457987@qq.com',
                companyWebsite: 'www.baidu.com',
            },
            rules:{
                companyName:[
                    {required: true, message: '请输入公司名称', trigger: 'blur'},
                ],
                companyPhone: [
                    {required: true, message: '请输入公司电话', trigger: 'blur'},
                    {pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, 
                                message: '请输入正确的手机号', trigger: 'blur'}
                ],
                companyFax: [
                    {required: true, message: '请输入公司传真', trigger: 'blur'},
                    {pattern: /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/, message: '传真格式有误', trigger: 'blur'}
                ],
                corporateRepresentative: [
                    {required: true, message: '请输入公司法人代表姓名', trigger: 'blur'},
                ],
                identityCard: [
                    {pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                     required: true, message: '请输入正确的身份证格式', trigger: 'blur'}
                ],
                companyEmail: [
                    {pattern: /^\b[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,6}\b$/, required: true,
                                message: '请输入正确的邮箱格式', trigger: 'blur'}
                ],
                companyWebsite:[
                    {pattern: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/,
                     required: true, message: '请输入正确的网址' ,trigger: 'blur'}
                ]
            }
        };
    },

    mounted() {
        
    },

    methods: {
        toNextStep(){
            this.$refs['registerFormP1'].validate( res => {
                if (res) {
                    this.$http.get('/companyIsExist', {
                        params: this.formData
                    })
                    .then(res => {
                        let data = res.data
                        if (data.success) {
                            this.$emit('next-step2', 2, this.formData);
                        }else {
                            this.$message({
                                type: 'warning',
                                message: data.msg
                            })
                        }
                    })
                    
                }else {
                    this.$message({
                        message: '请输入正确的公司信息',
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
    width: 40%;
    margin-top: 60px;
}
</style>