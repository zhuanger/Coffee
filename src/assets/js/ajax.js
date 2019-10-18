import Axios from "axios"
let axios = undefined;
const _init = function(){
  return Axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
const _post = function(...args){
  let {url, param} = args[0][0]
  return ajax.axios.post(url, param)
}
const _get = function(...args){
  let {url, param} = args[0][0]
  return ajax.axios.get(url, param)
}
const ajax = {
  axios: _init(),
  get(url, param){
    if(/(http|https):\/\/([\w.]+\/?)\S*/.exec(url)){
      url = url
      Object.assign(param,{headers: {}})
    }else{
      url = process.env.VUE_APP_BASEURL + url
    }
    return _get.call(this, [{url: url, param: param}])
  },
  post(url, param){   
    return _post.call(this, [{url: url,param: param}])
  },
}
export default ajax