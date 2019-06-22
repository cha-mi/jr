import React, {Component} from 'react';

export default class NotFound404 extends Component
{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div>
                <p>404</p>
                <p>请求资源不存在</p>
            </div>
        )
    }
}