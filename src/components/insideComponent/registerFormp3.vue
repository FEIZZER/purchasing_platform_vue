<!--
 * @Author: feizzer
 * @Date: 2021-11-03 15:08:44
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-11 13:42:44
 * @Description: 
-->
<template>
<div>
    <div class="form-box">
        <el-form ref="liaisonForm" :rules="rules" :model="contacts" label-position="left" label-width="95px">
                <p>联系人信息</p>
                <el-form-item label="联系人姓名" prop="contactName">
                    <el-input v-model="contacts.contactName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="contactPhone">
                    <el-input v-model="contacts.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="座机号">
                    <el-input v-model="contacts.contactTelephone"></el-input>
                </el-form-item>
                <el-form-item label="传真号">
                    <el-input v-model="contacts.contactFax"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
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
        <el-form ref="productForm" :rules="rules" :model="products" label-position="left" label-width="80px">
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
        <el-form ref="customForm" :rules="rules" :model="custom" label-position="left" label-width="80px">
                <p>公司主要客户</p>
                <el-form-item label="客户名称" prop="name">
                    <el-input v-model="custom.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="name">
                    <el-input v-model="custom.contactsName"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phonenum">
                    <el-input v-model="custom.phonenum"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="custom.remarks"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-tag @click="deleteCustom(cus)" style="margin:0 1px;" closable v-for="cus in customs" 
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
                name: '',
                contactsName: '',
                phonenum: '',
                remarks: '',
            },
            contactss:[],
            productss: [],
            customs: [],
            rules: {
                contactName: [
                    {required: true, message: '请输入合适的信息', trigger: 'blur'}
                ],
                contactPhone: [
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
        },
        doRegister() {
            this.$emit('next-step4')
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