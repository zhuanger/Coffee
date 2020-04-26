<template>
  <section class="search">
    <div class="search-container">
      <good class="good" v-for="(item, index) in goodsItem" :key="index" :item="item" @addGood="addGood"></good>
      <div class="clear"></div>
    </div>
    
    
    <div class="no-result" v-if="goodsItem.length===0">
      <p>没有找到此类型商品</p>
    </div>
    <el-pagination background layout="prev, pager, next" :page-count="total" class="search-pagination"
    @prev-click="changePage" @next-click="changePage" @current-change="searchData">
      </el-pagination>
  </section>
</template>
<script>
import good from "@C/good";
import { mapState} from 'vuex'
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
      let self = this, url, params = {};
      if(page){
        this.page = page;
      }
      if(this.type === 'hot'){
        url = '/hotgoods';
        params.page = page;
      }else if(this.type === 'new'){
        url = '/newgoods';
        params.page = page;

      }else{
        url = '/selectgood';
        params.page = page;
        params.product = this.search;
      }
      this.$ajax.post(url, params).then((res)=>{
        if(res.code === 200){  
          if(this.type === 'hot'){
            res.data.hotinfo.forEach((e)=>{
              e.image = decodeURIComponent(window.atob(e.image));
            });
            self.goodsItem = res.data.hotinfo;
          }else if(this.type === 'new'){
            res.data.newinfo.forEach((e)=>{
              e.image = decodeURIComponent(window.atob(e.image));
            });
            self.goodsItem = res.data.newinfo;
          }else{
            res.data.info.forEach((e)=>{
              e.image = decodeURIComponent(window.atob(e.image));
            });
            self.goodsItem = res.data.info;
          }      
          self.page++;
          self.total = res.data.pagenum;
        }
      })
    },
    addGood(value){
      this.$set(value, 'buyNum', 1);
      this.$router.push({path: '/order', query: {item: JSON.stringify(value)}})
    },
    changePage(page){
      this.page = page;
      this.searchData();
    }
  },
  created(){
    this.type = this.$route.query.type;
  },
  computed: {
    search(){
      console.log('this.$route.query.keyword ', this.$route.query.keyword );
      return this.$route.query.keyword || this.$store.state.search;
    },
    ...mapState({
      searchClickParams: state => state.searchClickParams
    })
  },
  mounted(){
    this.searchData(1);
  },
  watch: {
    searchClickParams(n, o){
      this.searchData(1);
    }
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
  .no-result{
    margin-top: 70px;
    margin-left: 500px;
    width: 400px;
    height: 250px;
    background-image: url("../../assets/images/ku.png");
    background-repeat: no-repeat;
    background-position:center;
    text-align: center;
    >p{
      font-size: 32px;

    }
  }
</style>