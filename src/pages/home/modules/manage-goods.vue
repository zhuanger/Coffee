<template>
  <section class="manageGoods">
    <!-- 商品 价格 上架时间 操作：删除。修改 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="名字" width="120"></el-table-column>
      <el-table-column prop="name" label="价格" width="140"></el-table-column>
      <el-table-column prop="date" label="上架时间" width="140"></el-table-column>
      <el-table-column prop="address" label="操作" >
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  export default {
    data(){
      return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        // total: 
      }
    }
  }
</script>
<style lang="scss">

</style>