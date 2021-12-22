<!--
 * @Author: feizzer
 * @Date: 2021-12-13 20:57:07
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-22 14:28:29
 * @Description: 
-->
<template>
    <div class="main">
        <div class="opra">
            <el-input style="width: 60%" v-model="searchIn">
                <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
            </el-input>
            <el-button style="margin-left: auto;" type="primary" size="small" 
                    @click="()=>{add_visible=true;getProductType();}">新增</el-button>
            <el-button style="margin-right: 50px" type="danger" size="small" 
                    @click="doDeletes">删除</el-button>
        </div>
        <div class="table">
            <el-table :data="products" border @selection-change="handleChange">
                <el-table-column type="selection" label="" width="" align="center">

                </el-table-column>
                <el-table-column type="index" label="编号" width="" align="center">

                </el-table-column>
                <el-table-column  label="产品名称" width="" align="center" prop="productName">

                </el-table-column>
                <el-table-column  label="创建者" width="" align="center" prop="creator">

                </el-table-column>
                <el-table-column  label="创建时间" width="" align="center" prop="createTime">

                </el-table-column>
                <el-table-column  label="更改者" width="" align="center" prop="modifier">

                </el-table-column>
                <el-table-column  label="更改时间" width="" align="center" prop="updateTime">

                </el-table-column>
                <el-table-column label="所属类型" width="" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.typeBriefInfo.productType}}
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="200px" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" 
                                                    @click="showChange(scope.row.id)">修改</el-button>
                        <el-button type="danger"  size="mini" @click="doDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination layout="prev, pager, next" :total="total"
                @prev-click="prePage" @next-click="nextPage" @current-change="changePage"> </el-pagination>
        <el-dialog :visible.sync="add_visible" title="新增产品信息">
            <el-form :model="add_detail" :rules="rules">
                <el-form-item label="产品名称" label-width="80px" prop="productName">
                    <el-input v-model="add_detail.productName"></el-input>
                </el-form-item>
                <el-form-item label="计量单位" label-width="80px" prop="productUnit">
                    <el-input v-model="add_detail.productUnit"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" label-width="80px" prop="productType">
                    <el-select v-model="add_detail.productType">
                        <el-option v-for="type in productTypes" :key="'index'+type.id"
                            :label="type.productType" :value="type.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物料编号" label-width="80px" prop="productCode">
                    <el-input v-model="add_detail.productCode"></el-input>
                </el-form-item>
                <el-form-item label="产品规格" label-width="80px" prop="productModel">
                    <el-input v-model="add_detail.productModel"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="doSubmitNew">提交</el-button>
                    <el-button type="info" @click="()=>{add_visible=false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="change_visible" title="修改产品信息">
            <el-form :model="change_detail" :rules="rules">
                <el-form-item label="编号" label-width="80px">
                    <el-input v-model="change_detail.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="产品名称" label-width="80px" prop="productName">
                    <el-input v-model="change_detail.productName"></el-input>
                </el-form-item>
                <el-form-item label="计量单位" label-width="80px" prop="productUnit">
                    <el-input v-model="change_detail.productUnit"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" label-width="80px" prop="productType">
                    <el-select v-model="change_detail.productType">
                        <el-option v-for="type in productTypes" :key="'index'+type.id"
                            :label="type.productType" :value="type.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物料编号" label-width="80px" prop="productCode">
                    <el-input v-model="change_detail.productCode"></el-input>
                </el-form-item>
                <el-form-item label="产品规格" label-width="80px" prop="productModel">
                    <el-input v-model="change_detail.productModel"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="80px">
                    <el-button type="primary" @click="doSubmitChange">提交</el-button>
                    <el-button type="info" @click="()=>{change_visible=false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueManageproduct',

    data() {
        return {
            accountInfo:{},
            products: [],
            page: 1,
            pageSize: 10,
            total: 0,
            search: '',
            searchIn:'',
            add_visible: false,
            add_detail: {},
            productTypes: [],
            change_visible:false,
            change_detail:{},

            selected: [],


            rules:{
                productName: [
                    {required: true, message: '请输入产品名', trigger: 'blur'}
                ],
                productCode:[
                    {required: true, message: '请输入物料编码', trigger: 'blur'},
                ],
                productModel: [
                    {required: true, message: '请输入产品型号',trigger: 'blur'}
                ],
                productType:[
                    {required: true, message: '请选择合适的产品类型', trigger: 'blur'}
                ],
                productUnit:[
                    {required: true, message: '请输入合适单位', trigger: 'blur'}
                ]
            }
        };
    },

    mounted() {
        
    },
    created() {
        this.initAccountInfo()
        this.getProducts()
        this.getProductType()
    },
    methods: {
        doDeletes() {
            this.selected.forEach(pro=>{
                this.doDelete(pro.id)
            })
        },
        handleChange(val) {
            this.selected = val
        },
        doSearch() {
            this.search = this.searchIn
            this.getProducts()
        },
        doSubmitChange() {
            console.log(this.change_detail)
            this.$http({
                url: '/updateProductInfo',
                method: 'put',
                data:{
                    id: this.change_detail.id,
                    accountId: this.accountInfo.accountId,
                    productName: this.change_detail.productName,
                    productCode: this.change_detail.productCode,
                    productModel: this.change_detail.productModel,
                    productType: this.change_detail.productType,
                    productUnit: this.change_detail.productUnit
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.change_visible =  false
                    this.getProducts()
                    this.$message({
                        type: 'success',
                        message: '修改信息成功' 
                    })
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        showChange(id) {
            console.log(id)
            this.$http.get('/getProductInfoById', {
                params:{
                    id: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.change_detail = data.data
                    this.$http.get('/getProductTypeInfosByPageAndConditions', {
                            params: {
                                page:1,
                                pageSize: 10,
                                queryConditions: data.productType
                            }
                        })
                        .then(res => {
                            let data = res.data
                            if (data.success) {
                                this.change_detail.productType = 
                                    data.data.productTypeInfos[0].typeId
                                this.change_visible = true
                            }
                            else{
                                this.$message({
                                    type: 'warning',
                                    message: data.msg
                                })
                            }
                        })
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
            
        },
        doSubmitNew() {
            this.$http({
                url: '/addProductInfo',
                method: 'post',
                data:{
                    accountId: this.accountInfo.accountId,
                    productName: this.add_detail.productName,
                    productCode: this.add_detail.productCode,
                    productModel: this.add_detail.productModel,
                    productType: this.add_detail.productType,
                    productUnit: this.add_detail.productUnit
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.add_visible = false
                    this.getProducts()
                    this.$message({
                        type: 'success',
                        message: '添加产品信息成功'
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
        doDelete(id) {
            this.$http({
                method: 'delete',
                url:'/deleteProductInfo',
                params:{
                    id: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.getProducts()
                    this.$message({
                        type: 'info',
                        message: '该产品已成功删除'
                    })
                }   
                else{   
                    this.$message({
                        type: 'warning',
                        message:data.msg
                    })
                }
            })
        },
        doChange(id) {

        },
        getProducts() {
            this.$http.get('/getAllProductInfosByPageAndConditions', {
                params:{
                    page: this.page,
                    pageSize: this.pageSize,
                    queryConditions: this.search
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.products = data.data.productInfos
                    this.total = data.data.totalCount
                    console.log(this.products)
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
        getProductType() {
            this.$http.get('/getProductTypeBriefInfos')
            .then(res => {
                let data = res.data
                if(data.success) {
                    this.productTypes = data.data
                }else{
                    this.$message({
                        type: 'warning',
                        message:data.msg
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
        nextPage(page) {
            this.page = page
            this.getProducts()
        },
        prePage(page) {
            this.page = page
            this.getProducts()
        },
        changePage(page) {
            this.page = page
            this.getProducts()
        }

    },
};
</script>

<style lang="css" scoped>
.main{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.opra{
    display: flex;
    margin-bottom: 15px;
    width: 90%;
}
.table{
    width: 100%;
}
</style>