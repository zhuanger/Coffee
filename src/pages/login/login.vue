<template>
  <div class="login">
    <div class="login-top">
      <div class="login-top-box">
        <img src="@A/images/logo.png" alt="" class="login-top-box-img">
        <h3 class="login-top-box-h3">登录</h3>
      </div>
    </div>
    <div class="login-container">
      <h3>系统登录</h3>
      <div class="login-container-box">
        <el-input placeholder="您的员工账号" v-model="username" clearable class="login-container-input" maxlength="11"></el-input>
        <span for="">{{errUsernameText}}</span>
      </div>
      <div class="login-container-box">
        <el-input placeholder="您的密码" v-model="password" clearable show-password maxlength="13" class="login-container-input"></el-input>          
        <span for="">{{errPasswordText}}</span>
      </div>
      <!-- <a href="#" class="login-container-a">忘记密码</a> -->
      <el-button type="primary" class="login-container-button" @click="login" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data(){
      return{
        username: '',
        password: '',
        errUsernameText: '',
        errPasswordText: '',
        fullscreenLoading: false
      }
    },
    methods: {
      login(){
        let username = this.username.replace(/\s/g, ''), password = this.password.replace(/\s/g, ''), self = this;
        if(username.length === 0){
          this.errUsernameText = '请输入账号';
          setTimeout(() => {
            self.hideErrText('username')
          }, 1500);
          return;
        }else if(password.length === 0){
          this.errPasswordText = '请输入密码';
          setTimeout(() => {
            self.hideErrText('password')
          }, 1500);
          return;
        }
        this.fullscreenLoading = true;//防止多次点击登陆按钮来请求接口数据
        this.$ajax.post('/login', {//请求接口
          username: this.username,
          password: this.password
        }).then((res)=>{//请求成功
          if(res.code === 200){//账号和密码一致返回200
            let userInfo = {
              role_id: res.data.role_id,
              username: self.username,
              password: self.password,
              avatar: decodeURIComponent(window.atob(res.data.avatar)),
              id: res.data.id//数据库索引ID
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo));//存储于浏览器
            self.$store.commit('SET_LOGIN', true);//vue插件store存储全局变量
            setTimeout(() => {
              self.fullscreenLoading = false;
              self.$router.push({name: 'home'});
            }, 2000);
          }else{
            // 提示错误
            if(res.code === 202){
              self.errPasswordText = res.msg;//密码错误
            }else{
              self.errUsernameText = res.msg;//账号错误
            }     
            self.fullscreenLoading = false;
            setTimeout(() => {
              self.hideErrText(res.code === 201 ? 'username':'password');
            }, 1500);//隐藏提示
          }
        }).catch((e)=>{
          // 错误处理
          self.fullscreenLoading = false;

          alert('服务器出现异常');
        })
      },
      hideErrText(type){
        let errType = {
          'username': ()=>{
            this.errUsernameText = ''
          },
          'password': ()=>{
            this.errPasswordText = ''           
          },
        };
        errType[type]();
      }
    },
  }
</script>
<style lang="scss" scoped>
  .login{
    &-top{
      width: 100%;
      height: 270px;
      background-color: $bg-color;
      &-box{
        position: relative;
        top: 230px;
        @include mar-center(200px);
        border-top: 1px solid #f8f8f8;
        &-img{
          position: absolute;
          top: -130px;
          right: 50px;
          width: 100px;
          height: 100px;
        }
        &-h3{
          text-align: center;
          position: relative;
          top: -14px;
          @include mar-center(75px);
          background-color: $bg-color;
        }
      }
      
    }
    &-container{
      @include mar-center(280px);
      margin-top: 100px;
      >h3{
        margin-bottom: 20px;
      }
      &-box{
        padding-bottom: 35px;
        position: relative;
        >span{
          color: red;
          font-size: 14px;
          position: absolute;
          bottom: 15px;
          left: 0px;
        }
      }
      &-input{
        // margin-bottom: 15px;
      }
      &-a{
        color: $a-color;
        position: relative;
        left: 213px;
        top: -26px;
        font-size: 14px;
      }
      &-button{
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>