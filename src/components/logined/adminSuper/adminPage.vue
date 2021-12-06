<!--
 * @Author: feizzer
 * @Date: 2021-12-05 20:51:41
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-06 16:51:33
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
            <el-button @click="addAdmin" type="primary" size="mini" style="margin-top: 15px;margin-bottom: 20px">添加</el-button>
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
                <el-descriptions-item label="密码" :span="3">{{detail.password}}</el-descriptions-item>
                <el-descriptions-item label="管辖商品" :span="3">
                    <el-tag style="margin-right: 5px" size="mini" v-for="type in detail.productTypes" :key="type">
                        {{type}}
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
            <el-form :model="detailEdit">
                <el-form-item label="账户名" label-width="80px">
                    <el-input v-model="detailEdit.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                    <el-input v-model="detailEdit.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px">
                    <el-input v-model="detailEdit.mobilePhone"></el-input>
                </el-form-item>
                <el-form-item label="组织" label-width="80px">
                    <el-select v-model="detailEdit.organizeName">
                        <el-option v-for="org in orgOptions" :key="org.id" :label="org.organizeName"
                                    :value="org.organizeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品目录" label-width="80px">
                    <el-tag style="margin-right: 6px"  closable @close="handleClose(type)"
                                v-for="type in detailEdit.productTypes" :key="type">
                        {{type}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="备注" label-width="80px">
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
            tableDetail: {}
        };
    },
    created() {
        this.getAdmins()
    },
    mounted() {
        
    },

    methods: {
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
            this.editVisible = true
            this.detailEdit = {}
            this.detailTitle = '添加新管理员',
            this.isEditNew = true
        }, 
        handleClose(tag) {
            console.log('close')
            this.detailEdit.productTypes.splice(this.detailEdit.productTypes.indexOf(tag), 1)
        },
        submitEdit() {
            //新增的管理员 方法
            if (this.isEditNew) {
                let params = {}
                params.username = this.detailEdit.username
                params.password = this.detailEdit.password
                params.mobilePhone = this.detailEdit.mobilePhone
                params.organizeName = this.detailEdit.organizeName
                params.productTypes = this.detailEdit.productTypes || ["蛋白质"]
                params.description = this.detailEdit.description
                console.log(params)
                this.$http({
                    url: '/addManagerInfo',
                    method: 'post',
                    data: {
                        username: this.detailEdit.username,
                        password: '123456',
                        mobilePhone: this.detailEdit.mobilePhone,
                        organizeName: this.detailEdit.organizeName,
                        productTypes: this.detailEdit.productTypes || ['蛋白质'],
                        description: this.detailEdit.description
                    },
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })
            }   
            else{

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
            this.editVisible = true
            this.detailVisible = false
            this.isEditNew = false
            this.detailEdit = this.detail
        },
        deleteAdmin() {
            console.log(this.detailId)
            this.$http( {
                url: '/deleteManagerInfo',
                method: 'delete',
                params :{
                    id: this.detailId
                },
                timeout: 100
            })
            .then(res => {
                console.log(res)
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
            console.log(data)
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
                console.log(res)
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
