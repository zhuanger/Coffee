<template>
  <div class="index">
    <swiper class="index-swiper" :imageItem="imageItem"></swiper>
    <layout class="index-layout" title="热销商品"></layout>
    <layout class="index-layout" title="最新商品"></layout>
    <footer class="index-footer">
      <div class="index-footer-our"><a href="#">关于我们</a><el-divider direction="vertical"></el-divider><a href="#">联系我们</a></div>
      <span class="index-footer-copyright">Copyright @2019 Me </span>
    </footer>
  </div>
</template>

<script>
  import swiper from '@C/swiper'
  import layout from '@C/layout'
  export default {
    components: {
      swiper,
      layout
    },
    data(){
      return{
        imageItem: [require('../../assets/images/testImage.jpg'),require('../../assets/images/testImage.jpg'),require('../../assets/images/testImage.jpg')]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .index{
    //这里要做自适应
    padding: 0 40px 0 40px;
    &-swiper{
      margin-top: 40px;
    }
    &-layout{
      margin-top: 50px;
    }
    &-footer{
      margin-bottom: 20px;
      text-align: center;
      &-our{
        margin-bottom: 10px;
        >a{
          color: #aaaaaa;
        }
      }
      &-copyright{
      }
    }
  }
</style>