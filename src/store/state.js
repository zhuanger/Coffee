const state = {
  hasLogin: localStorage.getItem('userInfo') ? true : false,
  search: '', //搜索内容

  cartItem: [], //购物车
  balanceStatus: 1, // 1: 未结算  2: 待付款 3：已经结算  4： 付款失败
  balanceTitle: '去结算',
  qrImg: '',
  isBalance: false,
}
export default state