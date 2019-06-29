import React, {Component} from 'react';
import {Icon, Radio, Input} from "antd"

export default class Apply extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
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
            ]
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
            value:e.target.value
        })
        console.log(this.state.value)
    }

    render() {
        let styles = this.$style
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className={styles.apply}>
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
                                        {this.state.value === this.state.otherValue ? <Input style={{width: 100, marginLeft: 10}}
                                                                         onChange={this.otherChange.bind(this)}/> : null}
                                    </Radio>
                                </Radio.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>公司名称</td>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>所属城市</td>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>申请人</td>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>联系电话</td>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{verticalAlign: 'top'}}>其他留言</td>
                            <td>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={styles.btn}>立即申请</div>
                </div>
            </div>
        )
    }
}