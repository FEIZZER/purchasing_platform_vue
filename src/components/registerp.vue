<!--
 * @Author: feizzer
 * @Date: 2021-11-03 11:06:09
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-11 13:45:18
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
                <el-step title="相关证照"></el-step>
                <el-step title="其他信息"></el-step>
                </el-steps>
            </div>
            <register-form-p @next-step1="next1" v-if="active == 0"></register-form-p>
            <register-form-p1 @next-step2="next2" v-if="active == 1"></register-form-p1>
            <register-form-p2 @next-step3="next3" v-if="active == 2"> </register-form-p2>
            <registerf-form-p3 @next-step4="next4" v-if="active == 3"></registerf-form-p3>
        </div>
        
    </div>
</template>

<script>
import RegisterFormP from './insideComponent/registerFormp.vue'
import RegisterFormP1 from './insideComponent/registerFormp1.vue'
import RegisterFormP2 from './insideComponent/registerFormp2.vue'
import RegisterfFormP3 from './insideComponent/registerFormp3.vue'
export default {
    name: 'PurchasingPlatformVueRegisterp',
    components: {
        RegisterFormP,
        RegisterfFormP3,
        RegisterFormP2,
        RegisterFormP1
    },
    data() {
        return {
            active: 0,
            registerParams:{}
        };
    },

    mounted() {
        
    },
    created() {
        // if (sessionStorage.getItem('register-p-page')) {
        //     Object.assign(this.$data, JSON.parse(sessionStorage.getItem('register-p-page')))
        // }
        // window.addEventListener("beforeunload",()=>{
        //     sessionStorage.setItem("register-p-page",JSON.stringify(this.$data));
        // });
    },
    methods: {
        next1(msg, data) {
            this.active = msg
            this.registerParams.username = data.name
            this.registerParams.password = data.password
            this.registerParams.mobilePhone = data.phonenum
            this.registerParams.email = data.email
        },
        next2(msg, data) {
            this.active = msg
            this.registerParams.companyInfo = data
        },
        next3(msg) {
            this.active = msg
        },
        next4(msg, data) {
            sessionStorage.setItem('registerData', JSON.stringify(this.registerParams))
            this.$http({
                url: '/supplierRegister',
                method: 'post',
                data: this.registerParams
            })
            .then(res => {

                console.log(res)
                let data = res.data
                if (data.success) {
                    setTimeout(function() {
                        this.$router.push('/login')
                    }, 5000)
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })
                }
            })
            .catch(res => {
                console.error(res)
            })
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
