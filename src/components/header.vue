<template>
  <header class="header" v-if="isShow">
    <el-menu :default-active="activeIndex" class="el-menu header" mode="horizontal" @select="handleSelect"
      background-color="#ffffff" text-color="#172991" active-text-color="#172991" :router="true">
      <li class="el-menu-logo el-menu-item"><img src="@A/images/logo.png" ></li>
      <el-menu-item index="1" route="/index">首页</el-menu-item>
      <el-menu-item index="2" route="/about">关于我们</el-menu-item>
      <el-menu-item index="3">最新活动</el-menu-item>
      <el-menu-item index="4">员工点餐系统</el-menu-item>
      <el-menu-item index="5" class="el-menu-login">登陆</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </header>
</template>
<script>
  export default {
    name: 'coffee-header',
    props: {
      isShow: {
        default: true
      }
    },
    methods: {
      handleSelect(key, keyPath){
        console.log(key)
        // key, keyPath
        this.activeIndex = key; 
      }
    },
    data(){
      return{
        // activeIndex: '1',
      }
    },
    computed: {
      activeIndex: {
        get(){
          let name = this.$route.path, _activeIndex = '1'        
          if(name === '/about'){
            _activeIndex = '2'
          }
          return _activeIndex
        },
        set(){},
      }
    }
  }
</script>
<style lang="scss">

</style>