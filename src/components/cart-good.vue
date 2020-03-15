<template>
  <section class="cartGood">
    <h4 class="cartGood-title">{{item.product}}</h4>
    <div class="cartGood-right">
      <span class="cartGood-price">￥{{item.price * num}}</span>
      <el-input-number v-model="num"  :min="1" :max="100" label="描述文字" size="small" :disabled="disabled"></el-input-number>
      <i class="el-icon-close cartGood-close" @click="deleteGood"></i>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    item: {},
    buyNum: {
      default: 1
    }
  },
  data(){
    return{
      num: 1,
      disabled: false
    }
  },
  methods: {
    deleteGood(){
      this.$emit('deleteItem');
    }
  },
  mounted(){
    this.num = this.buyNum;
  },
  watch: {
    num(n, o){
      this.$emit('changeNum', n, o);
    },
    buyNum(n, o){
      this.num = n;
    },
  }
}
</script>
<style lang="scss" scoped>
  .cartGood{
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
    padding: 5px 0;
    &-title{
      flex: 1;
      @include ellipse(2);
    }
    &-right{
      flex: 1;
    }
    &-price{
      color: red;
      margin: 0 20px;
    };
    &-close{
      cursor: pointer;
      margin-left: 5px;
    }
  }
  /deep/ .el-input-number--small{
    width: 100px;
  }
</style>