<!--
 * @Author: feizzer
 * @Date: 2021-11-03 15:08:44
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-03 19:40:36
 * @Description: 
-->
<template>
<div>
    <div class="form-box">
        <el-form ref="liaisonForm" :rules="rules" :model="liaison" label-position="left" label-width="95px">
                <p>联系人信息</p>
                <el-form-item label="联系人姓名" prop="name">
                    <el-input v-model="liaison.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phonenum">
                    <el-input v-model="liaison.phonenum"></el-input>
                </el-form-item>
                <el-form-item label="座机号">
                    <el-input v-model="liaison.telephonenum"></el-input>
                </el-form-item>
                <el-form-item label="传真号">
                    <el-input v-model="liaison.texnum"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="liaison.email"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="liaison.remarks"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tag @close="deleteLiaison(lia)" style="margin:0 1px;" v-for="lia in liaisons" :key="lia.name" closable>{{lia.name}}</el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addLiaison">+添加联系人</el-button>
                </el-form-item>
        </el-form>
        <el-form ref="productForm" :rules="rules" :model="product" label-position="left" label-width="80px">
                <p>公司主要产品</p>
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model="product.name"></el-input>
                </el-form-item>
                <el-form-item label="年产量">
                    <el-input v-model="product.yearOutput"></el-input>
                </el-form-item>
                <el-form-item label="产品批准文号">
                    <el-input v-model="product.authenticationCode"></el-input>
                </el-form-item>
                <el-form-item label="批文开始时间">
                    <el-date-picker v-model="product.authenticationStartTime" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="批文结束时间">
                    <el-date-picker v-model="product.authenticationEndTime" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="product.remarks"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tag @close="deleteProduct(pro)" style="margin:0 1px;" closable v-for="pro in products" :key="pro.name">{{pro.name}}</el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addProduct">+添加主要产品</el-button>
                </el-form-item>
        </el-form>
        <el-form ref="customForm" :rules="rules" :model="custom" label-position="left" label-width="80px">
                <p>公司主要客户</p>
                <el-form-item label="客户名称" prop="name">
                    <el-input v-model="custom.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="name">
                    <el-input v-model="custom.liaisonName"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phonenum">
                    <el-input v-model="custom.phonenum"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="custom.remarks"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tag @click="deleteCustom(cus)" style="margin:0 1px;" closable v-for="cus in customs" :key="cus.name">{{cus.name}}</el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addCustom()">+添加主要客户</el-button>
                </el-form-item>
        </el-form>
    </div>
    <div class="button-area">
        <el-button type="primary">提交信息</el-button>
        <el-button type="info">跳过</el-button>
    </div>

</div>

</template>

<script>
export default {
    name: 'PurchasingPlatformVueRegisterformp2',

    data() {
        return {
            liaison: {
                name: '',
                phonenum: '',
                telephonenum: '',
                texnum: '',
                email: '',
                remarks: '',
            },
            product: {
                name: '',
                yearOutput: '',
                authenticationCode: '',
                authenticationStartTime: '',
                authenticationEndTime: '',
                remarks: ''
            },
            custom: {
                name: '',
                liaisonName: '',
                phonenum: '',
                remarks: '',
            },
            liaisons:[],
            products: [],
            customs: [],
            rules: {
                name: [
                    {required: true, message: '请输入合适的信息', trigger: 'blur'}
                ],
                phonenum: [
                    {required: true, message: '请输入合适的信息', trigger: 'blur'},
                    {pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, 
                     message: '请输入正确的手机号', trigger: 'blur'}
                ]
            }
        };
    },

    mounted() {
        
    },

    methods: {
        deleteLiaison(data){
            this.liaisons.splice(this.liaisons.indexOf(data), 1)
        },
        addLiaison() {
            this.$refs.liaisonForm.validate(res=>{
                if (res) {
                    this.liaisons.push(this.liaison)
                }else{
                    this.$message({
                        message: '输入必要信息才可以添加联系人信息',
                        type: 'error'
                    })
                }
            })
        },
        deleteProduct(pro) {
            this.products.splice(this.products.indexOf(pro), 1)
        },
        addProduct() {
            this.$refs.productForm.validate(res=>{
                if (res) {
                    this.products.push(this.product)
                }else {
                    this.$message({
                        message: '输入必要信息才能后添加主要产品',
                        type: 'error'
                    })
                }
            })
        },
        deleteCustom(custom){
            this.customs.splice(this.customs.indexOf(custom), 1)
        },
        addCustom() {
            this.$refs.customForm.validate(res=>{
                if (res) {
                    this.customs.push(this.custom)
                } else{
                    this.$message({
                        message: '输入必要信息后才能添加客户信息',
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
    padding: 0 90px;
}
.button-area{
    width: 20%;
    margin: 0 auto;
    padding: auto;
    margin-bottom: 50px;
}
form{
    width: 25%;
    margin: 0 auto;
    margin-top: 60px;
    /* border: 1px black solid; */
}
form > p{
    font-size: 24px;
    margin-bottom: 20px;
}
</style>