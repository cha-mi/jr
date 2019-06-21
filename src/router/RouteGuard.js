import React,{Component} from 'react';
import { Route,Redirect } from 'react-router-dom';
//Redirect 重定向
export default class RouteGuard extends Component
{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    // //组件初始化时调用、拦截路由
    // componentWillMount(){
    // }
    // componentDidMount(): void {
    //     console.log(this)
    // }

    render() {
        // console.log(this.props)
        const {location,config} = this.props;
        const pathname=location.pathname;
        // console.log('config',config)
        // console.log('location',location)
        // console.log(config[1].path.split('/:')[0])
       // console.log('pathname',pathname='/'+pathname.split('/')[0])
        const target=config.find(function (item) {
            return '/'+pathname.split('/')[1]===item.path.split('/:')[0];
        })
        // return <Route exact path={config[1].path}  component={config[1].component}/>
        /*假设当前登录检验失败
        * */
        let isLogin=false;   //登录检验
        let Cookie = '888';  //cookie检验
        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        // console.log(target)
        //检测 已经登录||不需要检查
        if(target&&(isLogin||!target.auth))
        {
            if(isLogin){console.log('已经登录')}
            if(!target.auth){console.log('不需要检查')}
            console.log(pathname)
            return <Route exact path={target.path}  component={target.component}/>
        }
        //检测  是否有Token
        else if(target && Cookie.length!==0)
        {
            console.log('有Token')
            //通过直接跳
            //axios操作
            //不通过跳登录
            /**/
            if(Math.random()>0.5)
            {
                console.log('Token通过验证')
                return <Route exact path={target.path} component={target.component}/>
            }
            else{
                console.log('Token验证失败')
                return <Redirect to='/login' />
            }
        }
        else
        {   /*还有首页判断*/
            /*
            *
            */
            console.log('直接跳登录')//404吧
            return <Redirect to='/login' />
        }
    }
}

