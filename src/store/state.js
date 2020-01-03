const state = {
  hasLogin: localStorage.getItem('userInfo') ? true : false,
}
export default state