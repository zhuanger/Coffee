<template>
  <div class="order">
    <div class="order-left">
      <ul class="order-left-ul">
        <li v-for="(item, index) of liItem" :key="index" @click="changeTab(index)" :class="['order-left-ul-li', index === clickActive ? 'active':'']">
          {{item.type}}
        </li>
      </ul>
    </div>
    <div class="order-right" v-if="goodsItem.length!==0">
      <div>
        <good v-for="(item, index) of goodsItem" :key="index" :item="item" @addGood="addGood"></good>  
      </div>
      <el-pagination background layout="prev, pager, next" :page-count="total" class="order-pagination"
        @prev-click="changePage" @next-click="changePage" @current-change="getData" v-if="goodsItem.length!==0"></el-pagination>
    </div>
    
    <div class="no-result" v-if="goodsItem.length===0">
      <p>没有找到此类型商品</p>
    </div>
    <div class="order-ope">
      <button class="order-ope-cart button" @click="drawer = true">
        <!-- <i class="num" v-if="cartItem.length!==0">{{cartItem.length === 0 ? '' : cartItem.length}}</i> -->
        <i class="num" v-if="cartItem.length!==0">{{buyNum}}</i>
      </button>
      <button class="order-ope-top button" @click="gotoTop"><i class="el-icon-arrow-up"></i></button>
    </div>
    <el-drawer title="已选商品" :visible.sync="drawer" :direction="direction" class="order-drawer">
      <div slot="title" class="order-drawer-top">
        <h4>已选商品</h4>
        <div class="order-drawer-top-right">
          <span>总共：<span class="allPrice"><strong>{{totalPrice}}</strong></span></span>
          <el-button type="primary" @click="balance" :loading="isBalance">{{balanceTitle}}</el-button>
        </div>
      </div>
      <cart-good v-for="(item, index) in cartItem" :key="index" :item="item" :buyNum="item.buyNum" @deleteItem="deleteItem(index)"
       @changeNum="changeNum(arguments, index)" ref="cartGood">

      </cart-good>
    </el-drawer>
    <div class="order-qrcode" v-if="balanceStatus === 2">
      <div class="order-qrcode-img">
        <img :src="qrImg" >
      </div>
      <div class="order-qrcode-div">
        <el-button type="primary" class="order-qrcode-btn" @click="hasGiveMoney" :loading="isSurePay">确定付款</el-button>
        <i class="el-icon-close" @click="closeQrCode"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import good from "@C/good";
  import cartGood from "@C/cart-good";
  import { mapState } from 'vuex'
  export default {
    data(){
      return{
        liItem:[],
        clickActive: 0,
        drawer: false,
        direction: 'ltr',
        num: 1,
        orderType: 1,
        total: 0,
        goodsItem: [],
        totalPrice: 0,
        userInfo: {},
        isSurePay: false,
        buyNum: 0
      }
    },
    methods: {
      changeTab(index){
        this.clickActive = index;
        this.page = 1;
        this.getData();
      },
      handleChange(value) {
      },
      getType(){
        this.$ajax.get('/goodtypes').then((res)=>{
          this.liItem = res.data;
        })
      },
      getData(page = 1){
        let self = this;
        this.$ajax.post('/goodtypesinfo', {good_types_id: this.clickActive+1, page: page, num: 6}).then((res)=>{
          if(res.code === 200){
            res.data.pageinfo.forEach((e)=>{
              e.image = decodeURIComponent(window.atob(e.image));
            });
            self.goodsItem = res.data.pageinfo;
            self.total = res.data.pagenum;
          }
        })
      },
      changePage(page){
        this.getData(page)
      },
      addGood(value){
        if(this.isWaitGive('此订单已经提交，无法添加物品')){      
          return
        } 
        console.log('value', value.buyNum);
        this.$set(value, 'buyNum', value.buyNum ? value.buyNum + 1 : 1);
        let hasCart = false, _cartItem = this.cartItem.map((item)=>{
          return item
        });
        for(let i = 0; i < _cartItem.length; i++){
          if(_cartItem[i] && _cartItem[i].id === value.id){
            _cartItem[i] = value;
            hasCart = true;
            break
          }
        }
        if(!hasCart){
          _cartItem.push(value);  
        }
        this.$store.commit('SET_CARTITEM', _cartItem);
      },
      isWaitGive(text){
        if(this.balanceTitle === '待付款'){
          this.$message({
            showClose: true,
            message: text,
            type: 'warning'
          });
          return true
        }
      },
      deleteItem(index){  
        if(this.isWaitGive('此订单已经提交，无法删除物品')){      
          return
        } 
        
        this.cartItem.splice(index, 1);
        this.$store.commit('SET_CARTITEM', this.cartItem);
      },
      gotoTop(){
        let htmlDom = document.querySelector('html');
        let _setInterval = setInterval(()=>{
          htmlDom.scrollTop = htmlDom.scrollTop - 10;
          if(htmlDom.scrollTop === 0){
            clearInterval(_setInterval);
          }
        }, 10);
      },
      changeNum(args, index){
        if(this.isWaitGive('此订单已经提交，无法添加或减少物品')){
          return
        }
        this.$set(this.cartItem[index], 'buyNum', args[0]);
        
      },
      balance(){
        if(this.isBalance){
          return;
        }

        if(this.balanceTitle === '去结算'){
          this.$store.commit('SET_ISBALANCE', true);
          this.$store.commit('SET_BALANCETITLE', '计算中...');
          let self = this, params = {
            sum_money: this.totalPrice,
            order_goods: JSON.stringify(this.cartItem),
            whether_pay: false,
            user_id: this.userInfo.id
          };
          this.$ajax.post('/orders', params).then((res)=>{
            if(res.code === 200){
              self.$store.commit('SET_ORDERID', res.data.id);
              self.$store.commit('SET_BALANCESTATUS', 2);
              self.$store.commit('SET_BALANCETITLE', '待付款');
              self.$store.commit('SET_QRIMG', decodeURIComponent(window.atob(res.data.balanceImage)));
              self.$store.commit('SET_ISBALANCE', false);
              self.$refs.cartGood.forEach((item)=>{
                item.disabled = true;
              })
            }
          })
        }else if(this.balanceTitle === '待付款'){
          if(this.balanceStatus === 1){
            this.$store.commit('SET_BALANCESTATUS', 2);
          }
        }
      },
      hasGiveMoney(){
        if(this.isSurePay){
          return
        }
        this.isSurePay = true;
        let self = this;
        this.$ajax.post('/updatepaystatus', {order_id: this.orderId}).then((res)=>{
          if(res.code === 200){
            self.$store.commit('SET_ORDERID', res.data.id);
            self.$store.commit('SET_BALANCESTATUS', 1);//改变前端订单状态
            self.$store.commit('SET_BALANCETITLE', '去结算');//改变状态：去结算——待付款
            self.$store.commit('SET_CARTITEM', []);//清空购物车
            self.drawer = false;
            self.$message({
              showClose: true,
              message: '付款成功',
              type: 'success'
            });
            self.isSurePay = false;
            window.location.reload();//刷新页面
            // self.$store.commit('SET_QRIMG', decodeURIComponent(window.atob(res.data.balanceImage)));
            // self.$store.commit('SET_ISBALANCE', false);
          }
        }).catch((e)=>{
          self.isSurePay = false;
          self.$message({
            showClose: true,
            message: '服务器出错',
            type: 'error'
          });
        })
      },
      closeQrCode(){
        this.$store.commit('SET_BALANCESTATUS', 1);
      }
    },
    created(){
      if(this.$route.query.item){
        let item = JSON.parse(this.$route.query.item);
        this.clickActive = item.good_types_id - 1;
        this.cartItem.push(item);
        this.$store.commit('SET_CARTITEM', this.cartItem);
      }
      this.getType();
      this.getData();
    },
    mounted(){
      
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    components: {
      good,
      cartGood
    },
    watch: {
      'cartItem': {
        deep: true,
        immediate: true,
        handler(n){
          console.log('----');
          let total = 0, buyNum = 0;
          n.forEach((e, index)=>{          
            total = total + (Number(e.price) * Number(e.buyNum));
            buyNum = buyNum + e.buyNum;
          })
          this.buyNum = buyNum;
          this.totalPrice = total;
        }
      }
    },
    computed: mapState({
      cartItem: state => state.cartItem,
      balanceStatus: state => state.balanceStatus,
      balanceTitle: state => state.balanceTitle,
      qrImg: state => state.qrImg,
      isBalance: state => state.isBalance,
      orderId: state => state.orderId
    })
  }
</script>
<style lang="scss" scoped>
  .order{
    margin-top: 50px;
    padding: 0 70px;
    display: flex;
    &-left{
      // float: left;
      margin-right: 120px;
      &-ul{
        &-li{
          width: 130px;
          height: 50px;
          background-color: #eeeeee; 
          cursor: pointer;
          line-height: 50px;
          text-align: center;
          border-bottom: 1px solid #ddd;
          &.active{
            background-color: $text-color;
            color: #ffffff;
          }
          &:last-child{
            border-bottom: 0px;
          }
        }
      }      
    }
    &-right{
      display: flex;
      flex-direction: column ;
      width: 980px;
    }
    &-ope{
      position: fixed;
      right: 50px;
      border: 1px solid #bbb;
      height: 100px;
      width: 55px;
      border-radius: 3px;
      top: 220px;
      box-sizing: content-box;
      .button{
        border: 0;
        display: block;
        height: 48px;
        width: 100%;
        background-color: #ffffff;
        outline: 0;
      }
      &-cart{
        background-image: url("../../assets/images/cart.png");
        background-size: 22px 22px;
        background-repeat: no-repeat;
        background-position:center;
        border-bottom: 1px solid #bbbbbb !important;
        position: relative;
        cursor: pointer;
        .num{  
          color: #ffffff;
          width: 18px;
          height: 18px;
          background-color: $text-color;
          display: block;
          border-radius: 30%;
          line-height: 18px;
          position: relative;
          left: 30px;
          bottom: 11px;
        }
      }
      &-top{
        i{
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
    &-drawer{
      /deep/ .el-drawer__body{
        overflow-y: scroll;
      };
      &-top{
        display: flex;
        justify-content: space-between;
        &-right{
          margin-right: 20px;
          .allPrice{
            margin-right: 20px;
            color: red;
            font-size: 20px;
          }
        }
      }
    }
    &-pagination{
      text-align: center;
    }
    &-qrcode{
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      z-index: 2020;
      width: 300px;
      height: 335px;
      background-color: #fff;
      left: 50%; 
      top: 50%;
      margin-top: -165px; 
      margin-left: -150px; 
      &-img{
        width: 100%;
        height: 280px;
        >img{
          width: 100%;
          height: 100%;
        }
      } 
      &-btn{
        text-align: center;
        width: 120px;
        margin-top: 10px;
      }
      &-div{
        >i{
          cursor: pointer;
          position: relative;
          left: 60px;
        }
      }
    }
  }
  .no-result{
    margin-top: 70px;
    margin-left: 200px;
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