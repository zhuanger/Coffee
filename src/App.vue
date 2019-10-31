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
        isIndex: this.$route.path !== '/index' && this.$route.path !== '/login',
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    
    components: {
      cofferHeader
    },
    watch: {
      '$route'(n,o){
        // 当首页和登陆页面时候不显示App.vue页面这个header组件
        this.isIndex = (n.path !== '/index' && n.path !== '/login');
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
  ul,li{
    list-style:none;
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
