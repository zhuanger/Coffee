const state = {
  hasLogin: localStorage.getItem('userInfo') ? true : false,
  search: '', //搜索内容
}
export default state