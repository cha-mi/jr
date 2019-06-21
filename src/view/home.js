import React,{Component} from 'react';
export default class home extends Component
{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        console.log('~~~~~~~~~~~')
        console.log('我是"/home"',this)
    }
    render() {
        return(
            <div>我是首页</div>
        )
    }
}