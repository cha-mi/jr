import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import RouteGuard from './RouteGuard'
import home from '../view/home'
import App from '../view/App';
import login from '../view/login'
import dyrouteTest from '../view/dyrouteTest'


/*
* path      映射路径
* component 组件对象
* anth      是否需要检验【登录状态、token】
* */
const routerConfig = [
    {
        path: '/',
        component: App,
        auth: false
    },
    {
        path:'/home',
        component:home,
        auth:true
    },
    {
        path:'/login',
        component:login,
        auth:false
    },
    //动态路由测试
    {
        path:'/dyrouteTest/:kms/:mbs',
        component:dyrouteTest,
        auth:false
    }
];



export default class Root extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router >
                <Switch>
                    <RouteGuard config={routerConfig}/>
                </Switch>
            </Router>
        )
    }
}
