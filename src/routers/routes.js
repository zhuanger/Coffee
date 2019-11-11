import Index from "@P/index/index"
import Detail from "@P/index/detail"
import About from "@P/about/about"
import Activity from "@P/activity/activity"
import Login from "@P/login/login"
import Order from "@P/order/order"
import Home from "@P/home/home"
let route = [
  {path: '/', redirect: '/index', name: 'index'},
  {path: '/index', component: Index},
  {path: '/about', component: About, name: 'about'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/activity', component: Activity, name: 'activity'},
  {path: '/detail', component: Detail, name: 'detail'},
  {path: '/home', component: Home, name: 'home'},
  {path: '/order', component: Order, name: 'order'},
]
export default route  