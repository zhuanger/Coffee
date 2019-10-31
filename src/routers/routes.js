import Index from "@P/index/index"
import About from "@P/about/about"
import Activity from "@P/activity/activity"
let route = [
  {path: '/', redirect: '/index', name: 'index'},
  {path: '/index', component: Index},
  {path: '/about', component: About, name: 'about'},
  {path: '/activity', component: Activity, name: 'activity'},
]
export default route  