import React, {Component} from 'react';
import {Icon} from 'antd'
import {withRouter} from 'react-router-dom'
export default withRouter(class JrFooter extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state={
            arr:[
                {
                    type:'bank',
                    title:'首页',
                    path:'/home'
                },{
                    type:'apartment',
                    title:'产品',
                    path:'/product'
                },{
                    type:'branches',
                    title:'渠道产品',
                    path:'/channel'
                },{
                    type:'file-search',
                    title:'解决方案',
                    path:'/solve'
                },{
                    type:'user',
                    title:'我的',
                    path:'/my'
                },
            ]
        }
    }

    render() {
        let styles = this.$style
        return (
            <div className={styles.foot}>
                {this.state.arr.map((item,index)=>{
                    return <div key={index} className={styles.footList} style={{color:this.props.location.pathname===item.path?'#FBCC00':''}} onClick={()=>{
                        this.props.history.push({
                            pathname:item.path
                        })
                    }
                    }>
                        <Icon type={item.type} style={{
                            fontSize:'0.22rem',
                        }}/>
                        <p style={{
                            fontSize:'0.12rem',
                            marginBottom:'0'
                        }}>
                            {item.title}
                        </p>

                    </div>
                })}
            </div>
        )
    }
})