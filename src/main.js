import Vue from 'vue'
import App from './App.vue'
import ajax from '@A/js/ajax.js'
ajax.post('dsdsdsadsada',{haha: '1'})
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
