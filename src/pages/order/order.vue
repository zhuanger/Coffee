<template>
  <div class="order">
    <div class="order-left">
      <ul class="order-left-ul">
        <li v-for="(item, index) of liItem" :key="index" class="order-left-ul-li">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="order-right">
      <!-- <div class="order-right-contanier"> -->
        <!-- <div class="order-right-contanier-box"> -->
          <div class="card">
            <img src="@A/images/testImage.jpg" alt="" class="card-img">
            <div class="card-text">
              <span class="money">￥41.5元</span>

              <p class="card-text-title">面吧</p>
              <div class="card-text-content">
                <!-- <span class="money">￥41.5元</span> -->
                <span class="stock">库存：999</span>
                <i class="cart"></i>
              </div>
            </div>
          </div>
        <!-- </div> -->
      <!-- </div> -->
      <div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        liItem:[{name: '咖啡'},{name: '轻食物'}]
      }
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
        }
      }      
    }
    &-right{
      float: left;
      width: 950px;
      border: 1px solid red;
      height: 600px;
      overflow-y: hidden;
      &-contanier{
        width: 100%;
        height: 500px;
        border: 1px solid red;
        overflow-y: hidden;
        // &-box{
        //   height: 100%;
        //   width: 100%;
        // }
      }
    }
    .card{
      &-img{
        width: 100%;
        height: 70%;
      }
      &-text{
        padding: 5px 7px;
        .money{
          color: $text-color;
          font-size: 18px;
        }
        &-title{
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          margin-top: 5px;
        }
        &-content{
          .cart{
            background-image:url("../../assets/images/cart.png");
            background-size: 20px 20px;
            height: 20px;
            width: 20px;
            display: inline-block;
            float: right;
            margin: 7px 9px 0 0;
          }
          .stock{
            color: $grey-text-color;
            font-size: 12px;
            float: left;
            margin: 7px 0px 0 0px;

          }
        }
      }
      height: 310px;
      width: 220px;
      border: 1px solid gray;
    }
  }
</style>