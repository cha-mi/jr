import React, {Component} from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import NotFound404 from '../view/NotFound404'
import {InspectionRules, RouteGuardIsStart_up} from './router'

class RouteGuard extends Component {
    componentWillMount() {
        React.Component.history = this.props.history;
    }
    componentWillReceiveProps(prop){
        // console.log(prop)
    }
    state = {
        asynchronous: null,
    }
    componentDidCatch(e){
        console.log(e)
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
                    console.log("next")
                    setTimeout(()=>{
                        this.setState({
                            asynchronous: <Route exact path={isGetRoute ? pathname : target.path}
                                                 component={target.component}/>
                        })
                    },0)

                }
                let Redir = (toTarget) => {
                    console.log("Redir")
                    setTimeout(()=>{
                        this.setState({
                            asynchronous: <Redirect to={{pathname: toTarget, state: {beforeTo: target.path}}}/>
                        })
                    },0)

                }
                if (!this.state.asynchronous) {
                    InspectionRules(next, Redir)
                }
                let ob = Object.assign({}, this.state.asynchronous ? this.state.asynchronous : <div>Loading</div>)
                this.state.asynchronous = null;
                return ob;
            } else {
                return <NotFound404/>
            }
        }
    }
}
export default withRouter(RouteGuard)