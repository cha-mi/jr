import React from 'react';
import ReactDOM from 'react-dom';
import Root from './router/router'
import { Provider } from 'react-redux';
import {store} from './store/store'
import {Cookie,instance,LocalStorage} from './axios_config'
import './assets/base.css';
import style from './assets/default.module.sass'

/* npm install node-sass -D 引入sass支持*/

React.Component.prototype.$aixos = instance;
React.Component.prototype.$cookie = Cookie;
React.Component.prototype.$localStorage = LocalStorage;
//全局样式
React.Component.prototype.$style=style;


ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>
    , document.getElementById('root'));

