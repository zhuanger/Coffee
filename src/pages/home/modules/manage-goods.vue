<template>
  <section class="manageGoods">
    <!-- 商品 价格 上架时间 操作：删除。修改 -->
    <el-button type="primary" class="manage-add" @click="dialogFormVisible = true">添加商品</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="名字" width="120"></el-table-column>
      <el-table-column prop="name" label="价格" width="140"></el-table-column>
      <el-table-column prop="date" label="上架时间" width="140"></el-table-column>
      <el-table-column prop="address" label="操作" >
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名字" :label-width="formLabelWidth">
          <el-input v-model="form.product" autocomplete="off" placeholder="商品名字"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" placeholder="商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="form.stock" autocomplete="off" placeholder="商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off" placeholder="商品库存"></el-input>
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
  export default {
    data(){
      return{
        tableData: [],
        // total: 
        dialogFormVisible: false,
        btnLoading: false, // 按钮Loading
        page: 1,
        form: {
          product: '',
          price: '',
          stock: '',
          image: '',
        },
        formLabelWidth: '120px',

      } 
    },
    methods:{
      submit(){
        
      }
    }
  }
</script>
<style lang="scss">

</style>