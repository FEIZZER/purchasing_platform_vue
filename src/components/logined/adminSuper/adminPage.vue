<!--
 * @Author: feizzer
 * @Date: 2021-12-05 20:51:41
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-05 23:03:34
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
            <el-button type="primary" size="mini" style="margin-top: 15px">添加</el-button>
        </div>
        <div class="purchase-area">
            <p style="font-size: 20px; margin-bottom: 15px">管理员[{{tableDetail.username}}]采购员列表</p>
            <el-table :data="purchaseTable">
                <el-table-column label="采购员编号"></el-table-column>
                <el-table-column label="名称"></el-table-column>
                <el-table-column label="XX"></el-table-column>
                <el-table-column label="XX"></el-table-column>
                <el-table-column label="操作">
                      
                </el-table-column>
            </el-table>
            <div v-if="purchaseTable.length == 0">
                    <el-empty description="数据不见了"></el-empty>
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
                <el-button type="success">修改</el-button>
                <el-button type="danger">删除</el-button>
            </div>
        </el-dialog>

        <el-dialog>

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
            treeProp:{
                label: 'username',
            },
            detailVisible: false,
            detailTitle: '',
            detail:{},
            tableDetail: {}
        };
    },
    created() {
        this.getAdmins()
    },
    mounted() {
        
    },

    methods: {
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
