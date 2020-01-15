<template>
  <section class="manage">
    <!-- 用户名/ 角色/ 设置权限 -->
    <el-button type="primary" class="manage-add" @click="dialogFormVisible = true">添加成员</el-button>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="isLoading">
      <el-table-column prop="username" label="用户名" width="200"></el-table-column>
      <el-table-column prop="role_id" label="角色" width="200"></el-table-column>
      <el-table-column prop="address" label="操作" type="index" width="400">
        <template slot-scope="scope">
          <el-button type="primary" @click="permission(scope.row, scope.$index)">权限设置</el-button>
          <el-button type="danger" @click="deleteUser(scope.row, scope.$index)">删除</el-button>
        </template>
        
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :page-count="total" class="myOrder-pagination"
    @prev-click="changePage" @next-click="changePage" @current-change="getData"></el-pagination>

    <el-dialog title="添加成员" :visible.sync="dialogFormVisible">
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
        <el-button type="primary" @click="submit" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限设置 -->
    <el-dialog title="权限设置" :visible.sync="permissionSetVisible" v-loading="isLoading">
      <el-select v-model="permissionValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.describe"
          :value="item.id">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="permissionSubmit" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>


  </section>
</template>
<script>
export default {
  data(){
    return{
      tableData: [],
      total: 1,
      isLoading: false,
      dialogFormVisible: false,
      permissionSetVisible:  false,
      form: {
        username: '',
        password: ''
      },
      permissionForm: {

      },
      formLabelWidth: '120px',
      btnLoading: false, // 按钮Loading
      page: 1,
      options:[],
      permissionValue: '',
      permissionRow: {}, //点击权限设置当前行信息
      userInfo: {}
    }
  },
  methods: {
    submit(){
      if(this.btnLoading){
        return
      }
      let self = this;
      this.btnLoading = true;
      this.$ajax.post('/addUser',this.form).then((res)=>{
        // if(res.code === 200){
          self.btnLoading = false;
          self.tableData.unshift({
            id: res.data.id,
            username: res.data.username,
            role_id: '店员'
          });
          self.total++;
          self.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          self.dialogFormVisible = false;
          self.form = {};
          console.log(self.tableData);
          // 刷新列表 一个弹出显示显示成功
        // }
      }).catch((e)=>{
        self.btnLoading = false;
      })
    },
    getData(page){
      if(this.isLoading){
        return;
      }
      this.isLoading = true;
      if(page){
        this.page = page;
      }
      let self = this;
      this.$ajax.post('/getAllUser', {page: this.page, user_id: this.userInfo.id}).then((res)=>{
        if(res.code === 200){
          res.data.pageinfo.forEach((e)=>{
            if(e.role_id === 1){
              e.role_id = '店员';
            }else if(e.role_id === 2){
              e.role_id = '老板';
            }
          });
          self.tableData = res.data.pageinfo;
          self.total = res.data.pagenum;
          self.page ++;
          self.isLoading = false;
        }
      }).catch((e)=>{
        self.isLoading = false;
      })
    },
    deleteUser(row, index){
      let self = this;
      this.$confirm('确定要删除此店员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.$ajax.post('deleteUser', {
          id: row.id
        }).then((res)=>{
          if(res.code === 200){
            self.tableData.splice(((self.page - 1) * 10) + index, 1);
            self.total--;
            self.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            self.$message({
            type: 'success',
            message: '删除失败!'
          });
          }
          
        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    permission(row, index){     
      if(this.isLoading){
        return
      }
      this.permissionSetVisible = true;
      let self = this;
      this.isLoading = true;
      this.$ajax.post('/getRole').then((res)=>{
        if(res.code === 200){
          self.permissionRow.row = row;
          self.permissionRow.index = index;
          self.options = res.data;
          self.isLoading = false;
        }
      }).catch((e)=>{
        self.permissionSetVisible = false;
      })
    },
    permissionSubmit(){
      if(this.btnLoading){
        return
      }
      this.btnLoading = true;
      let self = this;
      this.$ajax.post('/setRole', {id: this.permissionRow.row.id, role_id: Number(this.permissionValue)})
        .then((res)=>{
          if(res.code === 200){
            self.tableData[((self.page - 2) * 10) + this.permissionRow.index].role_id = Number(this.permissionValue) === 1 ? '店员' : '老板';
            self.permissionRow = {};
            self.btnLoading = false;
            self.permissionSetVisible = false;
          }
        }).catch((e)=>{
          self.permissionRow = {};
          self.btnLoading = false;
          self.permissionSetVisible = false;
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
  .manage{
    &-add{
      float: right;
    }
  }
</style>