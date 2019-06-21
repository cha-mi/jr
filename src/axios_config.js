import axios from 'axios'


/*Cookie封装*/
var Cookie = {
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
var LocalStorage={
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

//跳转登录页
/*Tologin                           这个方法目的在于跳转登录页，登录完成后直接回到跳转前页面 */
const Tologin=()=>{

}

//所有请求错误处理（status 请求的状态码,other 附加信息）
const reqErr =(status,other)=>{
    switch (status)
    {
        /*401未登录状态*/
        case 401:{
            Tologin();
            break
        }
        /*403 token过期*/
        case 403:{
            Cookie.removeCookie('token','/')
            // store.commit('isLogin', null);         //仓库登录验证处理为空
            setTimeout(() => {
                Tologin();
            }, 1000);
            break}
        /*404 请求不存在*/
        case 404:{
            console.log('请求资源不存在')
            break}
        default:
            console.log(other);

    }
}

//创建实例，timeout是请求时长
let instance =axios.create({timeout:12000});
// instance.defaults.headers.common['Zjh'] = 'JousenZhou';//common设置所有类型请求头
/*设置post请求头Content-Type-UTF-8*/
// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

/*~~~~~~~~设置支持并发*/
instance.spread=axios.spread;
instance.all=axios.all;

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
        const { response } = error
        if (response) {
            // 接受错误状态码
             reqErr(response.status, response.data.message);//status是状态码，data.message
             return Promise.reject(response);
        } else
            {
            // 处理断网的情况（请求超时，或者断网）
        }
    })

export {Cookie,instance,LocalStorage};