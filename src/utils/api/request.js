import axios from 'axios';
import { useUserStore } from '../../store/user';
//1. 创建axios对象
const service = axios.create();

//2. 请求拦截器
service.interceptors.request.use(config => {
    const userStore = useUserStore()
    let token = userStore.token
    // token 存在 ，这个头部字段用于在客户端向服务器发送请求时传递身份验证信息。
    if (token) {
        config.headers['Authorization'] = token
    }


    return config
}, error => {
    Promise.reject(error);
});

//3. 响应拦截器
service.interceptors.response.use(response => {
    //判断code码
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default service;