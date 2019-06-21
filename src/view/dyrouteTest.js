import React,{Component} from 'react';
export default class dyrouteTest extends Component
{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        console.log('我是动态路由测试',this)
    }
    render() {
        return(
            <div>
                动态路由测试
            </div>
        )
    }
}