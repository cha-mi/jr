import React, {Component} from 'react';
import {Input} from 'antd'
export default class home extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        let styles = this.$style
        const {Search} = Input
        return (
            <div className={styles.search}>
                <Search
                    placeholder="搜索..."
                    onSearch={value => console.log(value)}
                    style={{ width: '90%' }}
                />
            </div>
        )
    }
}