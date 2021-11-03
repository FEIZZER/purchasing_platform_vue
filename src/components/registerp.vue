<!--
 * @Author: feizzer
 * @Date: 2021-11-03 11:06:09
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-03 20:05:56
 * @Description: 
-->
<template>
    <div>
        <el-row class="title-area">

        </el-row>
        <div class="register-area">
            <div style="width: 50%;margin: auto;">
                <el-steps :active="active" finish-status="success">
                <el-step title="用户信息"></el-step>
                <el-step title="公司信息"></el-step>
                <el-step title="其他信息"></el-step>
                </el-steps>
            </div>
            <register-form-p @next-step="next" v-if="active == 0"></register-form-p>
            <register-form-p1 @next-step="next" v-if="active == 1"></register-form-p1>
            <registerf-form-p2 @next-step="next" v-if="active == 2"></registerf-form-p2>
        </div>
        
    </div>
</template>

<script>
import RegisterFormP from './insideComponent/registerFormp.vue'
import RegisterFormP1 from './insideComponent/registerFormp1.vue'
import RegisterfFormP2 from './insideComponent/registerFormp2.vue'
export default {
    name: 'PurchasingPlatformVueRegisterp',
    components: {
        RegisterFormP,
        RegisterfFormP2,
        RegisterFormP1
    },
    data() {
        return {
            active: 0,
        };
    },

    mounted() {
        
    },
    created() {
        if (sessionStorage.getItem('register-p-page')) {
            Object.assign(this.$data, JSON.parse(sessionStorage.getItem('register-p-page')))
        }
        window.addEventListener("beforeunload",()=>{
            console.log('unload')
            sessionStorage.setItem("register-p-page",JSON.stringify(this.$data));
        });
    },
    methods: {
        next(msg) {
            this.active = msg
            console.log(this.active)
        }
    },
};
</script>

<style lang="css" scoped>
.title-area{
    height: 120px;
    width: 100%;
    background-color: aliceblue;
}
.register-area{
    width: 100%;
    margin: auto;
}
</style>
