import React,{Component} from 'react'
import Banner from "./component/Banner"
import axios from 'axios'
class Channel extends Component{
    constructor(props) {
        super(props);
        this.state={
            channelList:[]
        }
    }

    async getList(){
        let data = await axios({
            method:'get',
            url:'http://106.14.81.245:8080/selectSolution'
        })
        this.setState({
            channelList:data.data
        })
    }
    componentDidMount(){
        this.getList()
    }
    render() {
        let styles = this.$style
        console.log(this.state.channelList)
        return (
            <div className={styles.channel}>
                <Banner/>
                <div className={styles.title}>
                    <h1>沛沛金融渠道产品</h1>
                    <p>沛沛金融旗下核心产品板块涉及金融</p>
                </div>
                <div className={styles.list}>
                    {this.state.channelList.map((item, index) => {
                        return <div  key={index} className={styles.min} onClick={() => {
                            this.props.history.push({
                                pathname:'apply'
                            })
                        }
                        }>
                            <img
                                src={item.surl}
                                alt=""/>
                            <div className={styles.con}>
                                <h2>{item.sname}</h2>
                                <p>{item.sdetail}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }

}

export default Channel