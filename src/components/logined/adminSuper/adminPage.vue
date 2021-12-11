<!--
 * @Author: feizzer
 * @Date: 2021-12-05 20:51:41
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-11 15:19:36
 * @Description: 
-->
<template>
    <div style="height: 100%; display: flex">
        <div class="admin-area">
            <p style="font-size: 20px; margin-bottom: 15px">管理员列表</p>
            <el-tree node-key="id" :data="admins" :props="treeProp" @node-click="changeTable">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" size="mini" @click="show(data)">
                            查看
                        </el-button>
                        <el-button type="text" size="mini" @click="deleteNode(data)">
                            删除
                        </el-button>
                    </span>
                </span>
            </el-tree>
            <el-button @click="addAdmin" type="primary" size="mini" 
                                        style="margin-top: 15px;margin-bottom: 20px">
                添加</el-button>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="admins.length">
                </el-pagination>
            </div>
        </div>
        <div class="purchase-area" style="margin:0 auto">
            <p style="font-size: 20px; margin-bottom: 15px">管理员[{{tableDetail.username}}]采购员列表</p>
            <el-table :data="purchaseTable">
                <el-table-column width="100px" label="采购员编号"></el-table-column>
                <el-table-column label="名称"></el-table-column>
                <el-table-column label="XX"></el-table-column>
                <el-table-column label="XX"></el-table-column>
                <el-table-column label="操作">
                </el-table-column>
            </el-table>
            <div v-if="purchaseTable.length == 0">
                    <el-empty description="数据不见了"></el-empty>
            </div>
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="detailTitle" :visible.sync="detailVisible" :column="3">
            <el-descriptions title="用户信息">
                <el-descriptions-item label="用户名">{{detail.username}}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{detail.mobilePhone}}</el-descriptions-item>
                <el-descriptions-item label="组织">
                    {{detail.organizeName}}
                </el-descriptions-item>
                <el-descriptions-item label="管辖商品" :span="3">
                    <el-tag style="margin-right: 5px" size="mini" v-for="type in detail.productTypes" 
                                    :key="type.productType">
                        {{type.productType}}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="备注" :span="3">
                    {{detail.description}}
                </el-descriptions-item>
                
                
            </el-descriptions>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="editDialog">修改</el-button>
                <el-button type="danger" @click="deleteAdmin">删除</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="editVisible" :title="detailTitle">
            <el-form :model="detailEdit" ref="editForm" :rules="Rules">
                <el-form-item label="账户名" label-width="80px" prop="username">
                    <el-input v-model="detailEdit.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px" v-if="isEditNew"  prop="password">
                    <el-input v-model="detailEdit.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px" prop="mobilePhone">
                    <el-input v-model="detailEdit.mobilePhone"></el-input>
                </el-form-item>
                <el-form-item label="组织" label-width="80px" prop="organizeName">
                    <el-select v-model="detailEdit.organizeName">
                        <el-option v-for="org in orgOptions" :key="org.id" :label="org.organizeName"
                                    :value="org.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品目录" label-width="80px" prop="productTypes">
                    <el-select multiple v-model="detailEdit.productTypes">
                        <el-option v-for="option in productOptions" :key="option.id" :value="option.id" :label="option.productType">
                            {{option.productType}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" label-width="80px" prop="description">
                    <el-input v-model="detailEdit.description"></el-input>
                </el-form-item>
                <el-form-item label-width="80px" label=" "> 
                    <el-button type="primary" @click="submitEdit">提交</el-button>
                    <el-button type="" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueAdminpage',

    data() {
        return {
            purchaseTable:[],
            admins:[],
            orgOptions: [],
            productOptions: [],
            treeProp:{
                label: 'username',
            },
            detailVisible: false,
            editVisible: false,
            isEditNew: false,
            detailTitle: '',
            detail:{},
            detailId: '',
            detailEdit: {},
            tableDetail: {},



            Rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true,min: 6, max: 20, message: '密码长度在6~20，必须包含数字小写字母和一个特殊符号',
                            trigger: ['blur', 'changed']}
                ],
                mobilePhone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, 
                                message: '请输入正确的手机号', trigger: 'blur'}
                ],
                organizeName: [
                    {required: true, message: '组织不能为空', trigger: 'blur'}
                ],
                productTypes: [
                    {required: true, message: '产品类型不能为空',trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请添加适当的描述', trigger: 'blur'}
                ],
                
            }
        };
    },
    created() {
        this.getAdmins()
    },
    mounted() {
        
    },

    methods: {
        getAllProductions() {
            this.$http.get('/getProductTypeBriefInfos')
            .then(res => {
                console.log(res)
                let data = res.data
                if (data.success) {
                    this.productOptions = data.data
                }
            })
        },
        getAllOrg() {
            this.$http.get('/getAllOrganizationInfos')
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.orgOptions = data.data
                }
            })
        },
        addAdmin() {
            this.getAllOrg()
            this.getAllProductions()
            this.editVisible = true
            this.detailEdit = {}
            this.detailTitle = '添加新管理员',
            this.isEditNew = true
        }, 
        submitEdit() {
            //新增的管理员 方法
            if (this.isEditNew) {
                this.$refs.editForm.validate(res => {
                    this.$http({
                        url: '/addManagerInfo',
                        method: 'post',
                        data: {
                            username: this.detailEdit.username,
                            password: this.detailEdit.password,
                            mobilePhone: this.detailEdit.mobilePhone,
                            organizeName: this.detailEdit.organizeName,
                            productTypes: this.detailEdit.productTypes,
                            description: this.detailEdit.description
                        },
                    })
                    .then(res => {
                        let data = res.data
                        if (data.success) {
                            this.editVisible = false
                            this.detailVisible = false
                            this.getAdmins()
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
                })
            }   
            else{
                this.$refs.editForm.validate(res => {
                    if (res) {
                        console.log(this.detailEdit)
                        this.$http({
                            method: 'put',
                            data: this.detailEdit,
                            url: '/updateManagerInfo'
                        })
                        .then(res => {
                            let data = res.data
                            if (data.success) {
                                this.editVisible = false
                                this.detailVisible = false
                                this.getAdmins()
                            }
                            else{
                                this.$message({
                                    type: 'warning',
                                    message: data.msg
                                })
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    }
                })
            }
        },
        cancel() {
            this.editVisible = false
            if (!this.isEditNew) {
                console.log(this.isEditNew)
                this.detailVisible = true
            }
        },
        editDialog() {
            this.getAllOrg()
            this.getAllProductions()
            this.editVisible = true
            this.detailVisible = false
            this.isEditNew = false
            this.detailEdit = this.detail
            let types_to_id = [];
            this.detailEdit.productTypes.forEach(element => {
                types_to_id.push(element.id)
            });
            this.detailEdit.productTypes = types_to_id
            this.getOrgByName(this.detailEdit.organizeName)
            console.log(this.detailEdit)  
        },
        getOrgByName(name) {
            this.$http.get('/getAllOrganizationInfosByPageAndConditions', {
                params: {
                    page: 1,
                    pageSize: 1,
                    queryConditions: name
                }
            })
            .then(res => {
                this.detailEdit.organizeName = res.data.data.organizations[0].id
            })
        },
        deleteAdmin() {

            this.$http( {
                url: '/deleteManagerInfo',
                method: 'delete',
                params :{
                    id: this.detailId
                },
                timeout: 100
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.$message({
                        type: 'success',
                        message: `已删除管理员[${this.detailId}]`
                    })
                    this.detailVisible = false
                    this.getAdmins()
                }
                else {
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
        changeTable(data) {
            this.tableDetail = data
        },
        getAdmins() {
            this.$http.get('/getAllManagerInfoByPage', {
                params:{
                    page: 1,
                    pageSize: 10,
                }
            })
            .then(res => {
                let data = res.data
                if (data.code === 200) {
                    this.admins = data.data.managerInfos
                }
            })
        },
        show(data) {
            let id = data.id
            this.$http.get('/getManagerInfoById', {
                params: {
                    managerId: data.id
                }
            })
            .then(res => {
                let data = res.data
                if (data.code == 200) {
                    this.detail = data.data
                    this.detailVisible = true
                    this.detailTitle =  `管理员[${id}]的信息`
                    this.detailId = id
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: res.msg
                    })
                }
            })

        }
    },
};
</script>

<style lang="css" scoped>
    .admin-area{
        width: 20%;
    }
    .purchase-area{
        padding-left: 30px;
    }
</style>
