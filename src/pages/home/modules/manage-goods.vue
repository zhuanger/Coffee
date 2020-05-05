<template>
  <section class="manageGoods">
    <!-- 商品 价格 上架时间 操作：删除。修改 -->
    <el-button type="primary" class="manage-add" @click="edit('1', '1', 'create')">添加商品</el-button>
    <el-dropdown class="import">
      <el-button type="success " >导出数据<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="importFunction(1)">导出本页数据</el-dropdown-item>
        <el-dropdown-item @click.native="importFunction(2)">导出全部数据</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button type="primary" class="import" style="margin-right: 10px" @click="census">统计全部商品</el-button>
  

    <el-table :data="tableData" stripe style="width: 100%" @sort-change="sortBy" :loading="loading">
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

    <el-dialog title="商品统计" :visible.sync="censusVisible" width="80%" v-if="censusVisible" top="3vh">
      <div class="census" id="census">
        <div class="echart-census" >

        </div>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import Xlsx from "xlsx"
  import imageAdd from '@C/imageAdd';
  import {trim} from "@A/js/util";
  import echarts from 'echarts'
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
        title: '',
        loading: false,
        censusVisible: false,
        myChart: undefined
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
        this.loading = true;
        this.$ajax.post('/allGoods', {
          page: this.page,
          sortBy: JSON.stringify(sortBy)
        }).then((res)=>{
          if(res.code === 200){
            res.data.pageinfo.forEach((e)=>{
              e.add_date = e.add_date.split(' ')[0]; 
              e.goodType = this.typeItem[Number(e.good_types_id) - 1].type;
              if(e.image){
                e.image = decodeURIComponent(window.atob(e.image));
              }
            });
            self.tableData = res.data.pageinfo;
            self.total = res.data.pagenum;
            self.loading = true;
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

      },
      importFunction(type){
        // 1: 本页  2: 全部
        let self = this, aoa = [['名字', '价格', '上架时间', '商品分类', '库存', '销售量']], title = '';
        if(type === 1){
          aoa = aoa.concat(this.tableData.map((item) => {
            return [item.product, item.price, item.add_date, item.goodType, item.stock, item.sell_num]
          }));
          title = '本页商品.xlsx';
          let sheet = Xlsx.utils.aoa_to_sheet(aoa);
          self.openDownloadDialog(self.sheet2blob(sheet), title)
        }else if(type === 2){
          title = '全部商品.xlsx';
          this.$ajax.post('/getAllGoods', {user_id: this.userInfo.id}).then((res) => {
            aoa = aoa.concat(res.data.map((item) => {
              return [item.product, item.price, item.add_date, item.goodType, item.stock, item.sell_num]
            }));
            let sheet = Xlsx.utils.aoa_to_sheet(aoa);
            self.openDownloadDialog(self.sheet2blob(sheet), title)
          })
        }
      
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
      },
      census(){
        // censusVisible
        let self = this;
        this.$ajax.post('/getAllGoods', {user_id: this.userInfo.id}).then((res) => {
          console.log(res.data)
          self.initChart(res.data);
          // aoa = aoa.concat(this.tableData.map((item) => {
          //   return [item.product, item.price, item.add_date, item.goodType, item.stock, item.sell_num]
          // }));
          // let sheet = Xlsx.utils.aoa_to_sheet(aoa);
          // self.openDownloadDialog(self.sheet2blob(sheet), title)
        })
      },
      initChart(data){
        let self = this;
        let dateArray=[], scoreArray=[], sell_numArray = [];
        this.censusVisible = true;
        this.$nextTick(() => {
          self.myChart = echarts.init(document.querySelector('.echart-census'));
          // 绘制图表
          let length = data.length < 10 ? data.length : 10;
          for(let i=0;i<length;i++){
            dateArray.push(data[i].product);
            scoreArray.push(data[i].stock);
            sell_numArray.push(data[i].sell_num);
          }
          self.myChart.setOption({
            legend: {
              data:  ['库存', '销售量']
            }, 
            title: {
              text: '商品统计'
            },
            xAxis: {
              name: '商品名字',
              data: dateArray,
              type: 'category',
            },
            yAxis: {
              name: '数量',
              type: 'value'
            },
            series: [
            {
              type: 'bar',
              data: scoreArray,  
              name: '库存' ,
              label: {show: true}
            },{
              type: 'bar',
              data: sell_numArray,   
              name: '销售量' ,
              label: {show: true}
            }]
          });
        })
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
  .import{
    float: right;
    margin-right: 10px;
  }
  .echart-census{
    width: 100%;
    height: 520px;
  }
</style>