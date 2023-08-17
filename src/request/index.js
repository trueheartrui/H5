import axios from "axios";
import { showFailToast, showLoadingToast } from 'vant';

// axios.defaults.baseURL = 'https://hrss-api.fat.wdeduc.com';
let loadingInstance = null
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log('====================================');
    console.log(config,'config');
    console.log('====================================');
    config.headers.token = localStorage.getItem('token')
    // 在发送请求之前做些什么
    if(config.showLoading){
        loadingInstance = showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            duration:0
        })
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('====================================');
    console.log(response,'response');
    console.log('====================================');
    if(response.config.showLoading){
        loadingInstance.close()
    }
    if(!response.data.success){
        showFailToast(response.data.message) 
        return Promise.resolve(response.data);
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export const api = {
    get:(url,config)=>{
        return axios.get(url,config)
    },
    post:(url,data,config)=>{
        return axios.post(url,data,config)
    }
} 