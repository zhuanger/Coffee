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
      <span>{{Number(userInfo.roleId) === 1 ? '店员' : '老板'}}</span>
    </div>
    <!-- <el-input placeholder="请输入内容" v-model="userName" clearable></el-input> -->
    <el-button type="primary" class="personal-change" @click="dialogFormVisible = true">修改个人资料</el-button>
    <el-dialog title="修改个人资料" :visible.sync="dialogFormVisible" class="personal-dialog">
      <el-form :model="form">
        <el-form-item label="头像" class="personal-dialog-avatar">
          <div class="personal-dialog-avatar-right">
            <img class="personal-avatar-image" src="@A/images/avatar.png" alt="">
            <el-button type="primary" class="btn" >修改头像</el-button>
          </div>
        </el-form-item>
        <el-form-item label="用户名" class="personal-dialog-username">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data(){
    return{
      userName: '',
      dialogFormVisible: false,
      form: {
        avatar: '',
        userName: '',
      },
      userInfo:{}
    }
  },
  methods: {
    
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
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
</style>