<!--
 * @Author: feizzer
 * @Date: 2021-11-23 17:39:55
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-24 18:56:57
 * @Description: 
-->
<template>
    <div style="height: 100%; padding-left: 30px; padding-top: 30px">
        <div style="margin-bottom: 4 0px;">
            当前积分：xxx
        </div>
        <div>
            <p style="margin-bottom: 10px">历史记录</p>
            <el-timeline>
                <el-timeline-item v-for="(ins,index) in inhtegrals" :key="index" :timestamp="ins.time">
                {{ins.descri}}
                </el-timeline-item>
            </el-timeline>  
        </div>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueIntegral',

    data() {
        return {
            inhtegrals: [
                {time: '2012-1-1', descri: '获得积分+15'},
                {time: '2013-3-3', descri: '获得积分+12'},
                
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
