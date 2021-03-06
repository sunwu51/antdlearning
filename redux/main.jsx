import { createStore,combineReducers } from 'redux'
import { Provider,connect } from 'react-redux'
import React,{ Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory,Link } from 'react-router';

//--------------------准备好action reducer store-----------------
// 1 返回action的函数们
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

// 2 reducer函数 用于根据action更新旧state并返回更新后的state的
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

// 3 store  根据reducer创建store
let store = createStore(reducer)



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

// 4 react组件的创建（关联）
class App extends Component{
	render(){
		console.log(this.props)
		const { dispatch,num } = this.props
		return (
			<div>
				<h1>{num}</h1>
				<button onClick={e=>dispatch(up(1))}>up</button>
				<button onClick={e=>dispatch(down(1))}>down</button>
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

// 5 利用router渲染到对应的url下
render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={Con} />
			<Route path="/hi" component={Hi} />
		</Router>
	</Provider>
	,
	document.getElementById("main")
)
