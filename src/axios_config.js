import axios from 'axios'
import {store,action} from './store/store'

//是否启动axios拦截器
let instanceIsStart_up = true

//测试403跳转
// setTimeout(function () {
//     ToLogin();
// },3000)

/*跳至登录页*/
function ToLogin() {
    let beforeTo =store.getState().history.location.pathname;
    store.getState().history.replace({pathname:'/login',state:{beforeTo}})
    /*重定向至登录页，同时绑定state.beforeTo(跳转前页面路径)*/
}

//所有请求错误处理（status 请求的状态码,other 响应对象）
const reqErr =(status,other)=>{
    switch (status)
    {
        /*403 token过期--清理仓库状态信息，1秒后重定向至login*/
        case 403:{
            Cookie.removeCookie('token','/');
            store.dispatch( action.ChangeState(function (store) {
                store.token = null;
                store.isLogin=false;
                store.username=null;
            }));
            setTimeout(() => {
                ToLogin();
            }, 1000);
            break}
        /*404 请求不存在*/
        case 404:{
            setTimeout(() => {
                store.getState().history.push('/404')
            }, 1000);
            console.log('请求资源不存在');
            break
        }
        /*其他*/
        default:
            console.log(other);
    }
};

//创建实例，timeout是请求时长
let instance =axios.create({
    timeout:10000,
    /*设置全局请求接口‘/’的前面参数*/
    // baseURL: ''
});

//跨域是否可带自定义属性
// instance.defaults.withCredentials = false

// common指【全部类型】请求头添加自定义属性
// instance.defaults.headers.common['token'] = 'JousenZhou';//common设置所有类型请求头


/*设置post请求头Content-Type为application/json;charset=UTF-8*/
// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'


/*~~~~~~~~设置支持并发*/
instance.spread=axios.spread;
instance.all=axios.all;


if(!instanceIsStart_up){}
else {
    /*设置请求拦截器*/
    instance.interceptors.request.use(
        config=>{
            //请求头添加~token~
            if(Cookie.getCookie('token')) {
                config.headers.Authorization = Cookie.getCookie('token')
            }
            return config;
        },
        error => {
            Promise.error(error)
        })

    /*设置响应拦截器*/
    instance.interceptors.response.use(
        res=>{
            return res;
        },
        error => {
            const { response } = error;
            if (response) {
                // 接受错误状态码
                reqErr(response.status, response);//status是状态码，/response.data.message
                return Promise.reject(response);
            } else
            {
                // 处理断网的情况（请求超时，或者断网）
            }
        });


}

/*Cookie封装*/
const Cookie = {
    setCookie : function(name,value,data,path){
        var str = `${name}=${value}`;
        if(data){
            str += `; expires=${data.toUTCString()}`;
        }
        if(path){
            str += `; path=${path}`;
        }
        document.cookie = str;
    },
    getCookie : function(name){
        var cookieArr = document.cookie.split("; ");
        var res = "";
        cookieArr.forEach(function(item){
            var arr = item.split("=");
            if(arr[0] === name){
                res = arr[1];
            }
        })
        return res;
    },
    removeCookie : function(name,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        this.setCookie(name,"",d,path)
    },
    getCookitToArray:function (name) {
        var array=[];
        array=this.getCookie(name)?this.getCookie(name):[];
        if(typeof array==='string') {
            array = JSON.parse(array);
        }
        return array;
    }
}

/*LocalStorage封装*/
const LocalStorage={
    set:function (name,value) {
        window.localStorage.setItem(name,value);
    },
    get:function (name) {
        return  localStorage.getItem(name);
    },
    remove:function (name) {
        window.localStorage.removeItem(name);
    },
    getToArray:function (name) {
        var array=[];
        array=window.localStorage.getItem(name)?window.localStorage.getItem(name):[];
        if(typeof array==='string') {
            array = JSON.parse(array);
        }
        return array;
    }
}

export {Cookie,instance,LocalStorage};