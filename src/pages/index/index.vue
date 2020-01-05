<template>
  <div class="index index-container" >
    <div class="index-banner-container">
      <el-carousel :height="windowHeight" direction="vertical" :autoplay="false" class="banner" ref="carousel" indicator-position="none" :loop="false">
        <el-carousel-item>
          <indexHeader :isShow='true'></indexHeader>
          <swiper class="index-swiper" :imageItem="imageItem" :height="swiperHeight "></swiper>
        </el-carousel-item>
        <el-carousel-item>
          <!-- <swiper class="index-swiper" :imageItem="imageItem"></swiper> -->
          <layout class="index-layout" title="热销商品" :imagesItem="hotItem" type="hot"></layout>
        </el-carousel-item>
        <el-carousel-item>
          <!-- <swiper class="index-swiper" :imageItem="imageItem"></swiper> -->
          <layout class="index-layout" title="最新商品" :imagesItem="newItem" type="new"></layout>
          <footer class="index-footer">
            <div class="index-footer-our"><a href="#">关于我们</a><el-divider direction="vertical"></el-divider><a href="#">联系我们</a></div>
            <span class="index-footer-copyright">Copyright @2019 Me All Rights Reserved</span>
          </footer> 
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import swiper from '@C/swiper'
  import layout from '@C/layout'
  import indexHeader from '@C/header'

  export default {
    components: {
      swiper,
      layout,
      indexHeader
    },
    data(){
      return{
        isMouseWheel: false,
        windowHeight: window.innerHeight + 'px', //整个页面的高度
        swiperHeight: '', // 第一个banner的高度
        hotItem: [],
        newItem: [],
        imageItem: [require('../../assets/images/testImage-1.jpg'),require('../../assets/images/testImage-2.jpg'),require('../../assets/images/testImage-1.jpg')],
        layoutItem: [require('../../assets/images/testImage.jpg'),require('../../assets/images/testImage.jpg'),require('../../assets/images/testImage.jpg')]
      }
    },
    methods: {
      //mousewheel兼容
      addmousewheel(){
        let delta, type = document.mozFullScreen === undefined ? 'mousewheel' : 'DOMMouseScroll', self = this;       
        // 没兼容ie todo
        document.querySelector('.index-banner-container').addEventListener(type, (event)=>{
          if(self.isMouseWheel){
            return
          }
          self.isMouseWheel = true
          delta = event.wheelDelta ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
          self.mousewheeFn(delta);
        }, false);
      },
      mousewheeFn(delta){
        // -1：banner向上  1：banner向下
        delta === -1 ? this.$refs.carousel.next() : this.$refs.carousel.prev();
        if(this.$refs.carousel.activeIndex === 1){
          this.getGoods(0);
        }else if(this.$refs.carousel.activeIndex === 2){
          this.getGoods(1);
        }
        setTimeout(() => {
          this.isMouseWheel = false
        }, 650);
      },
      getGoods(type){
        if(this.hotItem.length === 6 && type !== 1) return;
        if(this.newItem.length === 6 && type !== 0) return;
        let self = this, url = '';
        if(type === 0){
          url = '/hotgoods';
        }else if(type === 1){
          url = '/newgoods';
        }
        this.$ajax.post(url).then((res)=>{
          if(res.code === 200){
            if(type === 0){
              self.hotItem = res.data.result;
            }else if(type === 1){
              self.newItem = res.data.result;
            }         
          }
        })
      }
    },
    mounted(){
      this.addmousewheel();
      this.$nextTick(()=>{
        this.swiperHeight = window.innerHeight - document.querySelector('.header').offsetHeight + 'px'        
      })
    },
  }
</script>

<style lang="scss" scoped>
  .index{
    //这里要做自适应
    // padding: 0 40px 0 40px;
    &-swiper{
      // margin-top: 40px;
    }
    &-layout{
      margin-top: 50px;
    }
    &-footer{
      margin-bottom: 20px;
      text-align: center;
      font-size: 15px;
      &-our{
        margin-bottom: 10px;
        >a{
          color: #aaaaaa;
        }
      }
      &-copyright{
        font-size: 13px;
      }
    }
  }
</style>