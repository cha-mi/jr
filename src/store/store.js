import {createStore} from 'redux'

//store
const defaultState={
    isLogin:false,
    token:null,
    username:null,
};

//reducer
const store =createStore((state=defaultState,action)=>{
        if (action.type === 'ChangeState') {
            return (()=>{
                action.fn(state);
                return {...state};
            })()
        } else {
            return state;
        }
});

//action自定义函数行为
const action= {ChangeState: (fn) => ({type: 'ChangeState', fn})};

//注册监听器-测试
store.subscribe(function () {console.log('仓库目前的值',store.getState())});
export {store,action} ;