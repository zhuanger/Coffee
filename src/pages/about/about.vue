<template>
  <div class="about">
    <img src="@A/images/aboutMe.png" alt="" class="about-img">
    <div class="about-contanier" :style="'width:' + clientWidth">
      <div>
        <div class="about-container-left">
          <ul>
            <li v-for="(item, index) of liItem" :key="index" :style="'background-color:' + (item.isActive ? '#eee' : '#fff')"
              @click="changeTab(index)">
              <a :class="item.isActive ? item.activeUrl : url ">{{item.name}}</a>
            </li>
          </ul>
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
        liItem: [{name: '关于我们', isActive: true,url: 'aboutIcon', activeUrl: 'aboutIconActive'}, {name: '联系我们', isActive: false},
                  {name: '加入我们', isActive: false}
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
      padding: 100px 140px 0 140px;
      >div{
        border: 1px solid red;
        width: 100%;
        margin: 0 auto;
        ul{
          width: 20%;
          li{
            padding: 15px 25px;
            text-align: center;
            cursor: pointer;
            // background-color: #eee;
            a{
              position: relative;
            }
            a::before{
              content: '';
              position: absolute;
              width: 30px;
              height: 30px;
              left: -40px;
              top: -6px;
              background-size: 30px 30px; 
            }
            .aboutIconActive::before{
              background-image: url('../../assets/images/icon01_active.png');         
            }
            .aboutIcon::before{
              background-image: url('../../assets/images/icon01.png');         
            }
          }
        }
      }
      
    }
  }
</style>