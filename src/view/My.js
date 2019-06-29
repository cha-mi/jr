import React, {Component} from 'react'
import {Icon} from 'antd'

class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startx:0,
            movex:0
        }
    }
    componentDidMount(){
        this.refs.perInfo.ontouchstart= (ev)=> {
            let touch = ev.targetTouches[0];
            this.setState({
                startx:touch.pageX
            })
        }
        this.refs.perInfo.ontouchmove= (ev)=> {
            let touch = ev.targetTouches[0];
            this.setState({
                movex:touch.pageX
            })
            let endx =  Math.abs(this.state.startx-this.state.movex)
            if (endx>100) {
                this.refs.perInfo.style.left='100%'
                // this.refs.perInfo.style.display='none'
            }
        }

    }
    showInfo(){
        this.refs.perInfo.style.left='0'
        // this.refs.perInfo.style.display='block'
    }
    render() {

        let styles = this.$style
        return (
            <div className={styles.my}>
                <div className={styles.head}>
                    <div className={styles.img}>
                        <img src={require('../assets/head.jpeg')} alt=""/>
                    </div>
                    <div className={styles.name}>汕头吴彦祖</div>
                </div>
                <ul className={styles.myList}>
                    <li onClick={this.showInfo.bind(this)}>
                        <Icon type="book" theme="twoTone" twoToneColor="#fbcc00"/> <span>个人信息</span>
                    </li>
                    <li>
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
                            <div>汕头吴彦祖</div>
                        </li>
                        <li>
                            <div>邮箱</div>
                            <div>111@qq.com</div>
                        </li>
                        <li>
                            <div>出生年月</div>
                            <div>2019/06/28</div>
                        </li>
                    </ul>

                    <div className={styles.loginOut}>退出登录</div>
                </div>
            </div>
        );
    }

}

export default My