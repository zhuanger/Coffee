<template>
  <div id="app">
    <cofferHeader :isShow="isIndex"></cofferHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import cofferHeader from '@C/header'
  export default {
    name: 'app',
    data() {
      return {
        isIndex: this.$route.path !== '/index',
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    
    components: {
      cofferHeader
    },
    watch: {
      '$route'(n,o){
        this.isIndex = n.path !== '/index'
      }
    }
  }
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a{
    text-decoration:none;
  }
  .el-menu-login{
    float: right !important;
  }
  .el-menu-logo{
    float: left;
    padding: 0 80px 0 50px !important;
    >img{
      width: 50px;
      height: 50px;
      border-radius: 50%      
    }
  }
</style>
