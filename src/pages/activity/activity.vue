<template>
  <div class="activity">
    <swiper :imageItem="imageItem" @click="gotoPage()"></swiper>
  </div>
</template>
<script>
  import swiper from '@C/swiper'
  export default {
    data(){
      return{
        imageItem: [require('../../assets/images/news_activity01.png'), 
          require('../../assets/images/news_activity01.png'), require('../../assets/images/news_activity01.png')
          ,  require('../../assets/images/news_activity01.png')]
      }
    },
    components: {
      swiper
    },
    methods: {
      gotoPage(index){
        console.log(index)
        this.$router.push({path: '/page'})
      }
    }
  }
</script>
<style lang="scss">

</style>