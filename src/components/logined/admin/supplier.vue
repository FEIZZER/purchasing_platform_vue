<!--
 * @Author: feizzer
 * @Date: 2021-12-13 20:55:09
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-22 16:53:36
 * @Description: 
-->
<template>
    <div class="main">
        <div class="op-area">
            <el-select v-model="selectIn" style="margin-right: 10px">
                <el-option label="未审核" value="0">未审核</el-option>
                <el-option label="已审核" value="1">已通过</el-option>
                <el-option label="退回" value="-1"></el-option>
            </el-select>
            <el-input v-model="searchIn" style="width: 50%;margin-right: 30px">
                <i slot="prepend"  class="el-icon-search"></i>
            </el-input>
            <el-button size="small" type="success" @click="doSearch">查询</el-button>
            <el-button size="small" type="warning" @click="ifAudits">审核</el-button>
        </div>
        <el-table :data="suppliers" :border="true"  @selection-change="handleChange">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index" label="编号" width="70px">
            </el-table-column>
            <el-table-column label="账号" prop="username" width="100px">
            </el-table-column>
            <el-table-column label="注册申请时间" prop="applyTime">
            </el-table-column>
            <el-table-column label="手机号" prop="phone">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="getDetail(scope.row.id)">详情</el-button>
                    <el-button size="mini" type="primary" @click="ifAudit(scope.row.id)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total"
            @prev-click="prePage" @next-click="nextPage" @current-change="changePage"> </el-pagination>
        <el-dialog :visible.sync="detail_visible" title="详情">
            <el-descriptions title="" :column="3">
                <el-descriptions-item label="用户名" :span="1">
                    {{detail.username}}
                </el-descriptions-item>
                <el-descriptions-item label="手机号" :span="2">
                    {{detail.phone}}
                </el-descriptions-item >
                <el-descriptions-item label="邮箱" :span="3">
                    {{detail.email}}
                </el-descriptions-item>
                <el-descriptions-item label="公司名称" :span="1">
                    {{detail.companyInfo.companyName}}
                </el-descriptions-item>
                <el-descriptions-item label="公司电话" :span="2">
                    {{detail.companyInfo.companyPhone}}
                </el-descriptions-item>
                <el-descriptions-item label="公司传真" :span="1">
                    {{detail.companyInfo.companyFax}}
                </el-descriptions-item>
                <el-descriptions-item label="公司邮箱" :span="2">
                    {{detail.companyInfo.companyEmail}}
                </el-descriptions-item>
                <el-descriptions-item label="法人" :span="1">
                    {{detail.companyInfo.corporateRepresentative}}
                </el-descriptions-item>
                <el-descriptions-item label="法人身份证" :span="2">
                    {{detail.companyInfo.identityCard}}
                </el-descriptions-item>
                <el-descriptions-item label="公司网站" :span="3">
                    {{detail.companyInfo.companyWebsite}}
                </el-descriptions-item>
                <el-descriptions-item label="地址" :span="3">
                    {{detail.companyInfo.companyAddress}}
                </el-descriptions-item>
            </el-descriptions>
            <div>
                <el-button type="success" @click="() => detail_visible = false">确定</el-button>
                <el-button type="primary" @click="getMoreDetail(detail.id)">查看更多信息</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="moreDetail_visible" title="其他信息">
            <div style="font-size: 20px;margin-bottom: 12px">联系人信息：</div>
            <div v-for="(con, index) in moreDetail.contacts" :key="'contact'+index">
                <el-descriptions :column="3">
                    <el-descriptions-item label="联系人" :span="1">{{con.contactName}} </el-descriptions-item>
                    <el-descriptions-item label="手机号" :span="1">{{con.contactPhone}} </el-descriptions-item>
                    <el-descriptions-item label="座机号" :span="1">{{con.contactTelephone}}</el-descriptions-item>
                    <el-descriptions-item label="传真号" :span="1">{{con.contactFax}}</el-descriptions-item>
                    <el-descriptions-item label="邮箱" :span="1">{{con.contactEmail}}</el-descriptions-item>
                    <el-descriptions-item label="备注" :span="1">{{con.contactremark}}</el-descriptions-item>
                </el-descriptions>
            </div>
            <div style="font-size: 20px;margin-bottom: 12px">产品信息：</div>
            <div v-for="(pro, index) in moreDetail.products" :key="'product'+index">
                <el-descriptions :column="3">
                    <el-descriptions-item label="产品" :span="1">{{pro.companyProduct}}</el-descriptions-item>
                    <el-descriptions-item label="年产量" :span="1">{{pro.yearlyCapacity}}</el-descriptions-item>
                    <el-descriptions-item label="批准文号" :span="1">{{pro.authenticationCode}}</el-descriptions-item>
                    <el-descriptions-item label="有效期始" :span="1">{{pro.indateStart}}</el-descriptions-item>
                    <el-descriptions-item label="有效期至" :span="1">{{pro.indateEnd}}</el-descriptions-item>
                    <el-descriptions-item label="备注" :span="1">{{pro.companyRemark}}</el-descriptions-item>
                </el-descriptions>
            </div>
            <div style="font-size: 20px;margin-bottom: 12px">主要客户信息：</div>
            <div>
                <el-button type="primary" @click="() => moreDetail_visible = false">确认</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>
