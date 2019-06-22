import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import {connect} from 'react-redux'
import {action} from "../store/store";

class App extends Component
{
    constructor(props){
        super(props);
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