<!--
 * @Author: feizzer
 * @Date: 2021-12-05 20:56:53
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-06 17:56:39
 * @Description: 
-->

<template>
    <div style="height:100%">
        <div style="margin: 15px; display: flex;">
            <el-button style="margin-right: 20px" type="primary" @click="changeOrganize(null, true)">
                添加组织信息
            </el-button>
            <el-input style="width: 60%" placeholder="请输入内容" v-model="searchThing">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
        </div>
        <el-table :data="organizes">
            <el-table-column label="编号" width="300px" prop="id">

            </el-table-column>
            <el-table-column label="名称" width="220px" prop="organizeName">

            </el-table-column>
            <el-table-column label="描述" width="300px" prop="description">

            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="changeOrganize(scope.row.id, false)">修改</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin:30px 500px">
            <el-pagination layout="prev, pager, next" :total="organizes.length">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="editVisible" :title="title">
            <el-form :model="organization" ref="form" :rules="rules">
                <el-form-item label="编号" label-width="80px">
                    <el-input v-model="organization.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称" label-width="80px" prop="organizeName">
                    <el-input v-model="organization.organizeName"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="80px" prop="description">
                    <el-input v-model="organization.description"></el-input>
                </el-form-item>
                <el-form-item label-width="80px">
                    <el-button type="" @click="cancel">取消</el-button>
                    <el-button type="primary" @click="submitOrg">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueOrgnizationpage',

    data() {
        return {
            organizes: [],
            searchThing: '',
            organization: {},
            editVisible: false,
            title: '',
            isEditNew: false,
            rules: {
                description:[
                    {required: true, message: '描述信息不能为空', trigger: 'blur'}
                ],
                organizeName: [
                    {required: true, message: '组织名不能为空', trigger: 'blur'}
                ]
            }
        };
    },
    created() {
        this.getAllOrganizes()
    }, 
    mounted() {
        
    },

    methods: {  
        search() {
            let empty = []
            this.$http.get('/getAllOrganizationInfosByPageAndConditions', {
                params:{
                    queryConditions: this.searchThing
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    empty = empty.concat(data.data.organizations)
                }
                this.$http.get('/getOrganizationInfoById', {
                    params: {
                        id: this.searchThing
                    }
                })
                .then(res => {
                    let ddata = res.data
                    if(ddata.success) {
                        empty = empty.concat(ddata.data)
                    }

                    if (empty.length === 0) {
                        this.$message({
                            type: 'warning',
                            message: '未查询到相关组织'
                        })
                    }else{
                        this.organizes = empty
                    }
                })
            })
        },
        submitOrg() {
            if (!this.isEditNew) {
                this.$refs.form.validate(res => {
                    this.$http({
                    url: '/updateOrganizationInfo',
                    method: 'put',
                    data:{
                        id: this.organization.id,
                        organizeName: this.organization.organizeName,
                        description: this.organization.description
                    }
                    })
                    .then(res => {
                        let data = res.data
                        if (data.success) {
                            this.getAllOrganizes()
                            this.editVisible = false
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                        }else{
                            this.$message({
                                type: 'warning',
                                mesasge: data.msg
                            })
                        }
                        })
                    })
            }else {
                this.$refs.form.validate(res => {
                    if (res) {
                       this.$http({
                            url: '/addOrganizationInfo',
                            method: 'post',
                            data:{
                                organizeName: this.organization.organizeName,
                                description: this.organization.description
                            }
                        })
                        .then(res => {
                            let data = res.data
                            if (data.success) {
                                this.getAllOrganizes()
                                this.editVisible = false
                                this.$message({
                                    type: 'success',
                                    message:'添加成功'
                                })
                            }
                        })
                    }
                })
            }
                
        },
        cancel() {
            this.editVisible = false
        },
        getAllOrganizes() {
            this.$http({
                method: 'get',
                url: '/getAllOrganizationInfos',
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.organizes = data.data
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg,
                    })
                }
            })
            .catch( err => {
                console.error(err)
            })
        },
        changeOrganize(id, is) {
            this.isEditNew = is
            if (is) {
                this.organization = {}
                this.editVisible = true
                this.title = '新组织信息'
            }
            else {
                this.$http.get('/getOrganizationInfoById', {
                    params: {
                        id: id
                    }
                })
                .then(res => {
                    this.organization = res.data.data
                })
                this.editVisible = true
                this.title = `[${id}] 组织的信息`
            }
            
        }
    },
};
</script>

<style lang="css" scoped>

</style>
