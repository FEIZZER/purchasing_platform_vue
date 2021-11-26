<!--
 * @Author: feizzer
 * @Date: 2021-11-23 17:38:43
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-26 16:53:50
 * @Description: 
-->
<template>
    <div>
        <el-container>
            <el-aside>
                <div class="msg_box" v-for="msg in message" :key="msg.from">
                    <div style="display: flex;">
                        <div style="width: 70%">
                            <div class="from_name">{{msg.from}}</div>
                            <div class="preview">{{msg.content}}</div>
                        </div>
                        <div style="width:30%; font-size:9px; font-family: Hiragino Sans GB">
                            {{msg.time}}
                        </div>
                    </div>
                    <el-divider></el-divider>
                </div>
            </el-aside>
            <el-main>
                
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueMessages',

    data() {
        return {
            message: [
                {from: 'fei', content: 'jdwijdaidjiejdwoijvciew', time: '2021-11-1'},
                {from: 'fei2', content: 'hshdosdjiasjjcadhioajc cajciJCJECJDSCHNADUHCCAOCJ', time: '2020-11-12'},
                {from: 'fei3', content: 'hohohhohohoohohoho', time: '2021-9-1'},
            ],
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>
    .el-divider{
        margin: 5px 0px 0px 0px;
    }
    .el-aside{
        width: 300px !important;
    }
    .msg_box{
        cursor: pointer;
        padding: 7px;

    }
    .from_name{
        font-size: 16px;
    }
    .preview{
        margin-top: 5px;
        font-size: 12px;
    }
</style>
