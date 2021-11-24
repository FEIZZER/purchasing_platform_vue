<!--
 * @Author: feizzer
 * @Date: 2021-11-23 17:38:43
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-23 18:12:34
 * @Description: 
-->
<template>
    <div>
        <el-container>
            <el-aside>
                <el-menu router default-active="1" class="el-menu-vertical-demo" @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item>
                        <template>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>2</el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueMessages',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>
    .el-aside{
        width: 200px !important;
    }
</style>
