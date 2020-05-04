<template>
  <div class="good">
    <img :src="item.image" alt="" class="good-img">
    <div class="good-text">
      <span class="money">￥{{item.price}}元</span>
      <p class="good-text-title">{{item.product}}</p>
      <p style="margin-top: 5px" class="ellipsis">成分：{{item.component}}</p>
      <div class="good-text-content">
        <span class="stock">库存：{{item.stock}}</span>
        <i class="cart" @click="addGood"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {}
  },
  data(){
    return{

    }
  },
  methods: {
    addGood(){
      this.$emit('addGood', this.item);
    }
  },
}
</script>
<style lang="scss" scoped>
  .good{
    float: left;
    height: 400px;
    width: 255px;
    border: 1px solid gray;
    box-shadow: 0 0px 0px 0x rgba(0, 0, 0, 0.12);
    margin: 0 20px 20px 0;
    &:hover{
      border: 1px solid $text-color;
      box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.12);
      transition: box-shadow .15s
    }
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
          background-image:url("../assets/images/cart.png");
          background-size: 20px 20px;
          height: 20px;
          width: 20px;
          display: inline-block;
          float: right;
          margin: 7px 9px 0 0;
          cursor: pointer;
        }
        .stock{
          color: $grey-text-color;
          font-size: 12px;
          float: left;
          margin: 7px 0px 0 0px;

        }
      }
    }
  }
  .ellipsis{
    display: -webkit-box; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    word-wrap: break-word; 
    word-break: break-all; 
    white-space: normal !important; 
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 1; 
    color: #aaaaaa;
    font-size: 12px;
  }
</style>