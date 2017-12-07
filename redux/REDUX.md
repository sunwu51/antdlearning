# React
React有两个重点props和state。
## props
可以获取组件的属性，例如
```jsx
class App extends Component{
	render(){
		return (
			<h1>hello {this.props.name}</h1>
		)
	}	
}
ReactDom.render(
	<App name="小明"/>,
	mountDom
);
```
这样标签的name属性可以通过props传入到App这个class中进行相关操作。他可以用来做数据的显示，例如想要封装一个Table组件则可以规定一个dataSource属性来传入数据源，内部通过解析这个数组进行遍历展示，封装好后的写法类似于这样就可以完成展示：
```jsx
let ds=[
	{name:'张三',age:22},
	{name:'李四',age:25}
]
<Table dataSource={ds}/>
```
由此我们可以看出props用来传递一些展示的数据是非常好用的。
## state
state是react的一个核心，我们知道组件都是调用render函数渲染的，在初次加载页面的时候会渲染一次。之后如果想要重新渲染，则需要组件的state发生改变的时候才会再次渲染。
```jsx
class App extends Component{
	getInitialState(){
		return {num:0};
	}
	render(){
		return (
			<h1>{this.state.num}</h1>
			<button onClick={e=>this.handleClick(e)}>add</button>
		)
	}	
	handleClick(e){
		this.setState({num:this.state.num+1})
	}
}
```
上面例子是点击按钮使state产生了变化，而state变化后会重新调用render函数进行渲染，进而显示的数产生了变化。

我们发现如果是需要变化的数据展示页面，需要用state来存这些数据，数据的变化才会导致重新渲染，结合之前的props所以最后一般的解决方案是这样：单纯的展示组件就用props存储数据，而需要产生动态变化的时候就在这个组件外面套一个组件。
```jsx
class Show extends Component{
	render(){
		return <h1>{this.props.num}</h1>;
	}
}
class App extends Component{
	getInitialState(){
		return {num:0};
	}
	render(){
		return (
			<Show num={this.state.num}>
			<button onClick={e=>this.handleClick(e)}>add</button>
		)
	}	
	handleClick(e){
		this.setState({num:this.state.num+1})
	}
}
```
# Redux
react中的state在任何一个内部的函数中都可以通过调用`this.setState()`方法进行改动，也就意味着这些地方都能进行重新渲染。这使得渲染产生的时机不好把握。另外每个组件都有一个state嵌套增多的时候，会搞得自己晕头转向。当这个组件功能变多的时候问题变得更严重。
Redux就提出了一种想法：把整个应用的所有state都存到一个地方，通过在特定入口触发事件才能引起state的改变。
## action
这个事件叫做action他就是一个json对象规定了必须有个字段叫type，例如一个增加用户的事件可能是这样：
```jsx
{
	type:"USER_ADD",
	user:{name:"张三",age:33}
}
```
## reducer
处理事件的第一步就是更新state，这一步处理叫做reduce，reducer就是一个函数规定了必须有俩参数一个是当前的state，一个是action；并且规定了返回值是因为这个action导致的变化后的state，例如增加用户对应的reducer大致如下：
```jsx
function myReducer(state={users:[]},action){
	if(action.type == "USER_ADD")
		let newstate =Object.assign({}, state);
		newstate.users.push(action.user);
		return newstate;
	return state;
}
```
注意这里参数中`state={users:[]}`的意思是如果没有传state参数只传了action这一个参数，state默认值是{users:[]}。这是规定state初始值的一种写法。
`Object.assign`这里本来可以直接写成`state.users.push(action.user)`但是是改变了原来的state，可能在同时操作的时候出现问题，这里的写法是复制了一份state，不影响原state。
## store
我们上面说了事件action以及处理action更新state用的reducer，不过state到底存在哪里呢？我们每次触发事件都要人为调用reducer函数么？答案是不用，store帮我们来做这些事情。
通过reducer来创建store，创建后就能直接获取state通过`getState`方法，之前的[]被设为初始值了，会被返回。
触发事件则通过`dispatch(action)`函数，事件触发后会 自动调用reducer更新state，然后触发回调函数。回调函数通过`subscribe(callback)`函数进行设置，改函数的返回值是注销这个回调函数的函数。
```jsx
import { createStore } from 'redux'

let store = createStore(myReducer);

console.log(store.getState()); //[]

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

let addAction={
	type:"USER_ADD",
	user:{name:"张三",age:33}
}
store.dispatch(addAction); //事件触发后state更新然后触发回调函数，打印了state的值

unsubscribe();
```
通过上面这个例子，我们大体明白了redux的工作流程，通过这样的写法，我们能够将`state`汇总起来，所有的事件触发例如点击按钮，都通过`store.dispatch(action)`进行触发。不用再在每个组件中写处理函数，只需要在一个文件中集中写好 多个reducer。
# React-Redux
Redux是一种集中处理集中存储state的思想，他并不是react的扩展，他也可以用在angularjs vue等。如果要在React中使用还需要安装react-redux，上面的例子中是手动调用`store.dispatch`触发事件的，react中则可能是在某个`onClick`函数中触发事件。上述的监听state的变化是用了`store.subscribe`进行订阅的state的变化，而react中需要将store中的state绑定到组件的state上，这些工作都交给react-redux帮我们来做：
```jsx
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom'

//声明store
let store = createStore(myReducer);

//展示Users的组件
class App extends Component{
	render(){
		//在调用connect之后，会自动绑定一个dispatch和自定义绑定过来的users
		const { dispatch,users } = this.props
		let content =users.map(it=>{return <tr>{it.name}</tr><tr>it.age</tr>})
		return (
			<table>
				<tr><th>name</th><th>age</th></tr>
				{content}
			</table>
			<button onClick={e=>dispatch(addAction)}>add</button>
		)
	}	
}

//将state的users绑定到props中
function select(state) {
  return {
    users: state.users
  };
}
//调用connect函数完成dispatch和users的绑定，绑定后的组件名为Con
let Con = connect(select)(App)

//通过Provider将store注入进来，此时所有react组件的state都存放在这里
render(
	<Provider store={store}>
		<Con />
	</Provider>,
	document.getElementById("main")
)

```
整个流程是首先完成了store.state和react中state的联系；
渲染Con组件，因为初始状态的users是[]，所以表格有0行数据；
点击add按钮，触发了添加用户的action；
reducer中处理，在users属性中追加了这个user；
store.state状态发生了变化，自动绑定到react，认为需要重新渲染了，然后重新渲染了Don；
Don中的users属性更新，并显示在表格中，多了一行。
