<template>
  <article class="article" id="mp-editor">
    <p style="color: #E7788D; font-size: 32px; margin-top: 16px; text-align:center" class="colorPink">春日樱花季</p>
    <p class="colorPink" style="font-size: 22px; color: black;margin-bottom: 26px;">——全新樱花系列上市</p>
    <img src="../../assets/images/sss.jpg" alt="" style="width: 100%">
    
    <div style="display: flex; justify-content:center">
      <img src="../../assets/images/flower.jpg" alt="" style="width: 40px;height: 40px;">
      <p class="colorPink" style="font-size: 42px">01</p>
    </div>
    <p class="colorPink" style="font-size: 32px;">料多多系列奶茶</p>
    <div style="text-align:left; padding-left:10%; margin: 30px 0; line-height: 70px; font-size: 26px;">
      <p>//</p>
      <p>丝滑的香醇牛奶</p>
      <p>邂逅唇齿相依留香的大红袍</p>
      <p>融合椰果、小槽峒、黑糖珍珠、布丁、黑糖寒天</p>
      <p>每一口都超超超有料</p>
      <p>日式景点甜品</p>
      <!-- <p>细腻绵软的穿冲风味外皮</p>
      <p>填入自然清甜的樱花风味慕斯</p>
      <p>入口即化，甜而不腻</p>
      <p>日式景点甜品</p> -->
    </div>
    <el-divider></el-divider>
     <!-- <div style="display: flex; justify-content:center;margin-top: 50px">
      <img src="../../assets/images/flower.jpg" alt="" style="width: 40px;height: 40px;">
      <p class="colorPink" style="font-size: 42px">02</p>
    </div>
    <p class="colorPink" style="font-size: 32px;">樱花味草莓流心羊角</p>
    <div style="text-align:left; padding-left:12rem; margin: 30px 0; line-height: 70px; font-size: 26px;">
      <p>//</p>
      <p>饱满酥松的羊角包</p>
      <p>表面裹上樱花风味粉巧克力酱</p>
      <p>内里注入甜草莓酱</p>
      <p>轻咬一口满是香甜滋味</p>
    </div> -->
  </article>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  #mp-editor {
    font-size: 16px;
    box-sizing: border-box;
    line-height: 1.9;
    outline: 0;
    overflow-y: auto;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    word-wrap: break-word;
    padding: 3rem 20rem;
  }
  .article-page .article {
    color: #191919;
    font-size: 16px;
    line-height: 30px;
    padding-top: 5px;
    overflow: hidden;
  }
  .article-page .article img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
  .article-page .article img:first-child {
    margin: 10px auto 0;
  }
  #mp-editor .ql-align-center {
    text-align: center;
  }
  .colorPink{
    color: #E7788D;
    margin-top: 16px;
    text-align:center
  }
</style>