import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import RouteGuard from './RouteGuard'
import home from '../view/home'
import App from '../view/App';
import login from '../view/login'
import dyrouteTest from '../view/dyrouteTest'
import Register from '../view/Register'
import JrHeader from '../view/component/JrHeader'
import JrFooter from '../view/component/JrFooter'
import My from '../view/My'
import Product from '../view/Product'
import Solve from '../view/Solve'
import Channel from '../view/Channel'
import Apply from '../view/Apply'
/*
* path      映射路径
* component 组件对象
* anth      是否需要检验
* */
const routerConfig = [
    {
        path: '/',
        component: App,
        auth: false
    },
    {
        path: '/home',
        component: home,
        auth: false
    },
    {
        path: '/login',
        component: login,
        auth: false
    },
    {
        path: '/register',
        component: Register,
        auth: false
    },{
        path: '/my',
        component: My,
        auth: false
    },{
        path: '/product',
        component: Product,
        auth: false
    },{
        path: '/channel',
        component: Channel,
        auth: false
    },{
        path: '/solve',
        component: Solve,
        auth: false
    },{
        path: '/apply',
        component: Apply,
        auth: false
    },
    //动态路由测试
    {
        path: '/dyrouteTest/:kms/:mbs',
        component: dyrouteTest,
        auth: false
    },
];

/*是否开启路由拦截器 */
const RouteGuardIsStart_up = true;


//路由拦截(检验)规则 只适用组件属性anth=true
/*     return next()允许跳转
*      return Redirect(tolocation)重定向
*      参数tolocation为目标地址如 ==>[ return Redirect('/login')]重定向至登录页
*       ！注意：如果[思维逻辑混乱]会出现无限重定向，一定姚想好再写，就是重定向后会不会再重定向的问题。
*       ! 记得需要return返回出去
* */
const InspectionRules = (next, Redirect) => {
    /*案例：Math.random()代替登录状态或者token模拟*/
    if (Math.random() > 0.5) {
        // console.log('通过验证')
        return next();
    } else {
        // console.log('验证失败')
        return Redirect('/login')
    }
}


class Root extends Component {
    render() {
        return (
                <Router>
                    <JrHeader/>
                    <Switch>
                        <RouteGuard config={routerConfig}/>
                    </Switch>
                    <JrFooter/>
                </Router>

        )
    }
}

export {Root, RouteGuardIsStart_up, InspectionRules}
