<!--
 * @Author: feizzer
 * @Date: 2021-11-23 17:38:43
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-26 21:29:17
 * @Description: 
-->
<template>
    <div style="height:100%">
        <el-container style="height: 100%">
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
                <div>
                    <div class="content_box">
                        <div style="display: flex; font-size: 12px">
                            <div>name  </div>
                            <div>2021-11-11 12:10</div>
                        </div>
                        <div style="font-size: 24px">
                            hahahahahahahah
                        </div>
                    </div>
                    <el-divider class="content_divider" content-position="center">2021-11-11</el-divider>
                </div>

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
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        height: 100%;
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
    .el-main{
        padding: 20px;
    }
    .content_box{
        width: 70%;
        
    }
    .content_divider{
        margin-top: 20px;
    }
</style>
