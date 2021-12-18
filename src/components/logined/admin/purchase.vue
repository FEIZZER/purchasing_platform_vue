<!--
 * @Author: feizzer
 * @Date: 2021-12-13 20:54:57
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-16 16:00:06
 * @Description: 
-->
<template>
    <div class="main">
        <div class="org-area" style="margin-bottom: 20px">
            <el-input v-model="searchIn" style="width:50%; margin-left: 30px">
                <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
            </el-input>
            <el-button @click="() =>{add_visible = true;getProductsByManagerId();getOrgByManagerId()}" 
                                type="primary" size="small" class="left-button">新增</el-button>
            <el-button  type="danger" size="small" class="right-button" @click="doDeletes">删除</el-button>
        </div>
        <el-table :data="purchases" border @selection-change="handleChange">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index" label="序号" width="60px" align="center">
            </el-table-column>
            <el-table-column label="用户名" prop="username" align="center">
            </el-table-column>
            <el-table-column label="手机号" prop="mobilePhone" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="showChange(scope.row.id)">修改</el-button>
                    <el-button type="danger" size="mini" @click="doDelete(scope.row.id)">删除</el-button>
                </template>
                
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total"
            @prev-click="prePage" @next-click="nextPage" @current-change="changePage"> </el-pagination>
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
                <el-form-item label="角色描述" label-width="80px" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="submitNew">提交</el-button>
                    <el-button type="info" @click="()=>{add_visible=false;addForm={}}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="change_visible" title="修改采购员信息">
            <el-form :model="changeForm" :rules="rules" ref="changeForm">
                <el-form-item label="编号" label-width="80px">
                    <el-input disabled v-model="changeForm.id"></el-input>
                </el-form-item>
                <el-form-item label="账户名" label-width="80px" prop="username">
                    <el-input v-model="changeForm.username"> </el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px" prop="mobilePhone">
                    <el-input v-model="changeForm.mobilePhone"> </el-input>
                </el-form-item>
                <el-form-item label="组织" label-width="80px" prop="organizeName">
                    <el-select v-model="changeForm.organizeName">
                        <el-option v-for="org in canManageOrg" :key="'c'+org.id" 
                                :value="org.id" :label="org.organizeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职能" label-width="80px" prop="products">
                    <el-select v-model="changeForm.products" :multiple-limit="6" multiple>
                        <el-option v-for="pro in canManagePros" :key="'c'+pro.id"
                                :label="pro.productName" :value="pro.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色描述" label-width="80px" prop="description">
                    <el-input v-model="changeForm.description"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="submitChange">提交</el-button>
                    <el-button type="info" @click="()=>{change_visible=false;}">取消</el-button>
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
            change_visible: false,
            changeForm:{},
            searchIn: '',
            search: '',
            canManagePros: [],
            canManageOrg: [],
            total: 0,
            page:1,
            pageSize:10,
            selected_column: [],
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
                ],
                description: [
                    {required: true, message: '请输入适当的描述信息', trigger: 'blur'}
                ]
            }

        };
    },

    mounted() {
        this.initAccountInfo()
        this.getPurchase()
    },

    methods: {
        doSearch() {
            this.search = this.searchIn
            this.getPurchase()
        },
        doDeletes() {
            this.selected_column.forEach(col => {
                this.doDelete(col.id)
            })
        },
        handleChange(val) {
            this.selected_column = val
            console.log(this.selected_column)
        },
        prePage(page) {
            this.page = page
            this.getPurchase()
        },
        nextPage(page) {
            this.page = page
            this.getPurchase()
        },
        changePage(page) {
            this.page = page
            this.getPurchase()
        },
        submitChange() {
            console.log(this.changeForm)
            this.$http.put('/updatePurchaserById', {
                id: this.changeForm.id,
                username: this.changeForm.username,
                mobilePhone: this.changeForm.mobilePhone,
                organizeName:this.changeForm.organizeName,
                products: this.changeForm.products,
                description: this.changeForm.description
            })
            .then(res => {
                console.log(res)
                let data = res.data
                if (data.success) {
                    this.$message({
                        type:'success',
                        message: '修改信息成功'
                    })
                    this.change_visible = false
                    this.getPurchase()
                }else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        showChange(id){
            this.getOrgByManagerId()
            this.getProductsByManagerId()
            this.$http.get('/getPurchaserById', {
                params:{
                    purchaserId: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.change_visible = true
                    this.changeForm = data.data
                    console.log(this.changeForm)
                    this.changeFormater(this.changeForm)
                    console.log(this.changeForm)
                }else{
                    this.$message({
                        type: 'warning',
                        message: data.msg + ',获取信息失败，稍后再试！'
                    })
                }
            })
        },
        submitNew() {
            this.$http({
                url: '/addPurchaser',
                method: 'post',
                data: {
                    username: this.addForm.username,
                    password: this.addForm.password,
                    mobilePhone: this.addForm.mobilePhone,
                    products: this.addForm.products,
                    organizeName: this.addForm.organizeName,
                    description: this.addForm.description,
                    managerId: this.accountInfo.accountId,
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.$message({
                        type: 'success',
                        message: '新增完成'
                    })
                    this.add_visible = false
                    this.getPurchase()
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
            console.log(this.search)
            this.$http.get('/getAllPurchasersByPageAndConditions', {
                params: {
                    managerId: this.accountInfo.accountId,
                    page: this.page,
                    pageSize: this.pageSize,
                    queryConditions: this.search
                }
            })
            .then(res => {
                console.log(res)
                let data = res.data
                if (data.success) {
                    this.purchases = data.data.purchaserInfos
                    this.total = data.data.totalCount
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
        },
        doDelete(id) {
            this.$http.delete('/deletePurchaser', {
                params:{
                    purchaserId: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.page = 1
                    this.getPurchase()
                }else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        changeFormater(obj) {
            let m = []
            obj.organizeName = obj.organization.id
            let n = []
            obj.products.forEach(pro=>{n.push(pro.id)})
            obj.products = n
        }
    },
};
</script>

<style lang="css" scoped>
.main{
    display: flex;
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
    margin-right: 100px;
}
</style>