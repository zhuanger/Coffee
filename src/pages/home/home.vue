<template>
  <div class="home">
    <el-container>
      <el-aside width="180px">
        <ul>
          <li v-for="(item, index) of liItem" :key="index" :class="['home-ul-li',activeIndex === index ? 'active': '']" @click="activeIndex = index"
            >
            {{item.name}}
          </li>
        </ul>
      </el-aside>
      <el-main class="home-main">
        <personal v-if="activeIndex === 0" :userInfo="userInfo"></personal>
        <my-order v-else-if="activeIndex === 1"></my-order>
        <manage-member v-else-if="activeIndex === 2 && Number(userInfo.role_id) === 2"></manage-member>
        <manage-goods v-else-if="activeIndex === 3 && Number(userInfo.role_id) === 2"></manage-goods>
        <qrcode v-else-if="activeIndex === 4 && Number(userInfo.role_id) === 2"></qrcode>
      </el-main>
    </el-container>
  </div>
</template>
<script> 
  import personal from "./modules/personal";
  import myOrder from "./modules/my-order";
  import manageMember from "./modules/manage-member";
  import manageGoods from "./modules/manage-goods";
  import qrcode from "./modules/qrcode";
  export default {
    name: 'home',
    data(){
      return{
        liItem:[{name: '个人资料', isActive: true}, {name: '我的订单', isActive: false}, 
                {name: '管理成员' ,isActive: false},{name: '管理商品', isActive: false},
                {name: '收款二维码', isActive: false}],
        activeIndex: 0,
        userInfo: {},
      }
    },
    components: {
      personal,
      myOrder,
      manageMember,
      manageGoods,
      qrcode
    },
    created(){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(Number(this.userInfo.role_id) !== 2){
        this.liItem = [{name: '个人中心', isActive: true}, {name: '我的订单', isActive: false}]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-aside{
    // border: 1px solid red;
  }
  .home{
    padding: 40px 60px;
    &-ul{
      &-li{
        text-align: center;
        padding: 15px 0;
        border: 1px solid #eeeeee;
        cursor: pointer;
        &.active{
          background-color: $bg-color;
        }
      }
    }
    &-main{
      border: 1px solid #eeeeee;
      margin-left: 5px;
    }
  }
</style>