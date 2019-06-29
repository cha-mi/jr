import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Icon} from 'antd'

class JrHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    hideMenu(e) {
        this.refs.leftMenu.style.left = '-40%'
        e.target.style.display = 'none'
    }

    showMenu() {
        this.refs.leftMenu.style.left = '0'
        this.refs.mark.style.display = 'block'
    }

    render() {
        let styles = this.$style
        const brands = [
            {
                type: 'bank',
                title: '首页',
                path:'home'
            },
            {
                type: 'apartment',
                title: '产品',
                path:'product'
            }, {
                type: 'branches',
                title: '渠道产品',
                path:'channel'
            }, {
                type: 'file-search',
                title: '解决方案',
                path:'solve',
            }, {
                type: 'inbox',
                title: '案例',
                path:'/'
            }, {
                type: 'question',
                title: '帮助',
                path:'/'
            }, {
                type: 'rise',
                title: '合作',
                path:'/'
            }, {
                type: 'container',
                title: '文档',
                path:'/'
            }, {
                type: 'fire',
                title: '服务支持',
                path:'/'
            }, {
                type: 'meh',
                title: '关于我们',
                path:'/'
            },
        ]
        return (
            <div
                style={{display: this.props.location.pathname.split('/')[1] === 'login' || this.props.location.pathname.split('/')[1] === 'register' || this.props.location.pathname.split('/')[1] === 'apply' ? 'none' : 'block'}}>
                <div className={styles.header}>
                    <div className={styles.top}>
                        <Icon type="align-left" style={{color: 'white', fontSize: '0.20rem'}}
                              onClick={this.showMenu.bind(this)}/>
                        <img src={require("../../assets/logo.png")} alt="这是logo" onClick={()=>{
                            this.props.history.push({
                                pathname:'home'
                            })
                        }}/>
                        <Icon type="user" style={{color: 'white', fontSize: '0.20rem'}} onClick={()=>{
                            this.props.history.push({
                                pathname:'my'
                            })
                        }}/>
                    </div>
                    <div className={styles.leftMain} ref='leftMenu'>
                        <ul>
                            {
                                brands.map((item, index) => {
                                    return <li key={index} onClick={()=>{
                                            this.props.history.push({
                                                pathname:item.path
                                            })
                                        this.refs.leftMenu.style.left = '-40%'
                                        this.refs.mark.style.display = 'none'
                                    }
                                    }>
                                        <Icon type={item.type}
                                              style={{marginRight: '0.1rem', marginBottom: '0.15rem'}}/> {item.title}
                                    </li>
                                })
                            }

                        </ul>
                    </div>
                    <div className={styles.cover} onClick={this.hideMenu.bind(this)} ref='mark'></div>
                </div>
            </div>
        );
    }


}

export default withRouter(JrHeader)