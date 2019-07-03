import React, {Component} from 'react'
import Banner from './component/Banner'
import axios from 'axios'
import {Collapse} from 'antd';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
        }
    }

    componentDidMount() {
        this.getList()
    }

    async getList() {
        let data = await axios({
            method: 'get',
            url: 'http://106.14.81.245:8080/selectFeaturedProducts'
        })
        this.setState({
            productList: data.data
        })
    }

    render() {
        let styles = this.$style
        const {Panel} = Collapse;
        console.log(this.state.productList)
        return (
            <div className={styles.product}>
                <Banner/>
                <div className={styles.title}>
                    <h1>沛沛金融精选产品</h1>
                    <p>沛沛金融旗下核心产品板块涉及金融</p>
                </div>
                <Collapse accordion style={{padding: '0 0.1rem', border: 0}}>

                    {
                        this.state.productList.map((item, index) => {
                            return <Panel header={<div className={styles.proTit}>
                                <img src={item.fp_url}
                                     alt=""/>
                                <div>{item.fp_name}</div>
                            </div>} key={index} style={{
                                background: '#fff',
                                border: 0,
                                marginTop: '0.1rem',
                                // transition:'all 0.8s linear'
                            }}>
                                <div className={styles.minPro}>
                                    {item.featuredProductsList.map((item, index) => {
                                        return <div  key={index} className={styles.min} onClick={() => {
                                            this.props.history.push({
                                                pathname:'apply'
                                            })
                                        }
                                        }>
                                            <img
                                                src={item.fpUrl}
                                                alt=""/>
                                            <div className={styles.con}>
                                                <h2>{item.fpName}</h2>
                                                <p>{item.fpDetail}</p>
                                            </div>
                                        </div>
                                    })}
                                </div>

                            </Panel>
                        })
                    }

                </Collapse>,
            </div>
        );
    }

}

export default Product