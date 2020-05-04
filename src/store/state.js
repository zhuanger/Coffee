const state = {//所有页面的变量
  hasLogin: localStorage.getItem('userInfo') ? true : false,//判断登陆状态
  search: '', //搜索内容

  cartItem: [], //购物车
  balanceStatus: 1, // 1: 未结算  2: 待付款 3：已经结算  4： 付款失败
  balanceTitle: '去结算',
  qrImg: '',
  isBalance: false,
  orderId: -1,
  searchClickParams: ''
}
export default state