<!--
 * @Author: feizzer
 * @Date: 2021-12-13 20:57:20
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-18 17:13:18
 * @Description: 
-->
<template>
    <div class="main">
        <div class="opra">
            <el-input style="width:60%" v-model="searchIn">
                <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
            </el-input>
            <el-button @click="showAdd" type="primary" size="small" style="margin-left: auto;">新增</el-button>
            <el-button @click="doDeletes" type="danger" size="small" style="margin-right: 50px">
                        删除</el-button>
        </div>
        <div class="table_area">
            <el-table style="width:100%" :data="types" border @selection-change="handleChange">
                <el-table-column type="selection" > </el-table-column>
                <el-table-column type="index"  label="序号" width="50px"> </el-table-column>
                <el-table-column label="类型名称" align="center" prop="productType"></el-table-column>
                <el-table-column label="创建者" align="center" prop="creator"  >
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime"  >
                </el-table-column>
                <el-table-column label="更改者" align="center" prop="modifier"  >
                </el-table-column>
                <el-table-column label="更改时间" align="center" prop="updateTime"  >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="showChange(scope.row.typeId)">
                                修改</el-button>
                        <el-button size="mini" type="danger" @click="doDelete(scope.row.typeId)">
                                删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
         <el-pagination layout="prev, pager, next" :total="total"
                @prev-click="prePage" @next-click="nextPage" @current-change="changePage"> </el-pagination>

        <el-dialog :visible.sync="add_visible" title="新增产品类型信息">
            <el-form :model="add_detail" :rules="rules" ref="addForm">
                <el-form-item label="类型名" label-width="80px" prop="productType">
                    <el-input v-model="add_detail.productType"></el-input>
                </el-form-item>
                <el-form-item label="类型描述" label-width="80px" prop="description">
                    <el-input v-model="add_detail.description"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="submitAdd">提交</el-button>
                    <el-button type="info" @click="()=>{add_visible=false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="change_visible" title="修改产品类型信息">
            <el-form :model="change_detail" :rules="rules" ref="changeForm" >
                <el-form-item label="编号" label-width="80px">
                    <el-input disabled v-model="change_detail.id"></el-input>
                </el-form-item>
                <el-form-item label="类型名" label-width="80px" prop="productType">
                    <el-input v-model="change_detail.productType"></el-input>
                </el-form-item>
                <el-form-item label="类型描述" label-width="80px" prop="description">
                    <el-input v-model="change_detail.description"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px" prop="">
                    <el-button type="primary" @click="submitChange">提交</el-button>
                    <el-button type="info" @click="()=>{change_visible=false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueManagetype',

    data() {
        return {
            types:[],
            page: 1,
            pageSize: 10,
            total: 0,
            search: '',
            searchIn:'',
            selected: [],

            change_detail:{},
            change_visible: false,
            add_detail:{},
            add_visible: false,


            rules:{
                productType:[
                    {required: true, message: '类型名称不能为空', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入相关描述信息', trigger: 'blur'}
                ]
            }
        };
    },

    mounted() {
        
    },
    created() {
        this.getTypes()
        this.initAccountInfo()
    },
    methods: {
        doDeletes() {
            this.selected.forEach(type=>{
                this.doDelete(type.typeId)
            })
        },
        doDelete(id) {
            this.$http({
                url: '/deleteProductTypeInfo',
                method: 'delete',
                params: {
                    id: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.getTypes()
                    this.$message({
                        type: 'info',
                        message: '产品类型已删除'
                    })
                }else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        doSearch() {
            this.search = this.searchIn
            console.log(this.search)
            this.getTypes()
        },
        showAdd() {
            this.add_visible = true
        },
        submitAdd() {
            this.$refs.addForm.validate(res=>{
                if (res) {
                    this.$http({
                        url: '/addProductType',
                        method: 'post',
                        data: {
                            accountId: this.accountInfo.accountId,
                            description: this.add_detail.description,
                            productType: this.add_detail.productType,
                        }
                    })
                    .then(res => {
                        let data = res.data
                        if (data.success) {
                            this.$message({
                                type: 'success',
                                message: '新增类型信息成功'
                            })
                            this.getTypes()
                            this.add_visible = false
                        }
                        else{
                            this.$message({
                                type: 'warning',
                                message:data.msg
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err)
                    })
                }
            })
             
        },
        submitChange() {
            this.$refs.changeForm.validate(res => {
                if (res) {
                    this.$http({
                        url: '/updateProductTypeInfo',
                        method: 'put',
                        data: {
                            accountId: this.accountInfo.accountId,
                            id: this.change_detail.id,
                            description: this.change_detail.description,
                            productType: this.change_detail.productType
                        }
                    })
                    .then(res=>{
                        let data = res.data
                        if (data.success) {
                            this.getTypes()
                            this.change_visible = false
                            this.$message({
                                type: 'success',
                                message: '修改类型信息成功'
                            })
                        }else{
                            this.$message({
                                type:'warning',
                                message: data.msg
                            })
                        }
                    })
                }
            })
        },
        showChange(id) {
            console.log(id)
            this.$http.get('/queryBriefInfoById', {
                params:{
                    typeId: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.change_detail = data.data
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
        getTypes() {
            this.$http.get('/getProductTypeInfosByPageAndConditions', {
                params:{
                    page: this.page,
                    pagSize: this.pagSize,
                    queryConditions: this.search  
                }

            })  
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.types = data.data.productTypeInfos
                    this.total = data.data.totalCount
                }else{
                    this.$message({
                        type: 'warning',
                        message: '获取类型失败：'+data.msg 
                    })
                }
            })
        },
        handleChange(val) {
            this.selected = val
        },
        initAccountInfo() {
            this.accountInfo = JSON.parse(localStorage.getItem('account'))
        },
        nextPage(page) {
            this.page = page
            this.getTypes()
        },
        prePage(page) {
            this.page = page
            this.getTypes()
        },
        changePage(page) {
            this.page = page
            this.getTypes()
        }
    },
};
</script>

<style lang="css" scoped>
 .main{
     display: flex;
     flex-direction: column;
     height: 100%;
    align-items: center;
 }
 .opra{
     width: 90%;
     display: flex;  
     margin-bottom: 15px;
 }
 .table_area{
     width: 100%;
 }
</style>