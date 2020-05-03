import Index from "@P/index/index"
import PageOne from "@P/index/page-one"
import PageTwo from "@P/index/page-two"
import Detail from "@P/index/detail"
import About from "@P/about/about"
import Activity from "@P/activity/activity"
import Page from "@P/activity/page"
import PageTwos from "@P/activity/page2"
import PageThree from "@P/activity/page3"
import PageFour from "@P/activity/page4"
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
  {path: '/pageOne', component: PageOne, name: 'pageOne'},
  {path: '/pageTwo', component: PageTwo, name: 'PpageTwo'},
  {path: '/pageTwos', component: PageTwos, name: 'PpageTwos'},
  {path: '/pageThree', component: PageThree, name: 'PageThree'},
  {path: '/pageFour', component: PageFour, name: 'PageFour'},
]
export default route  