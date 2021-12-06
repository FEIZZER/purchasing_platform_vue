<!--
 * @Author: feizzer
 * @Date: 2021-11-23 16:12:05
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-06 15:46:23
 * @Description: 
-->
<template>
    <div style="height:100%;display: flex; flex-direction: column;">
        <div class="title-area">
            <div class="title-img">
                <img src="../../../assets/logo.png" alt="">
            </div>
            <el-descriptions class="margin-top" title="供应商主页" :column="3" :size="size" >
                <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="地址">苏州市</el-descriptions-item>
                <el-descriptions-item label="备注">
                     <el-tag size="small">优秀工厂</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="body-area">
            <el-menu router default-active="1" mode="horizontal" @select="handleSelect" 
                @open="handleOpen" @close="handleClose">
                <el-menu-item index="1" route="/home/accountinfo/messages">消息中心</el-menu-item>
                <el-menu-item index="2" route="/home/accountinfo/integral">我的积分</el-menu-item>
                <el-menu-item index="3" route="/home/accountinfo/history">竞标历史</el-menu-item>
                <el-menu-item index="4" route="/home/accountinfo/productauthorized">我的资格</el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueProaccountinfo',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        handleOpen(){},
        handleClose(){}
    },
};
</script>

<style lang="css" scoped>
    .title-area{
        padding-top: 30px;
        padding-left: 80px;
        
        height: 15%;
        display: flex;
        flex-direction: row;
    }
    .body-area{
        padding: 20px;
        padding-top: 0px;
        /* border: 1px black solid; */
        height: 80%;
    }

    .title-img > img{
        border-radius: 50%;
        height: 50%;
        border: 0.3px solid #001111;
    }
    .title-img{
        margin-right: 30px;
    }
</style>
