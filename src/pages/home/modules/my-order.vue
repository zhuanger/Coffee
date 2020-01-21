<template>
  <section class="myOrder">
    <!-- 时间 商品名字数量 价格 状态  -->
    <div class="">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="create_time" label="日期" width="160"></el-table-column>
        <el-table-column prop="payStatus" label="状态" width="120"></el-table-column>
        <el-table-column label="商品名字">
          <template slot-scope="scope">
            <div >
              <p v-for="(item, index) in scope.row.order_goods" :key="index">{{item.product + '   x' + item.buyNum}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sum_money" label="总价格" width="100"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-count="total" class="myOrder-pagination"
      @prev-click="changePage" @next-click="changePage" @current-change="getData"></el-pagination>
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return{
      tableData: [],
      total: 0,
      userInfo: {},
      page: 1
    }
  },
  methods: {
    getData(page){
      let self = this; 
      if(page){
        this.page = page;
      }
      this.$ajax.post('/userorders', {
        user_id: this.userInfo.id,
        page: this.page
      }).then((res)=>{
        if(res.code === 200){
          res.data.pageinfo.forEach((item)=>{
            item.payStatus = item.whether_pay === 'False' ? '未付款' : '已经付款';
            item.order_goods = JSON.parse(item.order_goods);
          })
          self.tableData = res.data.pageinfo;
          self.total = res.data.pagenum;
          self.page++;
        }
      })
    },
    changePage(page){
      this.page = page;
      this.getData();
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