import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore,combineReducers,applyMiddleware } from 'redux'
import { Provider,connect } from 'react-redux'
import React,{ Component } from 'react'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import {Link,BrowserRouter,Switch, Route} from 'react-router-dom';

//使用最新的
// react@16.2.0
// react-router-dom@4.2.2

//react 15.5以上不建议再用Proptypes
//react-router 4.0以上需要用react-router-dom这个库，有些组件转移到这个库中了，在路由写法上也有所改动，见最下

//--------------------准备好action reduce store-----------------
// 返回action的函数们
function up(s){
    return {
        type:"up",
        size:s
    }
}
function down(s){
    return {
        type:"down",
        size:s
    }
}

// reducer函数 用于根据action更新旧state并返回更新后的state的
let initState=0;
function num(state=initState,action){
    switch(action.type){
        case "up":
            return state+action.size
        case "down":
            return state-action.size
        default:
            return state
    }
}
let reducer =combineReducers({num})

// store  根据reducer创建store
let store = createStore(reducer,applyMiddleware(thunk))
//---------------------准备工作完成-----------------------------


// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
//let unsubscribe = store.subscribe(() =>
//  console.log(store.getState())
//)

// 发起一系列 action
//store.dispatch(up(1))


// 停止监听 state 更新
//unsubscribe();

function f(a) {
    return  (dispatch) =>{
        setTimeout(()=>dispatch(down(a)),1000);
    };
}
class App extends Component{
    render(){
        console.log(this.props)
        const { dispatch,num } = this.props
        return (
            <div>
                <h1>{num}</h1>
                <button onClick={e=>dispatch(up(1))}>up</button>
                <button onClick={e=>dispatch(down(1))}>down</button>
                <button onClick={e=>dispatch(f(2))}>delaydown</button>
                <br />
                <Link to={"/hi"}>Hi</Link>
            </div>
        )
    }
}
function select(state) {
    return {
        num: state.num
    };
}
var Con = connect(select)(App)

class Hi extends Component{
    render(){
        return <h1>hi</h1>
    }
}

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Con} />
                <Route exact path="/hi" component={Hi} />
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById("root")
)

registerServiceWorker();
