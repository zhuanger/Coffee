import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import Ajax from '@A/js/ajax.js'
import Router from '@R/index'
import Store from '@S/index'

//挂载属性
Vue.use(VueRouter); 

Vue.prototype.$ajax = Ajax

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router: Router,
  store: Store
}).$mount('#app')
