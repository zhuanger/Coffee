<template>
  <article class="article" id="mp-editor">
    <section class="hero relative">
      <div class="block relative mobile-hidden " style="margin-top: 50px;">
        <a href="#lto-items">
          <img src="../../assets/images/testImage-1.jpg" class="img">
        </a>
      </div>
      <div class="wrapper">
        <h2>HELLO 2020</h2>
        <p class="text description" style="padding:0 20px; font-size: 1.6rem; font-weight: 400;">    
          经典福满栗香玛奇朵回归，2020就“福”你<br>全新灵感锦绣金钻凤梨拿铁，愿你锦鲤+1<br>爱恋桃红抹茶拿铁再次升级，新年桃花满满
        </p>
      </div>
    </section>
    <div class="item">
      <div class="mobile-hidden">
        <a href="#lto-items" class="block relative">
          <img src="../../assets/images/testImage-4.jpg" class="img">
        </a>
        <div class="description text wrapper" style="text-align: center">
          <h2>冰淇淋遇上新年福“栗”</h2>
          <p>新西兰进口香草味冰淇淋，缓缓融化在热摩卡的温暖怀抱<br>双份馥郁醇厚的精萃浓缩<br>高温蒸煮的牛奶<br>最后淋上法国进口栗子泥制成的甜美栗子淋酱<br>每一口，尽享栗子甜香，绵密馥郁</p>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .hero {
    background: #fff;
    text-align: center;
  }
  section.hero {
    position: relative;
  }
  .hero {
    margin-top: -24px;
  }
  .img {
    height: auto;
    width: 100%;
  }
  .wrapper {
    padding: 30px 0;
  }
  h2{
    margin-bottom: 18px;
  }
</style>