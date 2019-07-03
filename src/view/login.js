import React, {Component} from 'react'
import {Input, Button, message, Icon} from 'antd';
import axios from 'axios'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: '',
            password: '',
            loading: false,
        }
    }

    async telChange(e) {
        let val = e.target.value
        await this.setState({
            tel: val
        })
    }

    pswChange(e) {
        let val = e.target.value
        this.setState({
            password: val
        })
    }

    async login() {
        this.setState({
            loading: true,
        })
        let data = await axios({
            method: 'post',
            url: 'http://106.14.81.245:8080/loginRegister/login',
            data: {
                tel: this.state.tel,
                password: this.state.password
            }
        })
        console.log(data)
        this.setState({
            loading: false
        })
        if (data.data) {
            message.info('登录成功')
            // sessionStorage.setItem("username", this.state.tel)
            sessionStorage.setItem("username", data.data)
            this.props.history.push({
                pathname: 'my'
            })
        } else {
            message.info('账号或密码出现错误')
            // this.props.history.push({
            //   pathname: "/login",
            //   state: {fromDashboard: true}
            // })
        }
    }

    render() {
        let styles = this.$style
        return (
            <div className={styles.login}>
                <header>
                    <Icon type="left" style={{
                        position:'fixed',
                        top:'0',
                        left:'0.15rem',
                        height:'0.43rem',
                        display:'flex',
                        alignItems:'center'
                    }} onClick={()=>{
                        this.props.history.go(-1)
                    }}
                    />
                    登录
                </header>
                <div className={styles.inp}>
                    <Input size="large" placeholder="请输入手机号码/邮箱/用户名" allowClear value={this.state.tel}
                           onChange={this.telChange.bind(this)}/>
                    <Input.Password size="large" placeholder="请输入密码" onChange={this.pswChange.bind(this)}
                                    style={{marginTop: '0.2rem'}}/>
                    <div style={{
                        marginTop: '0.2rem',
                        // display:'flex',
                        // justifyContent:'space-around'
                    }}>
                        <Button type="primary" loading={this.state.loading} onClick={this.login.bind(this)} style={{
                            width: '100%',
                            height: '0.35rem',
                            background: '#FBCC00',
                            borderColor: '#FBCC00',
                            color: '#fff'
                        }}>
                            点击登录
                        </Button><br/><br/>
                        <Button type="primary" onClick={() => {
                            this.props.history.push({
                                pathname: '/register'
                            })
                        }} style={{
                            width: '100%',
                            height: '0.35rem',
                            background: '#fff',
                            borderColor: '#FBCC00',
                            color: '#FBCC00',
                            textShadow: 'none'
                        }}>
                            去注册
                        </Button>
                    </div>
                </div>

            </div>
        );
    }

}
