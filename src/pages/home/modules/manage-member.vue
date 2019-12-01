<template>
  <section class="manage">
    <!-- 用户名/ 角色/ 设置权限 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="用户名" width="120"></el-table-column>
      <el-table-column prop="name" label="角色" width="140"></el-table-column>
      <el-table-column prop="address" label="操作" >
        <el-button type="primary">权限设置</el-button>
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