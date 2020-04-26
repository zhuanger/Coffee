<template>
  <section class="manage">
    <!-- 用户名/ 角色/ 设置权限 -->
    <el-button type="primary" class="manage-add" @click="dialogFormVisible = true">添加成员</el-button>
    <el-dropdown class="import">
      <el-button type="success" >导出数据<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="importFunction(1)">导出本页数据</el-dropdown-item>
        <el-dropdown-item @click.native="importFunction(2)">导出全部数据</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <input  @change="importExcel($event)"  class="importE" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="isLoading">
      <el-table-column prop="username" label="用户名" width="200"></el-table-column>
      <el-table-column prop="role_id" label="角色" width="200"></el-table-column>
      <el-table-column  type="index" width="400" >
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
import {trim} from "@A/js/util";
import Xlsx from "xlsx"
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
      if(trim(this.form.username).length === 0){
        this.$message({
          showClose: true,
          message: '用户名不能为空',
          type: 'warning'
        });
        return
      }
       if(trim(this.form.password).length === 0){
        this.$message({
          showClose: true,
          message: '密码不能为空',
          type: 'warning'
        });
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
            if(e.avatar){
              e.avatar = decodeURIComponent(window.atob(e.avatar));
            }
          });
          self.tableData = res.data.pageinfo;
          self.total = res.data.pagenum;
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
      let _permissionValue = this.permissionValue + "";
      if(_permissionValue.length === 0){
        this.$message({
          type: 'warning',
          message: '请选择权限'
        });
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
    },
    readWorkbookFromLocalFile(file, callback) {
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = e.target.result;
        let workbook = Xlsx.read(data, {type: 'binary'});
        if(callback) callback(workbook);
      };
      reader.readAsBinaryString(file);
    },
    importFunction(type){
      // 1: 本页  2: 全部
      let self = this, aoa = [['用户名', '角色']], title = '';
      if(type === 1){
        aoa = aoa.concat(this.tableData.map((item) => {
          return [item.username, item.role_id]
        }));
        title = '本页成员.xlsx';
        let sheet = Xlsx.utils.aoa_to_sheet(aoa);
        self.openDownloadDialog(self.sheet2blob(sheet), title)
      }else if(type === 2){
        title = '全部成员.xlsx';
        this.$ajax.post('/getAllUserToImport', {user_id: this.userInfo.id}).then((res) => {
          aoa = aoa.concat(res.data.map((item) => {
            if(item.role_id === 1){
              item.role_id = '店员';
            }else if(item.role_id === 2){
              item.role_id = '老板';
            }
            return [item.username, item.role_id]
          }))
          let sheet = Xlsx.utils.aoa_to_sheet(aoa);
          self.openDownloadDialog(self.sheet2blob(sheet), title)
        })
      }
     
    },
    importExcel(e){
      let self = this;
      this.readWorkbookFromLocalFile(e.target.files[0], (res) => {
        let worksheet = res.Sheets.sheet1, sendData = [];
        let worksheetKeyLength = Object.keys(worksheet);
        if(worksheetKeyLength.length < 5){
          self.$message({
            showClose: true,
            message: '请选择正确的Excel表',
            type: 'error'
          });
          return
        }
        for(var key in worksheet) {
          let va = key[0] === '!' ? worksheet[key] : worksheet[key].v
          if(key[0] === 'A'){
            let numbers = key.slice(1, key.length);
            let valueKey = 'B' + numbers;
            sendData.push({username: va, role_id: worksheet[valueKey].v})
          }
        }

        self.$ajax.post('/importUser', {list: JSON.stringify(sendData.slice(1, sendData.length))}).then((result) => {
          if(result.data){
            self.$message({
              showClose: true,
              message: '导入成功',
              type: 'success'
            });
            self.getData(1);

          }
          e.target.value = "";
        })
      })
    },
    sheet2blob(sheet, sheetName) {
      sheetName = sheetName || 'sheet1';
      var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      };
      workbook.Sheets[sheetName] = sheet;
      // 生成excel的配置项
      var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      };
      var wbout = Xlsx.write(workbook, wopts);
      var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
      // 字符串转ArrayBuffer
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      return blob;
    },
    openDownloadDialog(url, saveName){
      if(typeof url == 'object' && url instanceof Blob)
      {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      var aLink = document.createElement('a');
      aLink.href = url;
      aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event;
      if(window.MouseEvent) event = new MouseEvent('click');
      else
      {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      aLink.dispatchEvent(event);
    }
  },
  mounted(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getData();
  },
  watch: {
    dialogFormVisible(n, o){
      if(!n){
        this.form = {};
      }
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
  .import{
    float: right;
    margin-right: 10px;
  }
  .importE{
    float: right;
    width: 150px;
    margin-right: 10px;
    padding-top: 8px;
    height: 40px;
  }
</style>