import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {action} from "../store/store";
import _404 from '../view/_404'

//Redirect 重定向
class RouteGuard extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    /*用于拦截第一次进来修改仓库触发update生命周期*/
    state = {
        firstLoad: false,
        //是否启动路由守卫拦截器
        RouteGuardIsStart_up: true
    };

    componentWillMount() {
        this.props.ChangeState(store => {
            store.history = this.props.history;
        })
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.firstLoad = true   //不触发更新视图
        console.log('~~~~~~~~~~~~~~~~~~~');
        console.log('我是路由守卫', this)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        /*拦截*/
        if (this.state.firstLoad) {// eslint-disable-next-line react/no-direct-mutation-state
            this.state.firstLoad = false
            return false
        }
        return true
    }

    render() {

        let {isLogin} = this.props.store;

        // let  Cookie=this.$cookie.getCookie('token');
        let Cookie = '666'

        const {location, config} = this.props;
        const pathname = location.pathname;
        // console.log(pathname.split('/'),pathname.split('/').length)
        /*解决动态路由参数问题（pathname.split('/').length===item.path.split('/:').length+1）*/
        const target = config.find(function (item) {
            return '/' + pathname.split('/')[1] === item.path.split('/:')[0] && pathname.split('/').length === item.path.split('/:').length + 1
        });
        // console.log(target.path.split('/:'))

        if (!this.state.RouteGuardIsStart_up) {
            return <Route exact path={target.path} component={target.component}/>
        } else {
            //检测  已经登录||不需要检验
            if (target && (isLogin || !target.auth)) {
                if (isLogin) {
                    console.log('已经登录')
                }
                if (!target.auth) {
                    console.log('不需要检验', '跳转至"', pathname, '"')
                }
                return <Route exact path={target.path} component={target.component}/>
            }
            //检测  是否有Token
            else if (target && Cookie.length !== 0) {
                console.log('存在Token')

                /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                /*这里是模拟token检验*/
                if (Math.random() > 0.5) {
                    console.log('Token通过验证')
                    return <Route exact path={target.path} component={target.component}/>
                } else {
                    console.log('Token验证失败', '重定向到登录页')
                    // return <Redirect to='/login' />
                    return <Redirect to={{
                        pathname: "/login",
                        state: {beforeTo: target.path}
                    }}/>
                }
                /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

            }
            //检测  target-Undefined
            else {
                console.log('404,资源不存在')
                // eslint-disable-next-line react/jsx-pascal-case
                return <_404/>
            }
        }

    }
}

const mapStateToProps = (store) => {
    return {store}
};
export default withRouter(connect(mapStateToProps, action)(RouteGuard))