<!--
 * @Author: feizzer
 * @Date: 2021-11-24 21:34:01
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-06 13:58:18
 * @Description: 
-->
<template>
    <div style="height: 100%">

        <div style="margin-left: 20px; margin-bottom: 30px">
            <el-button @click="showDialog" style="margin-right: 20px" type="primary" plain>发布标案</el-button>
            <el-input style="width: 70%" placeholder="请输入标案编号或名称">
                 <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-table :data="productsTable">
            <el-table-column label="编号" align="center" width="50px" prop="id"></el-table-column>
            <el-table-column label="产品" align="center" width="100px" prop="product" ></el-table-column>
            <el-table-column label="数量" align="center" width="50px" prop="amount"></el-table-column>
            <el-table-column align="center" min-width="50px" label="性质" prop="property">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.property == 1">一轮竞价</el-tag>
                    <el-tag type="success" v-if="scope.row.property == 2">两轮竞价</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="下一轮竞价" align="center" prop="timeRange" ></el-table-column>
            <el-table-column label="竞价情况" align="center" prop="timeRange" >
                <template slot-scope="scope">
                    <el-tag @click="showDialog2(scope.row)" class="completeing"
                            v-if="isInRange(scope.row.timeRange) && scope.row.status == 2">竞价中</el-tag>
                    <el-tag v-else-if="scope.row.status == 2">未开始</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" >
                <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.status == 0">未发布</el-tag>
                    <el-tag type="warning" v-if="scope.row.status == 1">审核中</el-tag>
                    <el-tag type="primary" v-if="scope.row.status == 2">已发布</el-tag>
                    <el-tag type="danger" v-if="scope.row.status == -1">已退回</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" prop="status" >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDialog"
                        v-if="scope.row.status == 0 || scope.row.status == -1" >查看</el-button>
                    <el-button type="danger" size="mini" 
                        v-if="scope.row.status == 0 || scope.row.status == -1">删除</el-button>
                    <el-button type="warning" size="mini" v-if="scope.row.status == 1">退回</el-button>
                    <el-button type="info" disabled size="mini" v-if="scope.row.status == 2">无需操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="标案发布信息" :visible.sync="dialogFormVisible">
             <el-form :model="releaseData" :inline="true">
                <el-form-item label="产品" label-width="80px">
                    <el-select v-model="releaseData.prodcut">
                        <el-option value="仙女棒" label="仙女棒">仙女棒</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="招标数量" label-width="80px">
                    <el-input v-model="releaseData.number"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="releaseData" style="margin-top:30px;">
                <el-form-item label="" label-width="80px">
                    <el-button @click="addReleaseRange" plain>添加竞价轮数</el-button>
                </el-form-item>
                <el-form-item label="一轮竞价" label-width="80px">
                    <el-date-picker :picker-options="datePickerOption" type="daterange" v-model="releaseData.releaseRange[0].timeRange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="二轮竞价" label-width="80px" v-if="releaseData.releaseRange.length == 2">
                    <el-date-picker :picker-options="datePickerOption2" type="daterange" v-model="releaseData.releaseRange[1].timeRange">
                    </el-date-picker>
                    <el-button type="danger" @click="deleteReleaseRange" icon="el-icon-delete" circle plain=""></el-button>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" style="margin-left: 80px; margin-top: 40px">
                <el-button type="" @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="success" @click="dialogFormVisible = false">保 存</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">发 布</el-button>
            </div>
        </el-dialog>   
        <el-dialog  title="标案XXX的竞价详情" :visible.sync="dialogCompleteVisible">
            <el-empty v-if="completeData.length == 0" description="描述文字"></el-empty>
            <el-table v-else :data="completeData">
                <el-table-column label="供应商" min-width="" align="center" prop=""></el-table-column>
                <el-table-column label="竞价时间" min-width="" align="center" prop=""></el-table-column>
                <el-table-column label="价格" min-width="" align="center" prop=""></el-table-column>
                <el-table-column label="操作" min-width="" align="center" prop="">
                    <el-button type="primary">接收</el-button>
                </el-table-column>
            </el-table>
            <div style="margin-left: 80px; margin-top: 40px">
                <el-button type="primary" @click="dialogCompleteVisible = false">确 定</el-button>
                
            </div>
        </el-dialog>     
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueReleaseproduct',

    data() {
        return {
            dialogCompleteVisible: false,
            dialogFormVisible: false, 
            productsTable: [
                // 0保存 1审核中 2已发布 -1已退回
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: 0},
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: 1},
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: 2},
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: -1},
                {product: '仙女棒', amount: 30, property: 2, timeRange: '2021.11.1~2021.12.1',  status: 0},

            ],
            releaseData:{
                product: '',
                number: '',
                releaseRange: [
                    {id: 0, timeRange: ''},
                    
                ]

            },
            completeData: [

            ],
            datePickerOption: {
                disabledDate(time) {
                    return time.getTime() < Date.now() -8.64e7
                }
            },
            datePickerOption2: {
                disabledDate(time) {
                    return time.getTime() < Date.now() -8.64e7
                }
            },
        };
    },

    mounted() {
    },

    methods: {
        showDialog() {
            this.dialogFormVisible = true
            
        },
        addReleaseRange() {
            let len = this.releaseData.releaseRange.length
            if (len < 2) {
                this.releaseData.releaseRange.push({id: 1, timeRange: ''})
            } else{
                this.$message({
                    type: 'warning',
                    message: '最多可以设置两轮竞价',
                })
            }
        },
        deleteReleaseRange() {
            this.releaseData.releaseRange.splice(1,1)
        },
        // getDatePickerOption2() {
        //     let that = this
        //     return {
        //         disabledDate(time) {
        //             console.log(typeof that.releaseData.releaseRange[0].timeRange[1])
        //             //if (that.releaseData.releaseRange[0])
        //             return  time.getTime() < Date.now() - 8.64e7
        //         }
        //     }
        // }
        isInRange(timeRange) {
            return true
        },
        showDialog2(data) {
            console.log(data)
            this.dialogCompleteVisible = true
            
        }
    },
};
</script>

<style lang="css" scoped>
    .completeing:hover{
        cursor: pointer !important;
    }
</style>
