import React,{Component} from 'react';
export default class login extends Component
{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        console.log('~~~~~~~~~~~')
        console.log('我是登录页"/login"',this)
    }
    render() {
        return(
            <div>
                我是登录页
            </div>
        )
    }
}