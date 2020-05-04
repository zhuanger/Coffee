<template>
  <header class="header" v-if="isShow">
    <el-menu :default-active="activeIndex" class="el-menu header" mode="horizontal" @select="handleSelect"
      background-color="#ffffff" text-color="#172991" active-text-color="#172991" :router="true">
      <li class="el-menu-logo el-menu-item"><img src="@A/images/logo.png" ></li>
      <el-menu-item index="1" route="/index">首页</el-menu-item>
      <el-menu-item index="2" route="/about">关于我们</el-menu-item>
      <el-menu-item index="3" route="/activity">最新活动</el-menu-item>
      <el-menu-item index="4" route="/order" v-if="hasLogin">点餐</el-menu-item>
      <el-input  class="header-search" placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="search" v-on:keyup.enter.native="searchClick"></el-input>
      
      <el-menu-item index="5" class="el-menu-login" :route="hasLogin ? '/home' : '/login'"
       >{{hasLogin ? `欢迎 ${userInfo.username}` : '登录'}}</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </header>
</template>
<script>
  import { mapMutations} from 'vuex'
  export default {
    name: 'coffee-header',
    props: {
      isShow: {
        default: true
      }
    },
    methods: {
    ...mapMutations(['SET_SEARCHCLICK']),

      handleSelect(key, keyPath){
        this.activeIndex = key; 
      },
      searchClick(){
        console.log('----', this.search);
        this.SET_SEARCHCLICK(this.search)
        this.$router.push({path: '/search', query: {keyword: this.search}})
      },    
    },
    data(){
      return{
        userInfo: {
          username: ''
        }
      }
    },
    mounted(){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {username: ''};
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
          console.log('n', n);
          this.$store.commit('SET_SEARCH', n);
        }
      },
    },
    watch: {
      hasLogin(){
        console.log('-----,login')
        this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {username: ''};
      }
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