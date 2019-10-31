<template>
  <div class="about">
    <img src="@A/images/aboutMe.png" alt="" class="about-img">
    <div class="about-contanier" :style="'width:' + clientWidth">
      <div class="about-container-div">
        <div class="about-container-left">
          <ul>
            <li v-for="(item, index) of liItem" :key="index" :style="'background-color:' + (item.isActive ? '#eee' : '#fff')"
              @click="changeTab(index)">
              <a :class="item.isActive ? item.activeUrl : item.url ">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="about-container-right">
          <div v-if="clickActive === 0">
            <h2 class="about-container-right-title">商业模式</h2>
            <p class="about-container-right-text">luckin coffee（瑞幸咖啡）是中国新零售咖啡的典型代表，致力于成为中国领先的高品质咖啡品牌和专业化的咖啡服务提供商。</p>
            <p class="about-container-right-text">luckin coffee 以优选的产品原料、精湛的咖啡工艺，创新的商业模式，领先的移动互联网技术，努力为广大消费者带来更高品质的咖啡消费新体验，推动咖啡文化在中国的普及和发展。</p>
            <img src="@A/images/img01.png" alt="#" class="about-container-right-img">
            <h2 class="about-container-right-title">
              品牌主张
            </h2>
            <p class="about-container-right-text">luckin coffee相信一个崭新时代的源头永远始于改变，我们以高性价比改变咖啡消费观念，以规格原料与制程改变咖啡消费品质，以新零售模式改变咖啡消费体验</p>
            <p class="about-container-right-text">luckin coffee面向职场和年轻一代消费者，鼓励他们充满自信，突破以往，勇于改变</p>
          </div>
          <div class="" v-if="clickActive === 1">
            <h2 class="about-container-right-title">联系我们</h2>
            <h4>进场合作：4000-100-100（热线） hz@luckincoffee.com（邮箱）</h4>
            <p>为大型企业、中高端写字楼提供专业咖啡配套。欢迎各类咖啡厅转让</p>
            <h4>品牌联合：co-branding@luckincoffee.com</h4>
            <h4>媒体合作：pr@luckincoffee.com</h4>
            <h4>媒介资源：bmd-ad@luckincoffee.com</h4>
            <h4>采购招商：cg-zs@luckincoffee.com</h4>
            <img src="@A/images/img02.png" alt="#" class="about-container-right-img">
          </div>
          <div v-if="clickActive === 2">
            <h2 class="about-container-right-title">加入我们</h2>
            <p>luckin coffee不止于提供一杯高品质的新鲜咖啡，我们同时将互联网体验融入咖啡的消费流程，开创出全新的商业模式。加入我们，一起探索更多新鲜事。</p>
            <img src="@A/images/img03.png" alt="#" class="about-container-right-img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        clientWidth: window.innerWidth + 'px',
        clickActive: 0,
        liItem: [{name: '关于我们', isActive: true,url: 'aboutIcon', activeUrl: 'aboutIconActive'}, {name: '联系我们', isActive: false, url:'contactIcon', activeUrl:'contactIconActive'},
                  {name: '加入我们', isActive: false, url: 'joinIcon', activeUrl: 'joinIconActive'}
                ],
      }
    },
    methods: {
      changeTab(index){
        if(this.liItem[index].isActive){
          return
        }
        this.liItem.forEach((item)=>{
          if(item.isActive){
            item.isActive = false;
          }
        })
        this.liItem[index].isActive = true;
        this.clickActive = index;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .about{
    width: 100%;
    &-img{
      max-width: 100%;
      max-height: 340px;
    }
    &-contanier{
      padding-top: 100px;
      >div{
        width: 950px;
        margin: 0 auto;
        display: flex;
        .about-container-left{
          ul{
            width: 210px;
            li{
              padding-left: 30px;
              width: 100%;
              height: 45px;
              line-height: 45px;
              text-align: center;
              border-bottom: 1px solid #eee;
              cursor: pointer;
              a{
                position: relative;
              }
              a::before{
                content: '';
                position: absolute;
                width: 22px;
                height: 22px;
                left: -40px;
                top: 0px;
                background-size: 22px 22px; 
              }
              .aboutIconActive::before{
                background-image: url('../../assets/images/icon01_active.png');         
              }
              .aboutIcon::before{
                background-image: url('../../assets/images/icon01.png');         
              }
              .contactIconActive::before{
                background-image: url('../../assets/images/contact01_active.png');         
              }
              .contactIcon::before{
                background-image: url('../../assets/images/contact01.png');         
              }
              .joinIconActive::before{
                background-image: url('../../assets/images/joinus_active.png');         
              }
              .joinIcon::before{
                background-image: url('../../assets/images/joinus.png');         
              }
            }
            li:last-child{
              border: 0;
            }
          }
        }
        .about-container-right{
          width: 700px;
          padding: 5px 80px;
          line-height: 32px;
          &-title{
            margin-bottom: 20px;
          }
          &-text{
            font-family: PingFangSC-Regular;
            font-size: 15px;
          }
          &-img{
            margin-top: 20px;
            margin-bottom: 50px;
          }
        }
      }
    }
  }
</style>