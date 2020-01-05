<template>
  <header class="header" v-if="isShow">
    <el-menu :default-active="activeIndex" class="el-menu header" mode="horizontal" @select="handleSelect"
      background-color="#ffffff" text-color="#172991" active-text-color="#172991" :router="true">
      <li class="el-menu-logo el-menu-item"><img src="@A/images/logo.png" ></li>
      <el-menu-item index="1" route="/index">首页</el-menu-item>
      <el-menu-item index="2" route="/about">关于我们</el-menu-item>
      <el-menu-item index="3" route="/activity">最新活动</el-menu-item>
      <el-menu-item index="4" route="/order">员工点餐系统</el-menu-item>
      <el-input  class="header-search" placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="search" v-on:keyup.enter.native="searchClick"></el-input>
      
      <el-menu-item index="5" class="el-menu-login" :route="hasLogin ? '/home' : '/login'"
       >{{hasLogin ? '个人中心' : '登陆'}}</el-menu-item>
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
        this.activeIndex = key; 
      },
      searchClick(){
        this.$router.push({path: '/search'})
      },    },
    data(){
      return{
      }
    },
    computed: {
      activeIndex: {
        get(){
          let name = this.$route.path;
          let _activeObject = {
            "/index": '1',
            "/about": "2",
            "/activity": "3"
          }    
          return _activeObject[name]
        },
        set(){},
      },
      hasLogin(){
        return this.$store.state.hasLogin;
      },
      search: {
        get(){
          return this.$store.state.search;
        },
        set(n){
          this.$store.commit('SET_SEARCH', n);
        }
      },
    }
  }
</script>
<style lang="scss">
  .header{
    position: relative;
    &-search{
      position: absolute !important;
      top: 10px;
      margin-left: 20px;
      width: 200px !important;
    }
  }
</style>