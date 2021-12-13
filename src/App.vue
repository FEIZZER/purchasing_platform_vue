<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {addAsyncRoutes} from '@/router/index.js'
export default {
  name: 'App',
  components:{
    addAsyncRoutes
  },

  created() {
    addAsyncRoutes()
  }
}

</script>

<style>
 #app{
   height: 100%;
 }
</style>
