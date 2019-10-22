<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect" 
      background-color="#ffffff" text-color="#172991" active-text-color="#172991">
      <li class="el-menu-logo el-menu-item"><img src="./assets/images/logo.png" ></li>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">关于我们</el-menu-item>
      <el-menu-item index="3">最新活动</el-menu-item>
      <el-menu-item index="4">员工点餐系统</el-menu-item>
      <el-menu-item index="5" class="el-menu-login">登陆</el-menu-item>
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
