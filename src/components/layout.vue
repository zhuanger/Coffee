<template>
  <div class="layout">
    <div class="layout-top">
      <h2 class="layout-top-title">{{title}}</h2>
      <a class="layout-top-a" href="#">查看更多
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-right-line"></use>
        </svg>
      </a>
    </div>
    <el-row :gutter="20" >
      <el-col :span="6" @mouseover.native="addAndRemoveAvtive(index, 1)" @mouseleave.native="addAndRemoveAvtive(index, 2)" 
        :class=" isActiveItem[index] ? 'el-col-active' :''" v-for="(item,index) in imagesItem" :key="index">
        <div :class="['grid-content bg-purple', isActiveItem[index] ? 'bg-purple-active' :'']">
          <img :src="item" alt="" class="el-col-img">
          <span class="el-col-name">咖啡豆</span>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>
<script>
  export default {
    props: {
      title:{
        default: ''
      },
      imagesItem: {}
    },
    data(){
      return{
        isActiveItem: [false, false, false, false]
      }
    },
    methods:{
      addAndRemoveAvtive(index, type){
        this.$set(this.isActiveItem, index , type === 1 ? true : false)
      },
    },
    mounted(){
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
        font-size: 14px;
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
    position: relative;
    bottom: 0px;
    border-radius: 4px;
    &-active{
      bottom: 5px;
      transition: bottom .15s;
    }
    &-img{
      border-radius: 3px;
      width: 100%;
      min-height: 150px
    }
    &-name{
      padding-left: 20px;
      margin-top:10px;
    }
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #ffffff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.12);
    &-active{
      box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.12);
      transition: box-shadow .15s
    }
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