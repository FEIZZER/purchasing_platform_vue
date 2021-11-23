<!--
 * @Author: feizzer
 * @Date: 2021-11-23 16:12:05
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-23 17:35:10
 * @Description: 
-->
<template>
    <div style="height:100%;display: flex; flex-direction: column;">
        <div class="title-area">
            <div class="title-img">
                <img src="../../../assets/logo.png" alt="">
            </div>
            <div class="title-info">
                <div style="margin: 9px;font-size:20px">湖北快乐水生产商</div>
                <div style="margin: 9px;margin-top: 4px; font-size: 15px; ">注册日期 2019-1-1</div>
            </div>
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
        width: 100%;
        border: 1px black solid;
        height: 15%;
        display: flex;
        flex-direction: row;
    }
    .body-area{
        padding: 20px;
        padding-top: 0px;
        width: 100%;
        border: 1px black solid;
        height: 80%;
    }

    .title-img > img{
        border-radius: 50%;
        height: 50%;
        border: 0.3px solid #001111;
    }
</style>
