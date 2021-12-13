<!--
 * @Author: feizzer
 * @Date: 2021-11-03 15:08:44
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-13 14:44:38
 * @Description: 
-->
<template>
<div>
    <div class="form-box">
        <el-form ref="liaisonForm" :rules="rules" :model="contacts" label-position="left" label-width="95px" hide-required-asterisk>
                <p>联系人信息</p>
                <el-form-item label="联系人姓名" prop="contactName">
                    <el-input v-model="contacts.contactName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="contactPhone">
                    <el-input v-model="contacts.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="座机号" prop="contactTelephone">
                    <el-input v-model="contacts.contactTelephone"></el-input>
                </el-form-item>
                <el-form-item label="传真号" prop="contactFax">
                    <el-input v-model="contacts.contactFax"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="contactEmail">
                    <el-input v-model="contacts.contactEmail"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="contacts.contactRemark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tag @close="deletecontacts(lia)" style="margin:0 1px;" v-for="lia in contactss" 
                                                                        :key="lia.contactName" closable>
                        {{lia.contactName}}
                    </el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addcontacts">+添加联系人</el-button>
                </el-form-item>
        </el-form>
        <el-form ref="productForm" :rules="rules" :model="products" label-position="left" label-width="80px" hide-required-asterisk>
                <p>公司主要产品</p>
                <el-form-item label="产品名称" prop="companyProduct">
                    <el-input v-model="products.companyProduct"></el-input>
                </el-form-item>
                <el-form-item label="年产量">
                    <el-input v-model="products.yearlyCapacity"></el-input>
                </el-form-item>
                <el-form-item label="产品批准文号">
                    <el-input v-model="products.authenticationCode"></el-input>
                </el-form-item>
                <el-form-item label="批文开始时间">
                    <el-date-picker v-model="products.indateStart" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="批文结束时间">
                    <el-date-picker v-model="products.indateEnd" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="products.companyRemark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tag @close="deleteproducts(pro)" style="margin:0 1px;" closable v-for="pro in productss" 
                                :key="pro.name">{{pro.companyProduct}}</el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addproducts">+添加主要产品</el-button>
                </el-form-item>
        </el-form>
        <el-form ref="customForm" :rules="rules" :model="custom" label-position="left" label-width="80px"  hide-required-asterisk>
                <p>公司主要客户</p>
                <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="custom.customerName"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="customerContactUser">
                    <el-input v-model="custom.customerContactUser"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="customerContactPh">
                    <el-input v-model="custom.customerContactPh"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="custom.clinetRemark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tag @close="deleteCustom(cus)" style="margin:0 1px;" closable v-for="cus in customers" 
                                                    :key="cus.customerName">
                        {{cus.customerName}}
                    </el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addCustom()">+添加主要客户</el-button>
                </el-form-item>
        </el-form>
    </div>
    <div class="button-area">
        <el-button type="primary" @click="doRegister">提交信息</el-button>
        <el-button type="info">跳过</el-button>
    </div>

</div>

</template>

<script>
export default {
    name: 'PurchasingPlatformVueRegisterformp2',

    data() {
        return {
            contacts: {
                contactName: '',
                contactPhone: '',
                contactTelephone: '',
                contactFax: '',
                contactEmail: '',
                contactRemark: '',
            },
            products: {
                companyProduct: '',
                yearlyCapacity: '',
                authenticationCode: '',
                indateStart: '',
                indateEnd: '',
                companyRemark: ''
            },
            custom: {
                customerName: '',
                customerContactUser: '',
                customerContactPh: '',
                clinetRemark: '',
            },
            contactss:[],
            productss: [],
            customers: [],
            rules: {
                contactName: [
                    {required: true, message: '请输入合适的信息', trigger: 'blur'}
                ],
                contactPhone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, 
                     message: '请输入正确的手机号', trigger: 'blur'}
                ],
                contactTelephone: [
                    {pattern: /(^[0][1-9]{2,3}-[0-9]{5,10}$)|(^[1-9]{1}[0-9]{5,8}$)/, 
                        required: true, message: '请填写正确的固话信息', trigger: 'blur'}
                ],
                contactFax: [
                    {pattern: /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/, 
                     required: true, message: '请输入正确的传真信息', trigger: 'blur'}
                ],
                contactEmail:[
                    {pattern: /^\b[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,6}\b$/, required: true,
                                message: '请输入正确的邮箱格式', trigger: 'blur'}
                ],

                companyProduct: [
                    {required: true, message: '请输入产品名称', trigger: 'blur'}
                ],

                customerName:[
                    {required: true, message: '请输入客户名字', trigger: 'blur'}
                ],
                customerContactUser: [
                    {required: true, message: '请输入联系人的名字', trigger: 'blur'}
                ],
                customerContactPh:[
                    {pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, 
                     required: true, message: '请输入正确的手机号', trigger: 'blur'}
                ],


            }
        };
    },

    mounted() {
        
    },

    methods: {
        deletecontacts(data){
            this.contactss.splice(this.contactss.indexOf(data), 1)
        },
        addcontacts() {
            this.$refs.liaisonForm.validate(res=>{
                if (res) {
                    let full = JSON.parse(JSON.stringify(this.contacts))
                    this.contactss.push(full)
                }else{
                    this.$message({
                        message: '输入必要信息才可以添加联系人信息',
                        type: 'error'
                    })
                }
            })
        },
        deleteproducts(pro) {
            this.productss.splice(this.productss.indexOf(pro), 1)
        },
        addproducts() {
            this.$refs.productForm.validate(res=>{
                if (res) {
                    let full = JSON.parse(JSON.stringify(this.products))
                    this.productss.push(full)
                }else {
                    this.$message({
                        message: '输入必要信息才能后添加主要产品',
                        type: 'error'
                    })
                }
            })
        },
        deleteCustom(custom){
            this.customers.splice(this.customers.indexOf(custom), 1)
        },
        addCustom() {
            this.$refs.customForm.validate(res=>{
                if (res) {
                    let full = JSON.parse(JSON.stringify(this.custom))
                    this.customers.push(full)
                } else{
                    this.$message({
                        message: '输入必要信息后才能添加客户信息',
                        type: 'error'
                    })
                }
            })
        },
        doRegister() {
            this.$emit('next-step4',this.contactss, this.productss, this.customers)
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