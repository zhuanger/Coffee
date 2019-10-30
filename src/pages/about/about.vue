<template>
  <div class="about">
    <img src="@A/images/aboutMe.png" alt="" class="about-img">
    <div class="about-contanier" :style="'width:' + clientWidth">
      <div class="about-container-div">
        <div class="about-container-div-left">
          <ul>
            <li v-for="(item, index) of liItem" :key="index" :style="'background-color:' + (item.isActive ? '#eee' : '#fff')"
              @click="changeTab(index)">
              <a :class="item.isActive ? item.activeUrl : item.url ">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="about-container-div-right">
          <div>
            <h2>商业模式</h2>
            <p></p>
            <img src="" alt="">
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
      &-div{
        border: 1px solid red;
        width: 900px;
        margin: 0 auto;
        display: flex;
        // &-left{
        //   ul{
        //     width: 100%;
        //     li{
        //       padding: 10px 60px;
        //       text-align: center;
        //       cursor: pointer;
        //       a{
        //         position: relative;
        //       }
        //       a::before{
        //         content: '';
        //         position: absolute;
        //         width: 23px;
        //         height: 23px;
        //         left: -40px;
        //         top: -1px;
        //         background-size: 23px 23px; 
        //       }
        //       .aboutIconActive::before{
        //         background-image: url('../../assets/images/icon01_active.png');         
        //       }
        //       .aboutIcon::before{
        //         background-image: url('../../assets/images/icon01.png');         
        //       }
        //       .contactIconActive::before{
        //         background-image: url('../../assets/images/contact01_active.png');         
        //       }
        //       .contactIcon::before{
        //         background-image: url('../../assets/images/contact01.png');         
        //       }
        //       .joinIconActive::before{
        //         background-image: url('../../assets/images/joinus_active.png');         
        //       }
        //       .joinIcon::before{
        //         background-image: url('../../assets/images/joinus.png');         
        //       }
        //     }
        //   }
        // }
      }
      
      // &-div{
      //   &-right{
      //     padding: 50px;
      //   }
      // }
    }
  }
</style>