<template>
  <div class="order">
    <div class="order-left">
      <ul class="order-left-ul">
        <li v-for="(item, index) of liItem" :key="index" @click="changeTab(index)" :class="['order-left-ul-li', index === clickActive ? 'active':'']">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="order-right">
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>
      <good></good>

    </div>
    <div class="order-ope">
      <button class="order-ope-cart button" @click="drawer = true">
        <i class="num">1</i>
      </button>
      <button class="order-ope-top button"><i class="el-icon-arrow-up"></i></button>
    </div>
    <el-drawer title="已选商品" :visible.sync="drawer" :direction="direction" class="order-drawer">
      <div slot="title" class="order-drawer-top">
        <h4>已选商品</h4>
        <div class="order-drawer-top-right">
          <span>总共：<span class="allPrice"><strong>￥21.4</strong></span></span>
          <el-button type="primary">去结算</el-button>
        </div>
      </div>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
      <cart-good></cart-good>
    </el-drawer>
  </div>
</template>
<script>
  import good from "@C/good";
  import cartGood from "@C/cart-good";
  export default {
    data(){
      return{
        liItem:[{name: '咖啡'},{name: '轻食物'}],
        clickActive: 0,
        drawer: false,
        direction: 'ltr',
        num: 1
      }
    },
    methods: {
      changeTab(index){
        this.clickActive = index;
      },
      handleChange(value) {
        console.log(value);
      }
    },
    components: {
      good,
      cartGood
    }
  }
</script>
<style lang="scss" scoped>
  .order{
    margin-top: 50px;
    padding: 0 70px;
    &-left{
      float: left;
      margin-right: 120px;
      &-ul{
        &-li{
          width: 130px;
          height: 50px;
          background-color: #eeeeee; 
          cursor: pointer;
          line-height: 50px;
          text-align: center;
          &.active{
            background-color: $text-color;
            color: #ffffff;
          }
        }
      }      
    }
    &-right{
      float: left;
      width: 980px;
    }
    &-ope{
      position: fixed;
      right: 50px;
      border: 1px solid #bbb;
      height: 100px;
      width: 55px;
      border-radius: 3px;
      top: 220px;
      box-sizing: content-box;
      .button{
        border: 0;
        display: block;
        height: 48px;
        width: 100%;
        background-color: #ffffff;
        outline: 0;
      }
      &-cart{
        background-image: url("../../assets/images/cart.png");
        background-size: 22px 22px;
        background-repeat: no-repeat;
        background-position:center;
        border-bottom: 1px solid #bbbbbb !important;
        position: relative;
        cursor: pointer;
        .num{  
          color: #ffffff;
          width: 18px;
          height: 18px;
          background-color: $text-color;
          display: block;
          border-radius: 30%;
          line-height: 18px;
          position: relative;
          left: 30px;
          bottom: 11px;
        }
      }
      &-top{
        i{
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
    &-drawer{
      /deep/ .el-drawer__body{
        overflow-y: scroll;
      };
      &-top{
        display: flex;
        justify-content: space-between;
        &-right{
          margin-right: 20px;
          .allPrice{
            margin-right: 20px;
            color: red;
            font-size: 20px;
          }
        }
      }
    }
    
  }
  
</style>