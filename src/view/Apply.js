import React, {Component} from 'react';
import {Icon, Radio, Input, message} from "antd"
import axios from 'axios'

export default class Apply extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            formList: [
                {
                    type: '金频金融直播系统'
                },
                {
                    type: '智能客服机器人外呼系统'
                },
                {
                    type: '金频消费分期商城'
                },
                {
                    type: '金融知识问答系统'
                },
                {
                    type: '金频拓客宝'
                },
                {
                    type: '金频反欺诈系统'
                },
                {
                    type: '新三农生态金融系统'
                },
                {
                    type: '金融代理商佣金结算系统'
                },
                {
                    type: '新生态供应链金融系统'
                },
                {
                    type: '股民引流落地页'
                },
                {
                    type: '金频汽车金融系统'
                },
                {
                    type: '投资管理系统'
                },
                {
                    type: '金频金服影视众筹系统'
                },
                {
                    type: '融资租赁系统'
                },
            ],
            company: '',
            city: '',
            man: '',
            tel: '',
            msg: ''
        }
    }

    onChange = e => {
        // console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });

    };

    otherChange(e) {
        this.setState({
            otherValue: e.target.value,
            value: e.target.value
        })
        // console.log(this.state.value)
    }

    companyChange = (e) => {
        this.setState({
            company: e.target.value
        })
    }
    cityChange = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    manChange = (e) => {
        this.setState({
            man: e.target.value
        })
    }
    telChange = (e) => {
        this.setState({
            tel: e.target.value
        })
    }
    msgChange = (e) => {
        this.setState({
            msg: e.target.value
        })
    }

    async send() {
        if (this.state.value.trim() && this.state.company.trim() && this.state.city.trim() && this.state.man.trim() && this.state.tel.trim() && this.state.msg.trim()) {
            let data = await axios({
                method: 'post',
                url: 'http://106.14.81.245:8080/insertApply',
                data: {
                    username: sessionStorage.getItem("username"),
                    product: this.state.value,
                    company: this.state.company,
                    city: this.state.city,
                    man: this.state.man,
                    tel: this.state.tel,
                    msg: this.state.msg
                }
            })
            if (data.data) {
                message.info('申请成功')
                let inp = document.querySelectorAll('input')
                inp.forEach((item)=>{
                    item.value=''
                })
                this.refs.msg.value=''
                // inp[inp.length].focus

            }
        } else {
            message.info('请填写完整')
        }

    }

    render() {
        let styles = this.$style
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className={styles.apply} ref='apply'>
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
                    免费申请
                </header>
                <div className={styles.banner}>
                    <img src="http://m.jinpinfin.com/themes/jinpin/static/mobile/images/banner05.png" alt=""/>
                </div>

                <div className={styles.form}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                试用产品
                            </td>
                            <td>
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    {
                                        this.state.formList.map((item, index) => {
                                            return <Radio style={radioStyle} value={item.type} key={index}>
                                                {item.type}
                                            </Radio>
                                        })
                                    }

                                    <Radio style={radioStyle} value={this.state.otherValue} ref='other'>
                                        More...
                                        {this.state.value === this.state.otherValue ?
                                            <Input style={{width: 100, marginLeft: 10}}
                                                   onChange={this.otherChange.bind(this)}/> : null}
                                    </Radio>
                                </Radio.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>公司名称</td>
                            <td>
                                <input type="text" onChange={this.companyChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>所属城市</td>
                            <td>
                                <input type="text" onChange={this.cityChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>申请人</td>
                            <td>
                                <input type="text" onChange={this.manChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>联系电话</td>
                            <td>
                                <input type="text" onChange={this.telChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{verticalAlign: 'top'}}>其他留言</td>
                            <td>
                                <textarea name="" id="" cols="30" rows="10" onChange={this.msgChange} ref='msg'></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={styles.btn} onClick={this.send.bind(this)}>立即申请</div>
                </div>
            </div>
        )
    }
}