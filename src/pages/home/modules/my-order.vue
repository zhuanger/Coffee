<template>
  <section class="myOrder">
    <!-- 时间 商品名字数量 价格 状态 图片 -->
    <div class="">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="name" label="图片" width="140"></el-table-column>
        <el-table-column prop="address" label="状态" width="80"></el-table-column>
        <el-table-column prop="address" label="商品名字"></el-table-column>
        <el-table-column prop="address" label="总价格" width="100"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total" class="myOrder-pagination"></el-pagination>
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return{
      tableData: [],
      total: 0,
      userInfo: {}
    }
  },
  methods: {
    getData(){
      let self = this; 
      this.$ajax.post('/userorders', {
        id: this.userInfo.id
      }).then((res)=>{
        console.log('res', res);
        if(res.code === 200){
          self.tableData = res.data.result;
        }
      })
    }
  },
  mounted(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
  .myOrder{
    &-pagination{
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
</style>