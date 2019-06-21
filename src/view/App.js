import React,{Component} from 'react';
import logo from '../assets/logo.svg';
import {connect} from 'react-redux'
import {action} from "../store/store";

class App extends Component
{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        console.log('~~~~~~~~~~~');
        console.log('我是"/"',this);
        this.methods=this.methods.bind(this);
        this.methods()
    }
    methods(){
        this.ccs=()=>{this.props.history.push('/home')};
        this.test=()=>{
            this.props.ChangeState(function (store) {
                store.username='JousenZhou'
            })
        }
        console.log('methods已挂载')
    }

    render() {
        let style=this.$style;
        return(
            <div className={style.App}>
                <header>
                    <img src={logo}  alt="logo" />
                    <p onClick={this.ccs}>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                        <span>sass测试|</span>|
                        Learn React
                    </a>
                    <p>仓库：{this.props.store.username}</p>
                    <p onClick={this.test}>action测试</p>
                </header>
            </div>
        )
    }
}
const mapStateToProps = (store) => {return {store}};
export default connect(mapStateToProps, action)(App)