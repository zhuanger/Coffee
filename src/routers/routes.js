import Index from "@P/index/index"
import About from "@P/about/about"
let route = [
  {path: '/', redirect: '/index', name: 'index'},
  {path: '/index', component: Index},
  {path: '/about', component: About, name: 'about'},
]
export default route  