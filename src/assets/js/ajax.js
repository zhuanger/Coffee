import Axios from "axios"
const ajax = Axios.create({
  timeout: 10000,
  baseURL: 'http://127.0.0.1:3000',
  transformRequest: [function (data) {
    console.log('data', data);
    data = JSON.stringify(data) || {}
    return data
  }],
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      // 'Content-Type': 'application/json;charset=utf-8'
    }
  },
  validateStatus: (status)=>{
    return status >= 200 && status < 300; 
  }
})
// 添加请求拦截器
Axios.interceptors.request.use((config)=>{
  console.log('config', config);
  return config
}, (error) => {
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use((response)=> {
  return response;
}, (error)=>{
  return Promise.reject(error); 
});

export default ajax