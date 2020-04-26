<template>
  <section class="myOrder">
    <!-- 时间 商品名字数量 价格 状态  -->
    <el-dropdown class="import">
      <el-button type="success " >导出数据<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="importFunction(1)">导出本页数据</el-dropdown-item>
        <el-dropdown-item @click.native="importFunction(2)">导出全部数据</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
import Xlsx from "xlsx"

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
    },
    importFunction(type){
      // 1: 本页  2: 全部
      let self = this, aoa = [['日期', '状态', '商品名字', '总价格']], title = '';
      if(type === 1){
        aoa = aoa.concat(this.tableData.map((item) => {
          let productName = item.order_goods.map((goodsItem) => {
            return '' + goodsItem.product + 'x' + goodsItem.buyNum;
          })
          return [item.create_time, item.payStatus, productName.join(','), item.sum_money]
        }));
        title = '本页订单.xlsx';
        let sheet = Xlsx.utils.aoa_to_sheet(aoa);
        self.openDownloadDialog(self.sheet2blob(sheet), title)
      }else if(type === 2){
        title = '全部订单.xlsx';
        this.$ajax.post('/getAllOrder', {user_id: this.userInfo.id}).then((res) => {
          aoa = aoa.concat(res.data.map((item) => {
            let productName = JSON.parse(item.order_goods).map((goodsItem) => {
              return '' + goodsItem.product + 'x' + goodsItem.buyNum;
            })
            return [item.create_time, item.payStatus, productName.join(','), item.sum_money]
          }))
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
  .import{
    float: right;
    margin-right: 10px;
  }
</style>