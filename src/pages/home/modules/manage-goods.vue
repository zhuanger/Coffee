<template>
  <section class="manageGoods">
    <!-- 商品 价格 上架时间 操作：删除。修改 -->
    <el-button type="primary" class="manage-add" @click="edit('1', '1', 'create')">添加商品</el-button>
    <el-table :data="tableData" stripe style="width: 100%" @sort-change="sortBy">
      <el-table-column prop="product" label="名字" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="140"></el-table-column>
      <el-table-column prop="add_date" label="上架时间" width="140"></el-table-column>
      <el-table-column prop="goodType" label="商品分类" width="140"></el-table-column>
      <el-table-column prop="stock" label="库存" width="80" sortable="custom"></el-table-column>
      <el-table-column prop="sell_num" label="销售量" width="100" sortable="custom" ></el-table-column>
      <el-table-column label="商品图片" width="200">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i>-->
          <!-- <span style="margin-left: 10px">{{ scope.row }}</span>  -->
          
          <img :src="scope.row.image" alt="" style="width: 140px;">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row, scope.$index, 'edit')">编辑</el-button>
          <el-button type="danger" @click="deleteGood(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-count="total" class="myOrder-pagination"
    @prev-click="changePage" @next-click="changePage" @current-change="getData"></el-pagination>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名字" :label-width="formLabelWidth">
          <el-input v-model="form.product" autocomplete="off" placeholder="商品名字"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" placeholder="商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品主要成分" :label-width="formLabelWidth">
          <el-input v-model="form.component" autocomplete="off" placeholder="商品主要成分"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="form.stock" autocomplete="off" placeholder="商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth" class="manageGoods-itemAvatar">
          <div class="manageGoods-avatar-div"><img class="manageGoods-avatar-image" :src="form.image" alt=""></div>
          <imageAdd @updateAvatar="updateAvatar" title="上传图片" class="manageGoods-avatar-btn"></imageAdd>
        </el-form-item>    
         <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select v-model="form.good_types_id" placeholder="商品分类">
            <el-option :label="item.type" :value="item.id" v-for="(item, index) in typeItem" :key="index"></el-option>
          </el-select>
        </el-form-item>   
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  import imageAdd from '@C/imageAdd';
  import {trim} from "@A/js/util";
  export default {
    data(){
      return{
        tableData: [],
        dialogFormVisible: false,
        dialogType: 'create',
        btnLoading: false, // 按钮Loading
        page: 1,
        total: 0,
        form: {
          product: '',
          price: '',
          stock: '',
          image: '',
          component: '',
          good_types_id: '',
        },
        formLabelWidth: '120px',
        userInfo: {},
        typeItem: [],
        editIndex: -1,
        title: ''
      } 
    },
    methods:{
      updateAvatar(avatar){
        this.form.image = avatar;
      },
      submit(){
        if(this.btnLoading) return
        let url = '';
        if(this.dialogType === 'create'){
          url = '/createGoods';
        }else{
          url = '/updateGood';
        } 
        if(!this.verify()){
          return
        }
        let self = this;
        this.btnLoading = true;
        this.form.image = encodeURIComponent(this.form.image);
        this.$ajax.post(url, this.form).then((res)=>{
          self.btnLoading = false;
          self.dialogFormVisible = false;
          if(this.dialogType === 'create'){
            res.data.result.image = decodeURIComponent(res.data.result.image);
            res.data.result.goodType = this.typeItem[Number(res.data.result.good_types_id) - 1].type;
            res.data.result.add_date = res.data.result.add_date.split(' ')[0] + ' ' + res.data.result.add_date.split(' ')[1];
            self.tableData.unshift(res.data.result);
          }else{
            self.form.image = decodeURIComponent(self.form.image);
            self.$set(self.tableData,self.editIndex, self.form)
          }
         
          self.$message({
            showClose: true,
            message: self.dialogType === 'create'?'添加成功' : '修改成功',
            type: 'success'
          });
        }).catch(()=>{
          self.btnLoading = false;
          self.dialogFormVisible = false;
          self.$message({
            showClose: true,
            message: '服务器出错',
            type: 'warm'
          });
        })
      },
      verify(){
        if(trim(this.form.product).length === 0){
          this.$message({
            type: 'warning',
            message: '请输入正确的商品名字'
          });
          return false
        }
         if(!Number(this.form.price)){
          this.$message({
            type: 'warning',
            message: '请输入正确的价格'
          });
          return false
        }
        if(trim(this.form.component).length === 0){
          this.$message({
            type: 'warning',
            message: '请输入正确的商品组成成分'
          });
          return false
        }
        if(!Number(this.form.stock)){
          this.$message({
            type: 'warning',
            message: '请输入正确的库存'
          });
          return false
        }
        if(this.form.image.length === 0){
          this.$message({
            type: 'warning',
            message: '请上传图片'
          });
          return false
        }
        if(String(this.form.good_types_id).length === 0){
          this.$message({
            type: 'warning',
            message: '请选择分类'
          });
          return false
        }
        return true
      },
      getData(page, sortBy = ['id', 'DESC']){
        let self = this; 
        if(page){
          this.page = page;
        }
        this.$ajax.post('/allGoods', {
          page: this.page,
          sortBy: JSON.stringify(sortBy)
        }).then((res)=>{
          if(res.code === 200){
            res.data.pageinfo.forEach((e)=>{
              e.add_date = e.add_date.split('T')[0]; 
              e.goodType = this.typeItem[Number(e.good_types_id) - 1].type;
              if(e.image){
                e.image = decodeURIComponent(window.atob(e.image));
              }
            });
            self.tableData = res.data.pageinfo;
            self.total = res.data.pagenum;
          }
        }).catch(()=>{
          self.dialogFormVisible = false;
        })
      },
      edit(item, index, type){
        if(type === 'edit'){
          this.title = '修改商品';
          this.editIndex = index;
          this.form = Object.assign({},item);
        }else{
          this.title = '添加商品';
        }
        this.dialogType = type;
        this.dialogFormVisible = true;
      },
      deepCopy(object){
        if(Object.prototype.toString.call(object) !== '[object Object]'){
          return
        }
        let _obj = {};
        for(let key in object){
          if(Object.prototype.toString.call(object[key]) !== '[object Object]'){
            _obj[key] = object[key];
          }else{
            _obj[key] = this.deepCopy(object[key]);
          }
        }
        return _obj
      },
      changePage(page){
        this.page = page;
        this.getData();
      },
      getType(){
        let self = this;
        this.$ajax.get('/goodtypes').then((res)=>{
          this.typeItem = res.data;
          self.getData(1);
        })
      },
      deleteGood(row, index){
        let self = this;
        this.$confirm('确定要删除此商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$ajax.post('/deletegoods', {
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
      sortBy(row){
        let sortBy = row.order === "descending" ? 'DESC' : 'ASC';
        this.getData(1, [row.prop, sortBy]);

      }
    },
    mounted(){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.getType();
    },
    components: {
      imageAdd
    },
    watch: {
      dialogFormVisible(n, o){
        if(!n){
          this.form = this.$options.data().form;
        }
      }
    }
  }
</script>
<style lang="scss">
  .manageGoods-avatar{
    width: 120px;
    height: 120px;
    &-image{
      height: 120px;
    }
  }
  .myOrder-pagination{
    text-align: center;
    margin-top: 10px;
  }
  .manageGoods-avatar-div{
    height: 120px;
    width: 120px;
    float: left;
  }
  .manageGoods-avatar-btn{
    margin-left: 145px;
    margin-top: 60px !important;
  }
</style>