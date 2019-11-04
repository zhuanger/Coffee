<template>
  <div class="activity">
    <swiper :imageItem="imageItem"></swiper>
  </div>
</template>
<script>
  import swiper from '@C/swiper'
  export default {
    data(){
      return{
        imageItem: [require('../../assets/images/news_activity01.png')]
      }
    },
    components: {
      swiper
    }
  }
</script>
<style lang="scss">

</style>