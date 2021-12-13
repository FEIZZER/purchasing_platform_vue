<!--
 * @Author: feizzer
 * @Date: 2021-12-13 20:54:57
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-13 22:55:24
 * @Description: 
-->
<template>
    <div class="main">
        <el-table >
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVuePurchase',

    data() {
        return {
            purchases:[],
            accountInfo:{}
        };
    },

    mounted() {
        
    },

    methods: {
        initAccountInfo() {
            this.accountInfo = JSON.parse(localStorage.getItem('account'))
        },
        getPurchase() {
            this.$http.get('/getAllPurchasersByPage', {
                params: {
                    managerId: this.accountInfo.accountId,
                    page: 1,
                    pageSize: 10
                }
            })
            .then(res => {
                let data = res.data
                if (data.success) {
                    this.purchases = data.data
                }
                else {
                    this.$message({
                        type:'warning',
                        message: data.msg
                    })
                }
            })
            
        }
    },
};
</script>

<style lang="css" scoped>
main{
    display: flex;
    height: 100%;
    width: 100%;
}

</style>