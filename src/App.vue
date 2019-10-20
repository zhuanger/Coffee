<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect" 
      background-color="#845C39" text-color="#fff" active-text-color="#fff">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">员工点餐系统</el-menu-item>
      <el-menu-item index="3" class="el-menu-login">登陆</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
</style>
