<template>
  <el-carousel :interval="4000" :type="type" :height="height" class="swiper">
    <el-carousel-item v-for="(item,index) in imageItem" :key="index">
      <img :src="item" alt="" class="swiper-img" @click="gotoPage(index)">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  export default {
    props: {
      imageItem: {},
      type: {
        default: ''
      },
      height:{
        default: window.innerHeight + 'px'
      }
    },
    methods: {
      gotoPage(index){
        let name = ['/pageOne', '/pageTwo'];
        this.$router.push({path: name[index]});
      }
    }
  }
</script>
<style lang="scss">
  .el-carousel__item h3 {
    color: #F7F7F7;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    cursor: pointer;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #F7F7F7;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #F7F7F7;
  }
  .swiper{
    &-img{
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
</style>