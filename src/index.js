import React from 'react';
import ReactDOM from 'react-dom';
import {Root} from './router/router'
import { Provider } from 'react-redux';
import {store} from './store/store'
import {Cookie,instance,LocalStorage} from './axios_config'
import './index.css';

React.Component.prototype.$aixos = instance;
React.Component.prototype.$cookie = Cookie;
React.Component.prototype.$localStorage = LocalStorage;



ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>
    , document.getElementById('root'));

