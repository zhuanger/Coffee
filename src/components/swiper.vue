<template>
  <el-carousel :interval="4000" :type="type" :height="height" class="swiper" @click.native="gotoxx" @change="changeIndex">
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
    data(){
      return{
        indexs: 0
      }
    },
    methods: {
      gotoPage(index){
        if(this.$route.path.includes('activity')){
          let name = ['/page', '/pageTwos', '/pageThree', '/pageFour'];
          this.$router.push({path: name[index]});
        }else{
          let name = ['/pageOne', '/pageTwo'];
          this.$router.push({path: name[index]});
        }
        
      },
      gotoxx(){
        this.$emit('click', this.index)
      },
      changeIndex(index){
        this.indexs = index;
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