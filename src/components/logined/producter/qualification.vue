<!--
 * @Author: feizzer
 * @Date: 2021-11-22 21:42:01
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-23 15:51:14
 * @Description: 
-->
<template>
    <div style="height:100%; display: flex;">
        <div class="production">
            <el-tree :data="productions" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="purchase">
            <p>当前开通审核某某商品的采购员</p>
            <el-table :data="purchase" style="width: 100%">
                <el-table-column prop="date" header-align="center" align="center" label="审核开放日期" width="250">
                </el-table-column>
                <el-table-column prop="account" label="采购员账号" width="180">
                </el-table-column>
                <el-table-column label="操作" prop="status"> 
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status ===  -1" size="small" type="mini">申请</el-button>
                        <el-button v-if="scope.row.status ===  0" type="info" size="mini" disabled>正在审核</el-button>
                        <el-button v-if="scope.row.status ===  1" type="success" size="mini" disabled>以获资质</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueQualification',

    data() {
        return {
            productions: [
                {
                    label: '鸡蛋'
                },
                {label: '泡面'}, {label: '火焰杯'}, {label: '可乐'}
            ],
            purchase:[
                {
                    date: '2021-11-1~2021-11-30',
                    account: '魔法部',
                    status: -1,
                },
                {
                    date: '2021-10-1~2021-11-1',
                    account: '国防部',
                    status: 0
                },
                {
                    date: '2021-11.1~2021-12.1',
                    account: '南京工业大学',
                    status: 1
                }
            ]
        };
    },

    mounted() {
    },

    methods: {
        handleNodeClick(data) {
            console.log(data)
        }
    },
};
</script>

<style lang="css" scoped>
.production{
    padding: 20px;
    flex-grow: 1;
}
.purchase{
    padding: 20px;
    flex-grow: 3;
}
p{
    margin: 10px;
    margin-bottom: 25px;
    font-size: 20px;
}
</style>
