<template>
  <section class="personal">
    <!-- <el-avatar shape="square" size="large" src="@A/images/avatar.png"></el-avatar> -->
    <div class="personal-avatar">
      <img class="personal-avatar-image" :src="userInfo.avatar" alt="">
    </div>
    <div class="personal-userName">
      <span>用户名：</span>
      <span>{{userInfo.username}}</span>
    </div>
    <div class="personal-userName">
      <span>角色：</span>
      <span>{{Number(userInfo.role_id) === 1 ? '店员' : '老板'}}</span>
    </div>
    <!-- <el-input placeholder="请输入内容" v-model="userName" clearable></el-input> -->
    <el-button type="primary" class="personal-change" @click="dialogFormVisible = true">修改个人资料</el-button>
    <el-button type="primary" class="personal-logout" @click="logout">退出登陆</el-button>
    <el-dialog title="修改个人资料" :visible.sync="dialogFormVisible" class="personal-dialog">
      <el-form :model="form">
        <el-form-item label="头像" class="personal-dialog-avatar">
          <div class="personal-dialog-avatar-right">
            <img class="personal-avatar-image" :src="form.avatar" alt="">
            <imageAdd @updateAvatar="updateAvatar" title="修改头像"></imageAdd>
          </div>
        </el-form-item>
        <el-form-item label="用户名" class="personal-dialog-username">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import imageAdd from '@C/imageAdd';
export default {
  data(){
    return{
      userName: '',
      dialogFormVisible: false,
      form: {
        avatar: '',
        userName: '',
      },
      userInfo:{},
      avatarLoading: false,
      isUpdateAvatar: true,
      btnLoading: false
    }
  },
  methods: {
    updateAvatar(avatar){
      this.form.avatar =  avatar;
    },
    submit(){
      let self = this;
      if(this.btnLoading) return;
      this.btnLoading = true;
      this.$ajax.post('/updateUserInfo', {
        id: this.userInfo.id,
        avatar: this.form.avatar.length === 0 ? encodeURIComponent(this.userInfo.avatar) : encodeURIComponent(this.form.avatar),
        username: this.form.avatar.length === 0 ? this.userInfo.username : this.form.userName
      }).then((res)=>{
        if(res.code === 200){
          self.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          self.btnLoading = false;
          localStorage.removeItem('userInfo');
          self.$router.push({name: 'login'});
        }else{
          self.btnLoading = false;
        }
      }).catch(()=>{
        self.btnLoading = false;
        self.$message({
          showClose: true,
          message: '服务器出错',
          type: 'warm'
        });
      })
    },
    logout(){
      localStorage.removeItem('userInfo');
      this.$router.push({path: 'login'});
    }
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.form.avatar = this.userInfo.avatar;
  },
  components: {
    imageAdd
  }
}
</script>
<style lang="scss" scoped>
  .personal{
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    &-change{
      position: absolute;
      right: 130px;
      top: 10px;
    }
    &-logout{
      position: absolute;
      right: 20px;
      top: 10px;
    }
    &-avatar{
      width: 120px;
      height: 120px;
      &-image{
        height: 120px;
      }
    }
    &-userName{
      margin-top: 20px;
    }
    &-dialog{
      &-avatar{
        &-right{
          width: 120px;
          height: 120px;
          display: flex;
          flex-direction: column;
          .btn{
            margin-top: 10px; 
          }
        }
      }
      &-username{
        margin-top: 70px;
      }
    }
  }
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