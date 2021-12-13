<!--
 * @Author: feizzer
 * @Date: 2021-12-13 15:22:33
 * @LastEditors: feizzer
 * @LastEditTime: 2021-12-13 15:40:10
 * @Description: 
-->
<template>
    <div class="a0">
        <div class="a1">
            您的账号正在审核中
        </div>
        <div class="a2">
            将在 {{time}} 秒后跳转至
            <a href="/#/login">登录页</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PurchasingPlatformVueWait',

    data() {
        return {
            time: 5,
        };
    },

    mounted() {
        
    },
    created() {
        this.do()
    },
    methods: {
        do () {
            this.time = 5
            setInterval(() => {
                this.time = this.time - 1
                if (this.time <= 0) {
                    this.$router.push({
                        path: '/login'
                    })
                }
            }, 1000);
        }
    },
};
</script>

<style lang="css" scoped>
.a0{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
}
.a1{
    font-size: 30px;
    margin: 10px;
}
.a2{
    font-size: 15px;
}
</style>
