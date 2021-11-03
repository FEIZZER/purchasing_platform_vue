<!--
 * @Author: feizzer
 * @Date: 2021-11-03 15:08:21
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-03 16:15:45
 * @Description: 
-->
<template>
    <div class="form-box">
        <el-form ref="registerFormP1" :rules="rules" :model="formData" label-position="left" label-width="90px">
            <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="formData.companyName"></el-input>
            </el-form-item>
            <el-form-item label="公司电话" prop="companyPhone">
                <el-input v-model="formData.companyPhone"></el-input>
            </el-form-item>
            <el-form-item label="公司传真" prop="companyTex">
                <el-input v-model="formData.companyTex"></el-input>
            </el-form-item>
            <el-form-item label="法人代表" prop="companyRepresentative">
                <el-input v-model="formData.companyRepresentative"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证">
                <el-input v-model="formData.companyRepresentativeCreditCard"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
                <el-input v-model="formData.companyEmail"></el-input>
            </el-form-item>
            <el-form-item label="公司网站">
                <el-input v-model="formData.companyNet"></el-input>
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
                companyTex: '没设置格式校验',
                companyRepresentative: '肥宅',
                companyRepresentativeCreditCard: '没设置格式校验',
                companyAddress: '没设置格式校验',
                companyEmail: '没设置格式校验',
                companyNet: '没设置格式校验',
            },
            rules:{
                companyName:[
                    {required: true, message: '请输入公司名称', trigger: 'blur'},
                ],
                companyPhone: [
                    {required: true, message: '请输入公司电话', trigger: 'blur'},
                ],
                companyTex: [
                    {required: true, message: '请输入公司传真', trigger: 'blur'},
                ],
                companyRepresentative: [
                    {required: true, message: '请输入公司法人代表姓名', trigger: 'blur'},
                ],
            }
        };
    },

    mounted() {
        
    },

    methods: {
        toNextStep(){
            this.$refs['registerFormP1'].validate( res => {
                if (res) {
                    this.$emit('next-step', 2);
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