import React, {Component} from 'react';
import {Carousel} from 'antd'

export default class home extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        let styles = this.$style
        return (
            <div className={styles.banner}>
                <Carousel effect="fade" autoplay afterChange={() => {
                    this.refs.small01.style.top='0'
                    this.refs.small02.style.top='0'
                }} beforeChange={()=>{
                    this.refs.small01.style.top='1.7rem'
                    this.refs.small02.style.top='1.7rem'
                }}>
                    <div style={{height: '1.7rem', position: 'relative'}}>
                        <img className={styles.big}
                             src="http://m.jinpinfin.com/themes/jinpin/static/mobile/banner/banner02_bg.png" alt=""/>
                        <img className={styles.small} ref='small01'
                             src="http://m.jinpinfin.com/themes/jinpin/static/mobile/banner/banner02_con.png" alt=""/>
                    </div>
                    <div style={{height: '1.7rem', position: 'relative'}}>
                        <img className={styles.big}
                             src="http://m.jinpinfin.com/themes/jinpin/static/mobile/banner/banner01_bg.png" alt=""/>
                        <img className={styles.small} ref='small02'
                             src="http://m.jinpinfin.com/themes/jinpin/static/mobile/banner/banner01_con.png" alt=""/>
                    </div>
                </Carousel>
            </div>

        )
    }
}