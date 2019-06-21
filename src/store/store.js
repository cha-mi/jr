import {createStore} from 'redux'

//仓库
const defaultState={
    Meg:'我是仓库'
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

//自定义函数行为
const action= {ChangeState: (fn) => ({type: 'ChangeState', fn})};

//注册监听器-测试
store.subscribe(function () {console.log(store.getState())});
export {store,action} ;