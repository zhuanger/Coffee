<template>
  <div class="home">
    <el-container>
      <el-aside width="180px">
        <ul>
          <li v-for="(item, index) of liItem" :key="index" class="home-ul-li">
            {{item.name}}
          </li>
        </ul>
      </el-aside>
      <el-main class="home-main">

      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data(){
      return{
        liItem:[{name: '个人中心', isActive: true}, {name: '我的订单', isActive: false}, 
                {name: '管理成员' ,isActive: false},{name: '管理商品', isActive: false}]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-aside{
    border: 1px solid red;
  }
  .home{
    padding: 40px 60px;
    &-ul{
      &-li{
        text-align: center;
        padding: 15px 0;
        border: 1px solid #eeeeee;
        cursor: pointer;
      }
    }
    &-main{
      border: 1px solid red;
    }
  }
</style>