import Axios from "axios"
const ajax = Axios.create({
  timeout: 10000,
  baseURL: 'localhost',
  transformRequest: [function (data) {
    data = JSON.stringify(data)
    return data
  }],
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  validateStatus: (status)=>{
    return status >= 200 && status < 300; 
  }
})
// 添加请求拦截器
Axios.interceptors.request.use((config)=>{
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