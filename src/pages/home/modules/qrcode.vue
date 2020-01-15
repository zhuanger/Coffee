<template>
  <section class="qrcode">
    <div class="qrcode-img">
      <img :src="imageUrl" alt="">
    </div>
    <imageAdd @updateAvatar="updateAvatar" title="更新二维码" class="qrcode-btn"></imageAdd>
    <el-button type="primary" class='upload' @click="upload">上传</el-button>
  </section>
</template>
<script>
  import imageAdd from '@C/imageAdd';
  export default {
    data(){
      return{
        isLoading: false,
        imageUrl: '',
        loading: false
      }
    },
    methods: {
      updateAvatar(avatar){
        this.imageUrl = avatar;
      },
      upload(){
        if(isloading){
          return;
        }
        this.$ajax.post('/uploadqrcode', {}).then(()=>{

        })
      }
    },
    components: {
      imageAdd
    }
  }
</script>
<style lang="scss" scoped>
  .qrcode{
    height: 400px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    &-img{
      clear: both;
      border: 1px solid red;
      width: 250px;
      height: 250px;
    }
    &-btn{
      margin-right: 9%;
      margin-top: 5%;
    }
  }
  .upload{
    margin-top: 20.2%;
    margin-left: 130px;
    position: absolute;
    display: inline-block;
    cursor: pointer;
    z-index: 1000;
  }
</style>