import Index from "@P/index/index"
import Detail from "@P/index/detail"
import About from "@P/about/about"
import Activity from "@P/activity/activity"
import Page from "@P/activity/page"
import Login from "@P/login/login"
import Order from "@P/order/order"
import Home from "@P/home/home"
import Search from "@P/search/search"
let route = [
  {path: '/', redirect: '/index', name: 'index'},
  {path: '/index', component: Index},
  {path: '/about', component: About, name: 'about'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/activity', component: Activity, name: 'activity'},
  {path: '/detail', component: Detail, name: 'detail'},
  {path: '/home', component: Home, name: 'home'},
  {path: '/order', component: Order, name: 'order'},
  {path: '/search', component: Search, name: 'search'},
  {path: '/page', component: Page, name: 'page'},
]
export default route  