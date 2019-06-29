import React, {Component} from 'react';
import {Carousel} from 'antd'
import Banner from './component/Banner'
import Search from './component/Seacrh'

export default class home extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            brandList: [
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve01.png',
                    title: '期货'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve02.png',
                    title: '信托'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve03.png',
                    title: '股票'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve04.png',
                    title: '证券'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve05.png',
                    title: '基金'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve06.png',
                    title: '投额'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve07.png',
                    title: '私募'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve08.png',
                    title: '银行'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve09.png',
                    title: '保险'
                },

                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve10.png',
                    title: '其他'
                },
            ],
            solveList: [
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project01.png',
                    title: '金融拓客营销'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project02.png',
                    title: '互联网金融'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project03.png',
                    title: '移动应用开发'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project04.png',
                    title: '高端定制'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project05.png',
                    title: 'UE/UI用户体验'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project06.png',
                    title: '技术研发服务'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project07.png',
                    title: '技术运营维护'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/project08.png',
                    title: '接口接入服务'
                },
            ],

            productList: [
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/product01.png',
                    title: '金频直播系统',
                    con: '集PC/微信/APP三合一'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/product_13.png',
                    title: '拓客宝',
                    con: '金频软文推广 + 新闻营销'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/product_127.png',
                    title: '消费分期系统',
                    con: '拥有实力风控团队'
                },
                {
                    url: 'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/product_15.png',
                    title: '金频反欺诈系统',
                    con: '提供完整业务流程风控模型'
                },
            ]
        }
    }

    render() {
        let styles = this.$style
        return (
            <div className={styles.home}>
                <Banner/>
                <Search/>
                <div style={{height: '0.5rem', background: '#F6F6F6', paddingBottom: '0.1rem', overflow: 'hidden'}}>
                    <div className={styles.navBanner} style={{position: 'relative', overflow: 'hidden'}}>
                        <div className={styles.news}>
                            金融头条
                        </div>
                        <Carousel autoplay dotPosition={"right"} dots={'false'}>
                            <div>
                                <h3>重要通知：关于开展2018年全国网站备案信息抽查评估通知</h3>
                            </div>
                            <div>
                                <h3>严正声明：坚决打击同业公司对金频金服的抄袭仿冒侵权 </h3>
                            </div>
                            <div>
                                <h3>凌讯网络与江西萍乡市公安局特巡警支队举行实战云警备系统战略合作签约仪式</h3>
                            </div>
                            <div>
                                <h3>重要通知：关于开展2018年全国网站备案信息抽查评估通知 </h3>
                            </div>
                        </Carousel>
                    </div>
                </div>
                {/*静态*/}
                <div className={styles.static}>
                    <div className="serve mod">
                        <div className={styles.tit}>
                            <h1>我们服务的对象</h1>
                            <p>如果您是以下金融机构与企业，相信您的选择没有错</p>
                        </div>
                        <ul className={styles.serve_list}>
                            {this.state.brandList.map((item, index) => {
                                return <li key={index}>
                                    <img src={item.url}/>
                                    <span>{item.title}</span>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                {/*产品*/}
                <div className={styles.static}>
                    <div className="serve mod">
                        <div className={styles.tit}>
                            <h1>金频金服核心产品</h1>
                            <p>金频金服旗下核心产品版块涉及金融</p>
                        </div>
                        <ul className={styles.product_list}>
                            {this.state.productList.map((item, index) => {
                                return <li key={index}>
                                    <div>
                                        <img src={item.url} alt=""/>
                                    </div>
                                    <div>
                                        <span>{item.title}</span><br/>
                                        <span>{item.con}</span>
                                    </div>
                                </li>
                            })}
                            <a href="javascript:void (0);" onClick={()=>{
                                this.props.history.push({
                                    pathname:'product'
                                })
                            }}>查看更多</a>
                        </ul>
                    </div>
                </div>
                {/*解决方案*/}
                <div className={styles.static}>
                    <div className="serve mod">
                        <div className={styles.tit}>
                            <h1>我们能为您解决什么</h1>
                            <p>金频金服，200+企业机构共同的选择 <br/>一站式精准定制互联网解决方案</p>
                        </div>
                        <ul className={styles.solve_list}>
                            {
                                this.state.solveList.map((item, index) => {
                                    return <li key={index}>
                                        <img src={item.url} alt=""/>
                                        <span>{item.title}</span>
                                    </li>
                                })
                            }
                            <li>
                                <span>更多</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}