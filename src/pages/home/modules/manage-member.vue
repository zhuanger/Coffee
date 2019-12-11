<template>
  <section class="manage">
    <!-- 用户名/ 角色/ 设置权限 -->
    <el-button type="primary" class="manage-add" @click="dialogFormVisible = true">添加成员</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="用户名" width="120"></el-table-column>
      <el-table-column prop="name" label="角色" width="140"></el-table-column>
      <el-table-column prop="address" label="操作" >
        <el-button type="primary">权限设置</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      form: {
        username: '',
        password: ''
      },
      formLabelWidth: '120px'
      // total: 
    }
  },
  methods: {
    submit(){
      console.log(this.$ajax.post);
      var params = new URLSearchParams();
      params.append('username', 'jom');
      params.append('password', '6666');
      this.$ajax.post('/register',params).then((res)=>{
        console.log('res', res);
      }).catch((e)=>{

      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .manage{
    &-add{
      float: right;
    }
  }
</style>