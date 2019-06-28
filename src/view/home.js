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
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve01.png',
                    title:'期货'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve02.png',
                    title:'信托'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve03.png',
                    title:'股票'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve04.png',
                    title:'证券'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve05.png',
                    title:'基金'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve06.png',
                    title:'投额'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve07.png',
                    title:'私募'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve08.png',
                    title:'银行'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve09.png',
                    title:'保险'
                },

                {
                    url:'http://m.jinpinfin.com/themes/jinpin/static/mobile/images/serve10.png',
                    title:'其他'
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

                <div className={styles.static}>
                    <div className="serve mod">
                        <div className={styles.tit}>
                            <h1>我们服务的对象</h1>
                            <p>如果您是以下金融机构与企业，相信您的选择没有错</p>
                        </div>
                        <ul className={styles.serve_list}>
                            {this.state.brandList.map((item,index)=>{
                                return <li key={index}>
                                    <img src={item.url}/>
                                    <span>{item.title}</span>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}