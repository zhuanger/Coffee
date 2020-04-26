import state from "./state";

const mutations = {
  SET_LOGIN(state, payload){
    state.hasLogin = payload;
  },
  SET_SEARCH(state, payload){
    state.search = payload;
  },
  SET_CARTITEM(state, payload){
    state.cartItem = payload;
  },
  SET_BALANCESTATUS (state, payload){
    state.balanceStatus = payload;
  },
  SET_BALANCETITLE(state, payload){
    state.balanceTitle = payload;
  },
  SET_QRIMG(state, payload){
    state.qrImg = payload;
  },
  SET_ISBALANCE(state, payload){
    state.isBalance = payload;
  },
  SET_ORDERID(state, payload){
    state.orderId = payload;
  },
  SET_SEARCHCLICK(state, n){
    state.searchClickParams = n;
  }
}
export default mutations