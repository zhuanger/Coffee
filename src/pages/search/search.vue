<template>
  <section class="search">
    <div class="search-container">
      <good class="good" v-for="(item, index) in goodsItem" :key="index" :item="item" @addGood="addGood"></good>
      <div class="clear"></div>
    </div>
    <el-pagination background layout="prev, pager, next" :page-count="total" class="search-pagination"></el-pagination>
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
      total: 3
    }
  },
  methods: {
    searchData(){
      let self = this, url;
      if(this.type === 'hot'){
        url = '/hotgoods'
      }else if(this.type === 'new'){
        url = '/newgoods';
      }else{
        url = '/selectgood';
      }
      this.$ajax.post(url).then((res)=>{
        if(res.code === 200){  
          if(this.type === 'hot'){
            self.goodsItem = res.data.hotinfo;
          }else if(this.type === 'new'){
            self.goodsItem = res.data.newinfo;
          }else{
            self.goodsItem = '/selectgood';
          }      
          self.total = res.data.pagenum;
        }
      })
    },
    addGood(value){
      
    }
  },
  created(){
    this.type = this.$route.query.type;
  },
  mounted(){
    this.searchData();
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