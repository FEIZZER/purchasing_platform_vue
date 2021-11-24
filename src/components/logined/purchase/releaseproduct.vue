<!--
 * @Author: feizzer
 * @Date: 2021-11-24 21:34:01
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-24 22:28:59
 * @Description: 
-->
<template>
    <div style="height: 100%">
        <el-table :data="productsTable">
            <el-table-column label="产品" align="center" width="100px" prop="product" ></el-table-column>
            <el-table-column label="数量" align="center" width="50px" prop="amount"></el-table-column>
            <el-table-column align="center" min-width="50px" label="性质" prop="property">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.property == 1">一轮竞价</el-tag>
                    <el-tag type="success" v-if="scope.row.property == 2">两轮竞价</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="下一轮竞价" align="center" prop="timeRange" ></el-table-column>
            <el-table-column label="竞价情况" align="center" prop="" ></el-table-column>
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
                    <el-button type="warningy" size="mini" v-if="scope.row.status != 1">修改</el-button>
                    <el-button type="" size="mini" v-if="scope.row.status == 0">发布</el-button>
                </template>
            </el-table-column>
        </el-table>        
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueReleaseproduct',

    data() {
        return {
            productsTable: [
                // 0保存 1审核中 2已发布 -1已退回
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: 0},
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: 1},
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: 2},
                {product: '仙女棒', amount: 30, property: 1, timeRange: '2021.11.1~2021.12.1',  status: -1},
                {product: '仙女棒', amount: 30, property: 2, timeRange: '2021.11.1~2021.12.1',  status: 0},

            ]
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>

</style>
