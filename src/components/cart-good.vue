<template>
  <section class="cartGood">
    <h4 class="cartGood-title">烟笋拉润反</h4>
    <div class="cartGood-right">
      <span class="cartGood-price">￥29.2</span>
      <el-input-number v-model="num"  :min="1" :max="10" label="描述文字" size="small"></el-input-number>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    num: {
      default: 1
    }
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
  }
  /deep/ .el-input-number--small{
    width: 100px;
  }
</style>