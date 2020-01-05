<template>
  <div class="order">
    <div class="order-left">
      <ul class="order-left-ul">
        <li v-for="(item, index) of liItem" :key="index" @click="changeTab(index)" :class="['order-left-ul-li', index === clickActive ? 'active':'']">
          {{item.type}}
        </li>
      </ul>
    </div>
    <div class="order-right">
      <good v-for="(item, index) of goodsItem" :key="index" :item="item"></good>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" class="order-pagination"
        @prev-click="changePage" @next-click="changePage" @current-change="getData"></el-pagination>
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
      
    </el-drawer>

  </div>
</template>
<script>
  import good from "@C/good";
  import cartGood from "@C/cart-good";
  export default {
    data(){
      return{
        liItem:[],
        clickActive: 0,
        drawer: false,
        direction: 'ltr',
        num: 1,
        orderType: 1,
        total: 0,
        goodsItem: []
      }
    },
    methods: {
      changeTab(index){
        this.clickActive = index;
      },
      handleChange(value) {
        console.log(value);
      },
      getType(){
        this.$ajax.get('/goodtypes').then((res)=>{
          console.log(res);
          this.liItem = res.data;
        })
      },
      getData(page = 1){
        let self = this;
        this.$ajax.post('/goodtypesinfo', {good_types_id: this.clickActive+1, page: page}).then((res)=>{
          if(res.code === 200){
            self.goodsItem = res.data.pageinfo;
          }
        })
      },
      changePage(page){
        this.getData(page)
      }
    },
    created(){
      this.getType();
      this.getData()
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
          border-bottom: 1px solid #ddd;
          &.active{
            background-color: $text-color;
            color: #ffffff;
          }
          &:last-child{
            border-bottom: 0px;
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
    &-pagination{
      float: left;
    }
  }
  
</style>