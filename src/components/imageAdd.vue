<template>
  <div class="dialog-avatar-btnBox">
    <el-button class="dialog-avatar-btnBox-btn" :loading="avatarLoading">{{title}}</el-button>
    <input type="file" class="dialog-avatar-btnBox-input" @change="updateAvatar($event)">
  </div>
</template>
<script>
  export default {
    props: {
      title: {}
    },
    data(){
      return{
        avatarLoading: false,
      }
    },
    methods: {
      updateAvatar(e){
        if(this.avatarLoading) return;
        let reader = new FileReader(), self = this, file = e.target.files[0];
        this.avatarLoading = true;
        if(file.size > (1024 * 12)){
          this.$message({
            showClose: true,
            message: '图片不能超过12kb，无法上传',
            type: 'warning'
          });
          return
        }
        reader.readAsDataURL(file); 
        reader.onloadend = function(){
          self.$emit('updateAvatar', reader.result)
          self.avatarLoading = false;
        },
        reader.onerror = function(){
          this.avatarLoading = false;
          this.$message({
            showClose: true,
            message: '上传头像失败，请重试',
            type: 'error'
          });
        }
      },
    },
    mounted(){
      console.log(this.title);
    }
  }
</script>
<style lang="scss" scoped>
  .dialog-avatar-btnBox{
    margin-top: 10px;
    position: relative;
    &-btn{
      position: absolute;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #FFF;
      border: 1px solid #DCDFE6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      font-size: 14px;
      border-radius: 4px;
      background-color: #409EFF;
      border-color: #409EFF;
      padding: 12px 20px;
      color: #ffffff;
      z-index: 3;
    }
    &-input{
      position: absolute;
      padding: 8px 0px;
      opacity: 0;
      z-index: 5;
    }
  }
</style>