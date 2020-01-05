const mutations = {
  SET_LOGIN(state, payload){
    state.hasLogin = payload;
  },
  SET_SEARCH(state, payload){
    state.search = payload;
  }
}
export default mutations