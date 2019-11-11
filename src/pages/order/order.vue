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
      <div class="order-right-contanier">
        <div class="order-right-contanier-box">
          <div class="card">
            <img src="" alt="">
            <div class="card-text">

            </div>
          </div>
        </div>
      </div>
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
      &-contanier{
        width: 100%;
        height: 500px;
        border: 1px solid red;
        overflow-y: hidden;
        &-box{
          height: 100%;
          width: 100%;
        }
      }
    }
    .card{
      height: 220px;
      width: 170px;
      border: 1px solid gray;
    }
  }
</style>