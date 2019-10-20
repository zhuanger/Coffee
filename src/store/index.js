import Vuex from 'vuex'
import mutation from './mutation'
import state from './state'
const store = new Vuex.Store({
  mutation,
  state
})
export default store