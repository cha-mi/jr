import React, {Component} from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import NotFound404 from '../view/NotFound404'
import {InspectionRules, RouteGuardIsStart_up} from './router'

class RouteGuard extends Component {
    componentWillMount() {
        React.Component.history = this.props.history;
    }
    render() {

        const {location, config} = this.props;
        const pathname = location.pathname;

        let isGetRoute;
        const target = config.find(function (item) {
            return ('/' + pathname.split('/')[1] === item.path.split('/:')[0] && pathname.split('/').length === item.path.split('/:').length + 1) || (isGetRoute = (pathname === item.path.split('/:')[0]))
        });
        if (!RouteGuardIsStart_up) {
            if (target) {
                return <Route exact path={isGetRoute ? pathname : target.path} component={target.component}/>
            } else return <NotFound404/>
        } else {
            if (target && !target.auth) {
                return <Route exact path={isGetRoute ? pathname : target.path} component={target.component}/>
            } else if (target && target.auth) {
                let next = () => {
                    return <Route exact path={isGetRoute ? pathname : target.path} component={target.component}/>
                }
                let Redir = (toTarget) => {
                    return <Redirect to={{pathname: toTarget, state: {beforeTo: target.path}}}/>
                }
                return InspectionRules(next, Redir)
            } else {
                return <NotFound404/>
            }
        }
    }
}
export default withRouter(RouteGuard)