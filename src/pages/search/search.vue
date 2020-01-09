<template>
  <section class="search">
    <div class="search-container">
      <good class="good" v-for="(item, index) in goodsItem" :key="index" :item="item" @addGood="addGood"></good>
      <div class="clear"></div>
    </div>
    <el-pagination background layout="prev, pager, next" :page-count="total" class="search-pagination"
    @prev-click="changePage" @next-click="changePage" @current-change="searchData">
      </el-pagination>
  </section>
</template>
<script>
import good from "@C/good";
export default {
  components: {
    good
  },
  data(){
    return{
      type: '',
      goodsItem: [],
      total: 3,
      page: 1
    }
  },
  methods: {
    searchData(page){
      console.log('page', page);
      let self = this, url;
      if(page){
        this.page = page;
      }
      if(this.type === 'hot'){
        url = '/hotgoods'
      }else if(this.type === 'new'){
        url = '/newgoods';
      }else{
        url = '/selectgood';
      }
      this.$ajax.post(url, {page: page}).then((res)=>{
        if(res.code === 200){  
          if(this.type === 'hot'){
            self.goodsItem = res.data.hotinfo;
          }else if(this.type === 'new'){
            self.goodsItem = res.data.newinfo;
          }else{
            self.goodsItem = '/selectgood';
          }      
          self.page++;
          self.total = res.data.pagenum;
        }
      })
    },
    addGood(value){
      
    },
    changePage(page){
      this.page = page;
      this.searchData();
    }
  },
  created(){
    this.type = this.$route.query.type;
  },
  mounted(){
    this.searchData(1);
  }
}
</script>
<style lang="scss" scoped>
  .search{
    &-container{
      padding: 20px;
      .good{
        float: left;
      }
    }
    &-pagination{
      margin-top: 10px;
      margin-left: 35%;
      margin-bottom: 20px;
    }
  }
  .clear{
    clear: both;
  }
</style>