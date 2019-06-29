import React, {Component} from 'react'
import {Input, Tooltip, Button, message, Icon,DatePicker,AutoComplete} from 'antd';
import axios from 'axios'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: '',
            username: '',
            password: '',
            email: '',
            date:'',
            tip: "请输入11位的手机号码",
            loading: false,
            telState: false,
            result: [],
        }

    }

    async telChange(e) {

        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        let val = e.target.value
        await this.setState({
            tel: val
        })
        if (reg.test(this.state.tel)) {
            this.setState({
                tip: '',
                telState: true
            })
        } else {
            this.setState({
                tip: '请输入11位的手机号码',
                telState: false
            })
        }
    }

    userChange(e) {
        let val = e.target.value
        this.setState({
            username: val
        })
    }

    pswChange(e) {
        let val = e.target.value
        this.setState({
            password: val
        })
    }

    emailChange(val) {
        this.setState({
            email: val
        })
    }
    dateChange(date,datestring){
        this.setState({
            date:datestring
        })
    }
    handleSearch = value => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com','outlook.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    }
    async reg() {
        if (this.state.telState) {
            this.setState({
                loading: true,
            })
            let data = await axios({
                method: 'post',
                url: 'http://localhost:8080/loginRegister/register',
                data: {
                    tel: this.state.tel,
                    username: this.state.username,
                    email:this.state.email,
                    date:this.state.date,
                    password: this.state.password,

                }
            })
            this.setState({
                loading: false
            })
            if (data.data.state === 0) {
                message.info(data.data.msg)
            } else if (data.data.state === 1) {
                message.info(data.data.msg)
                this.props.history.push({
                    pathname: "/login",
                    state: {fromDashboard: true}
                })
            } else if (data.data.state === 2) {
                message.info(data.data.msg)
            }
        } else {
            message.info('请按要求输入完整')
        }

    }

    async verify(e){
        // console.log(e.target.value)
        let data = await axios({
            methods:'post',
            url:'http://localhost:8080/loginRegister/verifyRegister',
            data:{
                verify:e.target.value
            }
        })
        console.log(data)
    }
    render() {
        let styles = this.$style
        const { result } = this.state;
        const { Option } = AutoComplete
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
                               onChange={this.telChange.bind(this)} onBlur={this.verify.bind(this)}/>
                    </Tooltip>
                    <Input size="large" placeholder="请输入用户名" allowClear onChange={this.userChange.bind(this)}
                           style={{marginTop: '0.2rem'}}/>

                    <AutoComplete onSearch={this.handleSearch} size="large" placeholder="请输入邮箱地址" allowClear onChange={this.emailChange.bind(this)}
                                  style={{marginTop: '0.2rem',width:'100%'}}>
                        {children}
                    </AutoComplete>
                    <DatePicker size="large" style={{marginTop: '0.2rem',width:'100%'}} onChange={this.dateChange.bind(this)} placeholder='生日'/>
                    <Input.Password size="large" placeholder="请输入密码" onChange={this.pswChange.bind(this)}
                                    style={{marginTop: '0.2rem'}}/>

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
