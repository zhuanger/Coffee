import Axios from "axios"
import Qs from 'qs';
const ajax = Axios.create({
  timeout: 10000,
  baseURL: 'http://127.0.0.1:3000',
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  validateStatus: (status)=>{
    return status >= 200 && status < 300; 
  }
})
// 添加请求拦截器
ajax.interceptors.request.use((config)=>{
  console.log('config', config);
  return config
}, (error) => {
  return Promise.reject(error);
});

// 添加响应拦截器
ajax.interceptors.response.use((response)=> {
  console.log('response:', response);
  if(response.status === 200){
    return response.data;
  }else{
    return Promise.reject(error);
  }
}, (error)=>{
  return Promise.reject(error); 
});

export default ajax