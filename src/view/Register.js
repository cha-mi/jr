import React, {Component} from 'react'
import {Input, Tooltip, Button, message, Icon, DatePicker, AutoComplete} from 'antd';
import axios from 'axios'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: '',
            username: '',
            password: '',
            email: '',
            date: '',
            tip: "请输入11位的手机号码",
            userTip: '请输入用户名',
            pswTip: '请输入密码',
            emailTip:'请输入正确邮箱地址',
            loading: false,
            // telState: false,
            result: [],
            bool: []
        }
        this.timer = null
    }


    async telChange(e) {

        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        let val = e.target.value
        await this.setState({
            tel: val
        })
        if (reg.test(this.state.tel.trim())) {

            clearInterval(this.timer)
            this.timer = setTimeout(async () => {
                let data = await axios({
                    method: 'post',
                    url: 'http://106.14.81.245:8080/loginRegister/verifyRegister',
                    data: {
                        verify: this.state.tel
                    }
                })
                if (data.data) {
                    this.setState({
                        tip: '',
                    })
                    this.refs.tels.input.style.borderColor = 'rgb(217, 217, 217)'
                    this.state.bool[0]=1
                } else {
                    this.setState({
                        tip: '该手机号码已经被注册',
                    })
                    this.refs.tels.input.style.borderColor = 'red'
                    this.state.bool[0]=0

                }
                // console.log(data.data)
            }, 800)
        } else {
            this.setState({
                tip: '请输入11位的手机号码',
            })
            this.refs.tels.input.style.borderColor = 'red'
            this.state.bool[0]=0

        }
    }

    userChange(e) {
        let val = e.target.value
        if (val.trim()){
            this.setState({
                username: val
            })
            clearInterval(this.timer)
            this.timer = setTimeout(async () => {
                let data = await axios({
                    method: 'post',
                    url: 'http://106.14.81.245:8080/loginRegister/verifyRegister',
                    data: {
                        verify: this.state.username
                    }
                })
                if (data.data) {
                    this.setState({
                        userTip: '',
                    })
                    this.refs.users.input.style.borderColor = 'rgb(217, 217, 217)'
                    this.state.bool[1]=1

                } else {
                    this.setState({
                        userTip: '该用户名已经被注册',
                    })
                    this.refs.users.input.style.borderColor = 'red'
                    this.state.bool[1]=0

                }
            }, 800)
        } else {
            this.setState({
                userTip: '该用户名已经被注册',
            })
            this.refs.users.input.style.borderColor = 'red'
            this.state.bool[1]=0

        }

    }

    pswChange(e) {
        let val = e.target.value
        if (val.trim()) {
            this.setState({
                password: val,
                pswTip: ''
            })
            // this.refs.psws.input.style.borderColor = 'rgb(217, 217, 217)'
            this.state.bool[2]=1

        } else {
            this.setState({
                pswTip: '请输入密码'
            })
            // this.refs.psws.input.style.borderColor = 'red'
            this.state.bool[2]=0

        }


    }

    async emailChange(val) {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        console.log(reg.test(val.trim()))
        if (reg.test(val.trim())) {
            clearInterval(this.timer)
           await this.setState({
                email:val
            })
            console.log(this.state.email)
            this.timer = setTimeout(async () => {
                let data = await axios({
                    method: 'post',
                    url: 'http://106.14.81.245:8080/loginRegister/verifyRegister',
                    data: {
                        verify: this.state.email
                    }
                })
                console.log(data.data)
                if (data.data) {
                    this.setState({
                        emailTip: '',
                    })
                    this.state.bool[3]=1

                } else {
                    this.setState({
                        emailTip: '该邮箱地址已经被注册',
                    })
                    this.state.bool[3]=0

                }
                // console.log(data.data)
            }, 800)
        } else {
            this.setState({
                pswTip: '请输入正确的邮箱地址'
            })
            this.state.bool[3]=0

        }
    }

    dateChange(date, datestring) {
        if (datestring.trim()){
            this.setState({
                date: datestring
            })
        }
        this.state.bool[4]=1

    }

    handleSearch = value => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com', 'outlook.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({result});
    }

    async reg() {
        console.log(this.state.bool)
        let res = this.state.bool.reduce((item,temp)=>{
            return temp + item
        })
        if (res===5) {
            this.setState({
                loading: true,
            })
            let data = await axios({
                method: 'post',
                url: 'http://106.14.81.245:8080/loginRegister/register',
                data: {
                    tel: this.state.tel,
                    username: this.state.username,
                    email: this.state.email,
                    date: this.state.date,
                    password: this.state.password,

                }
            })
            this.setState({
                loading: false
            })
            console.log(data)
            if (data.data) {
                message.info('注册成功')
                this.props.history.push({
                    pathname:'login'
                })
            } else {
                message.info('注册失败')
            }
        } else {
            message.info('请按要求输入完整')
        }

    }


    render() {
        let styles = this.$style
        const {result} = this.state;
        const {Option} = AutoComplete
        const children = result.map(email => <Option key={email}>{email}</Option>);
        return (
            <div className={styles.register}>
                <header>
                    <Icon type="left" style={{
                        position: 'fixed',
                        top: '0',
                        left: '0.15rem',
                        height: '0.43rem',
                        display: 'flex',
                        alignItems: 'center'
                    }} onClick={() => {
                        this.props.history.go(-1)
                    }}/>
                    注册
                </header>
                <div className={styles.inp}>
                    <Tooltip placement="topLeft" title={this.state.tip}>
                        <Input size="large" placeholder="请输入手机号码" allowClear value={this.state.tel}
                               onChange={this.telChange.bind(this)} ref='tels'/>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={this.state.userTip}>
                        <Input size="large" placeholder="请输入用户名" allowClear onChange={this.userChange.bind(this)}
                               style={{marginTop: '0.2rem'}} ref='users'/>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={this.state.emailTip}>
                        <AutoComplete onSearch={this.handleSearch} size="large" placeholder="请输入邮箱地址" allowClear
                                      onChange={this.emailChange.bind(this)}
                                      style={{marginTop: '0.2rem', width: '100%'}} ref='emails'>
                            {children}
                        </AutoComplete>
                    </Tooltip>

                    <DatePicker size="large" style={{marginTop: '0.2rem', width: '100%'}}
                                onChange={this.dateChange.bind(this)} placeholder='生日'/>
                    <Tooltip placement="topLeft" title={this.state.pswTip}>
                        <Input.Password size="large" placeholder="请输入密码" onChange={this.pswChange.bind(this)}
                                        style={{marginTop: '0.2rem'}} ref='psws'/>
                    </Tooltip>

                    <div style={{
                        marginTop: '0.2rem',
                    }}>
                        <Button type="primary" loading={this.state.loading} onClick={this.reg.bind(this)} style={{
                            width: '100%',
                            height: '0.35rem',
                            background: '#FBCC00',
                            borderColor: '#FBCC00',
                            color: '#fff',
                            textShadow: 'none'
                        }}>
                            点击注册
                        </Button><br/><br/>
                        <Button type="primary" onClick={() => {
                            this.props.history.push({
                                pathname: '/login'
                            })
                        }} style={{
                            width: '100%',
                            height: '0.35rem',
                            background: '#fff',
                            borderColor: '#FBCC00',
                            color: '#FBCC00',
                            textShadow: 'none'
                        }}>
                            去登录
                        </Button>
                    </div>
                </div>

            </div>
        );
    }

}
