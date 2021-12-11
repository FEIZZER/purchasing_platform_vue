<!--
 * @Author: feizzer
 * @Date: 2021-12-11 12:46:30
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-11 13:38:20
 * @Description: 
-->
<template>
    <div class="form-box">
        <div class="des">
            <el-descriptions title="请将以下证件打包发送到XXX@XX.com邮箱" column="3">
                <el-descriptions-item label="1" span="3">营业执照</el-descriptions-item>
                <el-descriptions-item label="2" span="3">一般纳税人证明</el-descriptions-item>
                <el-descriptions-item label="3" span="3">银行开户证许可</el-descriptions-item>
                <el-descriptions-item label="4" span="3">IOS证书</el-descriptions-item>
                <el-descriptions-item label="5" span="3">行业/专业证书</el-descriptions-item>
                <el-descriptions-item label="6" span="3">其他公司证照</el-descriptions-item>
            </el-descriptions>
            <div>
                <el-checkbox v-model="readed">我已阅读</el-checkbox>
            </div>
            <div style="margin-top: 50px">
                <el-button type="primary" :disabled="!readed" @click="toNextStep">下一步</el-button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueRegisterform',

    data() {
        return {
            readed: false,

        };
    },

    mounted() {
        
    },

    methods: {
        toNextStep() {
            this.$emit('next-step3', 3);
        }
    },
};
</script>

<style lang="css" scoped>
    .form-box{
        display: flex;
        justify-content: center;
        align-content: center;
        padding-top: 60px;
    }
    .des{
        width: 50%;
    }
</style>