<script>
export default {
    name: 'PurchasingPlatformVueSupplier',
  
    data() {
        return {
            accountInfo: {},
            suppliers: [],
            detail: {
                companyInfo: {},
            },
            detail_visible: false,
            moreDetail_visible: false,
            moreDetail: {},
            searchIn: '',
            thing: '',
            selectIn: '0',
            select: '0',
            total:0,
            page:1,
            pageSize: 10,
            selected_column: [],
            audit_visible: false,
            audits_visible: false
        };
    },
    mounted() {

    },
    created() {
        this.initAccountInfo()
        this.getsupplier()
    },

    methods: {
        ifAudits(){
            this.$confirm('是否通过选中账号的申请', '审核', {
                confirmButtonText: '通过',
                cancelButtonText: '拒绝',
                center: true,
                distinguishCancelAndClose: true,
                type: 'primary'
            })
            .then(() => {
                this.doAudits(1)
            })
            .catch(res => {
                if (res === 'cancel')
                this.doAudits(-1)
            })
        },
        ifAudit(id){
            this.$confirm('是否通过该申请','申请',{
                confirmButtonText: '通过',
                cancelButtonText: '拒绝',
                center: true,
                distinguishCancelAndClose: true,
                type: 'primary'
            })
            .then(()=>{
                this.doAudit(id, 1)
            })
            .catch(res=>{
                if (res==='cancel')
                this.doAudit(id, -1)
            })
        },
        doSearch() {
            this.thing = this.searchIn
            this.select = this.selectIn
            if (this.select == '0')
            this.getsupplier()
            else{
                this.getAuditedSupplier()
            }
        },
        prePage(page) {
            this.page = page
            if (this.select == '0')
            this.getsupplier()
            else{
                this.getAuditedSupplier()
            }
        },
        nextPage(page) {
            this.page = page
            if (this.select == '0')
            this.getsupplier()
            else{
                this.getAuditedSupplier()
            }
        },
        changePage(page) {
            this.page = page
            if (this.select == '0')
            this.getsupplier()
            else{
                this.getAuditedSupplier()
            }
        },
        doAudit(id, state) {
            this.$http({
                url: '/checkSupplierInfo',
                method:  'put',
                params:{
                    managerId: this.accountInfo.accountId,
                    state: state,
                    supplierId: id,
                },
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.$message({
                        type: 'success',
                        message: '已通过该申请'
                    })
                    this.getsupplier()
                }else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
            .catch(res => {
                console.error(res)
            })
        },
        doAudits(state) {
            this.selected_column.forEach(col => {
                this.doAudit(col.id, state)
            })
        },
        handleChange(val) {
            this.selected_column = val
        },
        initAccountInfo() {
            this.accountInfo = JSON.parse(localStorage.getItem('account'))
           
        },
        getsupplier() {
            this.$http({
                method: 'get',
                url: '/getAllUnreviewedSupplierInfoByConditions',
                params:{
                    page: this.page,
                    pageSize: this.pageSize,
                    queryConditions: this.thing
                }
            })
            .then(res => {
                let data = res.data
               
                if (data.success) {
                    this.suppliers = data.data.supplierInfos
                    this.total = data.data.totalCount
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        getAuditedSupplier() {
            this.$http.get('/getAllAuditedSupplierInfoByConditions', {
                params:{
                    managerId: this.accountInfo.accountId,
                    page: this.page,
                    pageSize: this.pageSize,
                    queryConditions: this.thing,
                    state: this.select
                }
            })
            .then(res => {
                let data = res.data
                if (data.success){
                    this.suppliers = data.data.supplierInfos
                    this.total = data.data.totalCount
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
        getDetail(id) {
            this.$http.get('/getSupplierMainInfo', {
                params: {
                    supplierId: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.detail = data.data
                    this.detail_visible = true
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
        },
        getMoreDetail(id) {
            this.$http.get('/getSupplierOtherInfo', {
                params:{
                    supplierId: id
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.moreDetail = data.data
                    this.moreDetail_visible = true
                    this.detail_visible = false
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
}
.op-area{
    margin: 30px;
    margin-bottom: 20px;
    margin-top: 15px;
    width: 100%;
    display: flex;

}
.el-dialog__body{
    padding-top: 8px;
}
.cancekButton{
    color: #000;
}
</style>