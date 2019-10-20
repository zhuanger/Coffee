import Vue from 'vue'
import Vuex from 'vuex'
import mutation from './mutation'
import state from './state'
Vue.use(Vuex); 
const store = new Vuex.Store({
  mutation,
  state
})
export default store