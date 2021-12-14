<!--
 * @Author: feizzer
 * @Date: 2021-12-13 20:54:57
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-14 22:43:20
 * @Description: 
-->
<template>
    <div class="main">
        <div class="org-area" style="margin-bottom: 20px">
            <el-input v-model="search" style="width:50%">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="() =>{add_visible = true;getProductsByManagerId();getOrgByManagerId()}" 
                                type="primary" size="small" class="left-button">新增</el-button>
            <el-button  type="danger" size="small" class="right-button" >删除</el-button>
        </div>
        <el-table >
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column label="用户名">

            </el-table-column>
            <el-table-column label="手机号" >

            </el-table-column>
            <el-table-column label="操作" >

            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="add_visible" title="新增采购员信息">
            <el-form :model="addForm" :rules="rules" ref="addform">
                <el-form-item label="账户名" label-width="80px" prop="username">
                    <el-input v-model="addForm.username"> </el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px"  prop="password">
                    <el-input v-model="addForm.password"> </el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px" prop="mobilePhone">
                    <el-input v-model="addForm.mobilePhone"> </el-input>
                </el-form-item>
                <el-form-item label="组织" label-width="80px" prop="organizeName">
                    <el-select v-model="addForm.organizeName">
                        <el-option v-for="org in canManageOrg" :key="org.id" 
                                :value="org.id" :label="org.organizeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职能" label-width="80px" prop="products">
                    <el-select v-model="addForm.products" :multiple-limit="6" multiple>
                        <el-option v-for="pro in canManagePros" :key="pro.id"
                                :label="pro.productName" :value="pro.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色描述" label-width="80px">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="submitNew">提交</el-button>
                    <el-button type="info" @click="()=>{add_visible=false;addForm={}}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVuePurchase',

    data() {
        return {
            purchases:[],
            accountInfo:{},
            add_visible: false,
            addForm: {},
            search: '',
            canManagePros: [],
            canManageOrg: [],


            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?["#?!@$%^&*()-_=+{}|;':,.<>/]).{8,}$/,
                        message: '请输入8~20位得到密码，必须包含数字大小写字母和特殊字符', trigger: 'blur'}
                ],
                mobilePhone:[
                    {required: true,pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                        message: '请输入正确的手机号', trigger: 'blur'}
                ],
                organizeName:[
                    {required: true, message: '请选择一个组织', trigger: 'blur'}
                ],
                products: [
                    {required: true, message: '请选择至少一个职能', trigger: 'blur'}
                ]
            }

        };
    },

    mounted() {
        this.initAccountInfo()
        this.getPurchase()
    },

    methods: {
        submitNew() {
            this.$http({
                url: '/addPurchaser',
                method: 'post',
                data: this.addForm
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.$message({
                        type: 'warning',
                        message: '新增完成'
                    })
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
            .catch(err => {
                console.error(err)
            })
        },
        initAccountInfo() {
            this.accountInfo = JSON.parse(localStorage.getItem('account'))
        },
        getPurchase() {
            console.log(this.accountInfo.accountId)
            this.$http.get('/getAllPurchasersByPage', {
                params: {
                    managerId: this.accountInfo.accountId,
                    page: 1,
                    pageSize: 10
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.purchases = data.data
                    console.log(this.purchases)
                }
                else {
                    this.$message({
                        type:'warning',
                        message: data.msg
                    })
                }
            })
            
        },
        getProductsByManagerId() {
            this.$http('/getProductInfosByManagerId', {
                params:{
                    managerId: this.accountInfo.accountId
                }
            })
            .then(res => {
                let data = res.data
                console.log(data)
                if (data.success) {
                    this.canManagePros = data.data
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        getOrgByManagerId() {
            this.$http.get('/getAllOrganizationInfos')
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.canManageOrg = data.data
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        }
    },
};
</script>

<style lang="css" scoped>
.main{
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    justify-content: center;
}
.org-area{
    width:100%;
    display: flex;
    justify-content: flex-start;
}
.left-button{
    margin-left: auto;
}
.right-button{
    margin-right: 50px;
}
</style>