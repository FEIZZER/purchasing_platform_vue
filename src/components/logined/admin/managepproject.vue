<!--
 * @Author: feizzer
 * @Date: 2021-12-18 17:21:19
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-22 13:40:58
 * @Description: 
-->
<template>
    <div class="main">
        <div class="opra">
            <el-input v-model="searchIn" style="width:60%">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" size="small" style="margin-left: auto"
                @click="showAdd">新增</el-button>
            <el-button type="danger" size="small" style="margin-right: 50px"
                @click="doDeletes">删除</el-button>
        </div>
        <div class="table_area">
            <el-table :data="projects" border @selection-change="handleChange">
                <el-table-column type="selection"> </el-table-column>
                <el-table-column type="index" label="序号" width="50px"> </el-table-column>
                <el-table-column label="项目名" prop="projectName" align="center"> </el-table-column>
                <el-table-column label="创建者" prop="creator" align="center"> </el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center"> </el-table-column>
                <el-table-column label="更改者" prop="modifier" align="center"></el-table-column>
                <el-table-column label="更改时间" prop="updateTime" align="center"></el-table-column>
                <el-table-column label="产品" prop="">
                    <template slot-scope="scope">
                        <el-link v-for="name in scope.row.productNames" :key="name.id" style="margin-right:3px">
                            {{name.productName}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="showChange(scope.row.id)">修改</el-button>
                        <el-button size="mini" type="danger" @click="doDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :visible.sync="add_visible" title="新增项目信息">
            <el-form :model="add_detail" :rules="rules">
                <el-form-item label="项目名" label-width="80px" prop="projectName">
                    <el-input v-model="add_detail.projectName"></el-input>
                </el-form-item>
                <el-form-item label="类型" label-width="80px" prop="productType">
                    <el-select v-model="add_detail.productType" @change="getProdcutsByType">
                        <el-option v-for="type in types" :key="type.id" :value="type.id" 
                            :label="type.productType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品" label-width="80px" prop="product">
                    <el-select v-model="add_detail.product" multiple>
                        <el-option v-for="pro in products" :key="pro.id"
                            :value="pro.id" :label="pro.productName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目描述" label-width="80px" prop="description">
                    <el-input v-model="add_detail.description"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="submitAdd">提交</el-button>
                    <el-button type="info" @click="()=>{add_visible=false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="change_visible" title="修改项目信息">
            <el-form :model="change_detail">
                <el-form-item label="编号" label-width="80px">
                    <el-input v-model="change_detail.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目名" label-width="80px" prop="productName">
                    <el-input v-model="change_detail.projectName"></el-input>
                </el-form-item>
                <el-form-item label="类型" label-width="80px" prop="productType">
                    <el-select v-model="change_detail.productType" @change="getProdcutsByType">
                        <el-option v-for="type in types" :key="type.id" :value="type.id" 
                            :label="type.productType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品" label-width="80px" prop="product">
                    <el-select v-model="change_detail.product" multiple>
                        <el-option v-for="pro in products" :key="pro.id"
                            :value="pro.id" :label="pro.productName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目描述" label-width="80px" prop="description">
                    <el-input v-model="change_detail.description"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="submitChange">提交</el-button>
                    <el-button type="info" @click="()=>{change_visible=false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueManagepproject',

    data() {
        return {
            accountInfo:{},
            projects:[],
            page:1,
            pageSize: 10,
            total: 0,
            search: '',
            searchIn: '',
            add_detail: {},
            add_visible: false,
            types: [],
            products: [],
            change_visible:false,
            change_detail:{},
            selected:[],
            rules:{
                projectName:[
                    {required: true, message: '请输入新增的项目名', trigger: 'blur'}
                ],
                productType:[
                    {required:true, message: '请选择一个产品类型', trigger: 'blur'}
                ],
                product:[
                    {required: true, message: '请至少选择一种产品', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入项目描述', trigger: 'blur'}
                ]
            }
        };
    },

    mounted() {},
    created() {
        this.initAccountInfo()
        this.getProjects()
        this.getProductType()
    },
    methods: {
        doDelete(id){
            this.$http({
                method: 'delete',
                url: '/deleteProjectInfoById',
                params: {
                    id: id
                }
            })
            .then(res=>{
                let data = res.data
                if (data.success) {
                    this.$message({
                        type: 'info',
                        message: '已删除该项目信息'
                    })
                    this.getProjects()
                }else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
            .catch(err=>{

            })
        },
        doDeletes(){
            this.selected.forEach(pro=>{
                this.doDelete(pro.id)
            })
        },
        showChange(id){
            this.change_detail = {}
            this.$http.get('/getProjectInfoById', {
                params:{
                    projectId: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.change_detail = data.data
                    this.handleData(JSON.parse(JSON.stringify(this.change_detail)))
                    console.log(this.change_detail)
                    this.change_visible = true
                }else{
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
        submitChange() {
            this.$http({
                method: 'put',
                url: '/updateProject',
                data: {
                    accountId: this.accountInfo.accountId,
                    id: this.change_detail.id,
                    productType: this.change_detail.productType,
                    product: this.change_detail.product,
                    projectName: this.change_detail.projectName,
                    description: this.change_detail.description
                }
            })
            .then(res=>{
                let data = res.data
                if (data.success) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.getProjects()
                    this.change_visible = false
                } else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
            .catch(err=>{
                console.errorP(err)
            })
        },
        submitAdd() {
            this.$http({
                url: '/addProject',
                method: 'post',
                data: {
                    accountId: this.accountInfo.accountId,
                    productType: this.add_detail.productType,
                    projectName: this.add_detail.projectName,
                    description: this.add_detail.description,
                    product: this.add_detail.product
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.getProjects()
                    this.add_visible = false
                    this.$message({
                        type: 'success',
                        message: '新增项目成功'
                    })
                }else{
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
        showAdd() {
            this.add_visible = true
            this.getProductType()
        },
        getProjects() {
            this.$http.get('/getAllProjectInfosByConditions', {
                params:{
                    page: this.page,
                    pageSize: this.pageSize,
                    queryConditions: this.search
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.projects = data.data.projectInfos
                    this.total = data.data.totalCount
                }else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        initAccountInfo() {
            this.accountInfo = JSON.parse(localStorage.getItem('account'))
        },
        getProductType() {
            this.$http.get('/getProductTypeBriefInfos')
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.types = data.data
                }else{
                    this.$message({
                        type: 'warning',
                        message:data.msg
                    })
                }
            })
        },
        getProdcutsByType(id) {
            this.add_detail.product = []
            this.change_detail.product = []
            this.$http.get('/getProductBriefInfosByTypeId', {
                params:{
                    typeId: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.products = data.data
                }else{
                    this.products = []
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        handleChange(val) {
            this.selected = val
        },
        handleData(obj) {
            this.$http.get('/getProductTypeInfosByPageAndConditions', {
                params:{
                    page: 1,
                    pageSize: 1,
                    queryConditions: obj.typeName
                }
            })
            .then(res=>{
                let data = res.data
                if (data.success) {
                    this.change_detail.productType = data.data.productTypeInfos[0].typeId
                    this.getProdcutsByType(this.change_detail.productType)
                    let a = []
                    obj.productNames.forEach(pro => {
                        a.push(pro.id)
                    })
                    this.change_detail.product = JSON.parse(JSON.stringify(a))
                }else{
                    this.$message({
                        type: 'warning',
                        message:data.msg
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
        flex-direction: column;
        align-items: center;
    }
    .opra{
        display: flex;
        width: 90%;
        margin-bottom: 15px;
    }
    .table_area{
        width: 100%;
    }
</style>
