import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import RouteGuard from './RouteGuard'
import Home from '../view/App';
const routerConfig = [
    {
        path: '/',
        component: Home,
        auth: false
    }
]
class Root extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router >
                <Switch>
                    <RouteGuard config={routerConfig} />
                </Switch>
            </Router>
        )
    }
}

export {Root}