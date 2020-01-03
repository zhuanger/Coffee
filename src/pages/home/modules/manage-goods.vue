<template>
  <section class="manageGoods">
    <!-- 商品 价格 上架时间 操作：删除。修改 -->
    <el-button type="primary" class="manage-add" @click="dialogFormVisible = true">添加商品</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="product" label="名字" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="140"></el-table-column>
      <el-table-column prop="add_date" label="上架时间" width="140"></el-table-column>
      <el-table-column prop="image" label="商品图片" width="140"></el-table-column>
      <el-table-column prop="address" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row, scope.$index)">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" class="myOrder-pagination"></el-pagination>

    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
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
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <img class="manageGoods-avatar-image" :src="form.image" alt="">
          <imageAdd @updateAvatar="updateAvatar" title="上传图片"></imageAdd>
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
  export default {
    data(){
      return{
        tableData: [],
        // total: 
        dialogFormVisible: false,
        btnLoading: false, // 按钮Loading
        page: 1,
        total: 0,
        form: {
          product: '',
          price: '',
          stock: '',
          image: '',
          component: ''
        },
        formLabelWidth: '120px',
        userInfo: {}
      } 
    },
    methods:{
      updateAvatar(avatar){
        this.form.image = avatar;
      },
      submit(){
        if(this.btnLoading) return
        let self = this;
        this.btnLoading = true;
        this.$ajax.post('/createGoods', this.form).then((res)=>{
          self.btnLoading = false;
          self.dialogFormVisible = false;
          self.tableData.unshift(self.form);
          self.$message({
            showClose: true,
            message: '添加成功',
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
      getData(){
        let self = this; 
        this.$ajax.post('/allGoods', {
          page: this.page
        }).then((res)=>{
          if(res.code === 200){
            res.data.result.forEach((e)=>{
              e.add_date = e.add_date.split('T')[0]; 
            });
            self.tableData = self.tableData.length === 0 ? [].concat(res.data.result) : self.tableData.concat(res.data.result);
            self.page++;
          }
        })
      },
      edit(item){
        this.form = item;
        this.dialogFormVisible = true;
      }
    },
    mounted(){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.getData();
    },
    components: {
      imageAdd
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
</style>