<template>
  <section class="search">
    <div class="search-container">
      <!-- <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good>
      <good class="good"></good> -->
      <div class="clear"></div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="1000" class="search-pagination"></el-pagination>
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
      type: ''
    }
  },
  methods: {
    searchData(){
      let self = this, url;
      if(this.type === 'hot'){
        url = '/hotgoods'
      }else if(this.type === 'new'){
        url = '/newgoods';
      }
      this.$ajax.post(url).then((res)=>{
        if(res.code === 200){

        }
      })
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