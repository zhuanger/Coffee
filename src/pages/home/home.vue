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
      <el-main></el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data(){
      return{
        liItem:[{name: '个人中心'}, {name: '我的订单'}, {name: '管理成员'},{name: '管理商品'}]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-aside{
    border: 1px solid red;
  }
  .home{
    &-ul{
      &-li{
        text-align: center;
        padding: 15px 0;
        border: 1px solid #eeeeee;
      }
    }
  }
</style>