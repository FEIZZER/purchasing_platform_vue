<!--
 * @Author: feizzer
 * @Date: 2021-11-23 17:40:54
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-23 18:27:53
 * @Description: 
-->
<template>
    <div style="padding: 30px">
        <el-tag v-for="tag in tags" :key="tag.name" closable size="medium" @close="doClose(tag)">
             {{tag.name}}
        </el-tag>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueProductauthorized',

    data() {
        return {
            tags: [
                {name: '鸡蛋'},{name: '香蕉'},{name: '鸡蛋'},{name: '鸡蛋'},{name: '鸡蛋'},{name: '鸡蛋'},
            ]
        };
    },

    mounted() {
        
    },

    methods: {
        doClose(tag) {
            this.$confirm(`确定要放弃${tag.name}商品的竞价资格？`, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then( () => {
                this.$message({
                    
                })
            })
        }
    },
};
</script>

<style lang="css" scoped>
.el-tag{
    margin: 10px 20px;
}
</style>
