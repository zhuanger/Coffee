<template>
  <div class="login">
    <div class="login-top">
      <div class="login-top-box">
        <img src="" alt="">
        <h3 class="login-top-box-h3">登陆</h3>
      </div>
    </div>
    <div class="login-container">

    </div>
  </div>
</template>
<script>
  export default {
    
  }
</script>
<style lang="scss" scoped>
  .login{
    &-top{
      width: 100%;
      height: 270px;
      background-color: #eee;
      &-box{
        @include mar-center(200px);
        &-h3{
          border-top: 1px solid #f8f8f8;
          text-align: center;
        }
      }
      
    }
  }
</style>