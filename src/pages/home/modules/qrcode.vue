<template>
  <section class="qrcode">
    <div class="qrcode-img">
      <img :src="imageUrl" alt="" >
    </div>
    <imageAdd @updateAvatar="updateAvatar" title="更新二维码" class="qrcode-btn" @uploadAvatar="upload" 
    :needChangeText="true" ref="imageAdd"></imageAdd>
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
        if(this.isloading){
          return;
        }
        let self = this;
        this.$ajax.post('/updateQrcode', {id: 1, image: encodeURIComponent(this.imageUrl)}).then((res)=>{
          if(res.code === 200){
            self.$message({
              type: 'success',
              message: '更新成功!'
            });
            self.$refs.imageAdd.upStatus();
          }
        })
      },
      getCode(){
        let self = this;
        this.$ajax.post('/getQrCode').then((res)=>{
          if(res.code === 200){
            self.imageUrl = decodeURIComponent(window.atob(res.data[0].image));
          }
        })
      }
    },
    mounted(){
      this.getCode();
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
      width: 250px;
      height: 250px;
      >img{
        width: 100%;
        height: 100%;
      }
    }
    &-btn{
      margin-right: 9%;
      margin-top: 5%;
    }
  }
  .upload{
    margin-top: 22%;
    margin-left: 130px;
    position: absolute;
    display: inline-block;
    cursor: pointer;
    z-index: 1000;
  }
</style>