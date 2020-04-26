import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import Ajax from '@A/js/ajax.js'
import Iconfont from '@A/js/iconfont.js'
Iconfont
import Router from '@R/index'
import Store from '@S/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//挂载属性
Vue.use(ElementUI);
Vue.use(VueRouter); 

Vue.prototype.$ajax = Ajax

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router: Router,
  store: Store
}).$mount('#app')
