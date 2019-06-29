import React, {Component} from 'react';

export default class NotFound404 extends Component
{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div style={{
                fontSize:'0.3rem',
                fontWeight:'bolder',
                marginTop:'0.42rem'
            }}>
                <p>404</p>
                <p>请求资源不存在~~~</p>
            </div>
        )
    }
}