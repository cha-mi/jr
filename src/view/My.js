import React, {Component} from 'react'
import {Icon} from 'antd'
import  axios from 'axios'
class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startx: 0,
            movex: 0,
            name: sessionStorage.getItem("username"),
            applyList:[],
            info:[]
        }
    }

    componentDidMount() {
        this.refs.perInfo.ontouchstart = (ev) => {
            ev.preventDefault()
            let touch = ev.targetTouches[0];
            this.setState({
                startx: touch.pageX
            })
        }
        this.refs.perInfo.ontouchmove = (ev) => {
            ev.preventDefault()
            let touch = ev.targetTouches[0];
            this.setState({
                movex: touch.pageX
            })
            let endx = Math.abs(this.state.startx - this.state.movex)
            if (endx > 100) {
                this.refs.perInfo.style.left = '100%'
                // this.refs.perInfo.style.display='none'
            }
        }


        this.refs.applyInfo.ontouchstart = (ev) => {
            ev.preventDefault()
            let touch = ev.targetTouches[0];
            this.setState({
                startx: touch.pageX
            })
        }
        this.refs.applyInfo.ontouchmove = (ev) => {
            ev.preventDefault()
            let touch = ev.targetTouches[0];
            this.setState({
                movex: touch.pageX
            })
            let endx = Math.abs(this.state.startx - this.state.movex)
            if (endx > 100) {
                this.refs.applyInfo.style.left = '100%'
                // this.refs.perInfo.style.display='none'
            }
        }
    }
    loginOut(){
        sessionStorage.removeItem("username")
        this.props.history.push({
            pathname:'/login'
        })
    }
    async showInfo() {
        this.refs.perInfo.style.left = '0'
        // axios.defaults.withCredentials=true
        let data = await axios({
            method:'post',
            url:'http://106.14.81.245:8080/getUserInfo',
            data:{
                username:this.state.name
            }
        })
        this.setState({
            info:data.data[0]
        })
        console.log(data)
        // this.refs.perInfo.style.display='block'
    }

    async getApply(){
        this.refs.applyInfo.style.left = '0'
        let data = await axios({
            method:'post',
            url:'http://106.14.81.245:8080/selectApply',
            data:{
                username:this.state.name
            }
        })
        this.setState({
            applyList:data.data
        })
        console.log(this.state.applyList)
    }
    render() {

        let styles = this.$style
        return (
            <div className={styles.my}>
                <div className={styles.head}>
                    <div className={styles.img}>
                        <img src={require('../assets/head.jpeg')} alt=""/>
                    </div>
                    <div className={styles.name}>{this.state.name}</div>
                </div>
                <ul className={styles.myList}>
                    <li onClick={this.showInfo.bind(this)}>
                        <Icon type="book" theme="twoTone" twoToneColor="#fbcc00"/> <span>个人信息</span>
                    </li>
                    <li onClick={this.getApply.bind(this)}>
                        <Icon type="carry-out" theme="twoTone" twoToneColor="#fbcc00"/> <span>我的订单</span>
                    </li>
                    <li>
                        <Icon type="phone" theme="twoTone" twoToneColor="#fbcc00"/> <span>联系我们</span>
                    </li>
                    <li>
                        <Icon type="smile" theme="twoTone" twoToneColor="#fbcc00"/> <span>关于我们</span>
                    </li>
                </ul>

                <div className={styles.perInfo} ref='perInfo'>
                    <ul>
                        <li>
                            <div>头像</div>
                            <div>
                                <img src={require('../assets/head.jpeg')} alt=""/>
                            </div>
                        </li>
                        <li>
                            <div>昵称</div>
                            <div>{this.state.info.username}</div>
                        </li>
                        <li>
                            <div>邮箱</div>
                            <div>{this.state.info.email}</div>
                        </li>
                        <li>
                            <div>出生年月</div>
                            <div>{this.state.info.date}</div>
                        </li>
                    </ul>

                    <div className={styles.loginOut} onClick={this.loginOut.bind(this)}>退出登录</div>
                </div>

                <div className={styles.applyInfo} ref='applyInfo'>
                    <ul>
                        {
                            this.state.applyList.map((item,index)=>{
                                return   <li key={index}>
                                    <div className={styles.min}>
                                        <div className={styles.products}>
                                            <span className={styles.tit}>申请产品：</span>
                                            <span>{item.product}</span>
                                        </div>
                                        <div className={styles.name}>
                                            <span className={styles.tit}>申请人：</span>
                                            <span>{item.man}</span>
                                        </div>
                                        <div className={styles.company}>
                                            <span className={styles.tit}>公司名称：</span>
                                            <span>{item.company}</span>
                                        </div>
                                        <div className={styles.city}>
                                            <span className={styles.tit}>地址：</span>
                                            <span>{item.city}</span>
                                        </div>
                                        <div className={styles.satue}>
                                            <span className={styles.tit}>状态：</span>
                                            <span>待审核</span>
                                        </div>
                                    </div>
                                </li>

                            })
                        }

                    </ul>

                </div>
            </div>
        );
    }

}

export default My