<template>
  <div class="layout">
    <div class="layout-top">
      <h2 class="layout-top-title">{{title}}</h2>
      <a class="layout-top-a" href="#">查看更多>></a>
    </div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>
<script>
  export default {
    props: {
      title:{
        default: ''
      }
    }
  }
</script>
<style lang="scss">
  .layout{
    margin-bottom: 70px;
    &-top{
      margin-bottom: 30px;      
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-title{
        height: 30px;
        position: relative;
        padding-left: 20px;
        // float: left;
        &::before{
          content: '';
          position: absolute;
          width: 10px;
          height: 30px;
          background-color: #000;
          left: 0;
        }
      }
      &-a{
        color: #aaaaaa;
      }
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 230px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>