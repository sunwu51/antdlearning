# Thunk
thunk是react的一种Middleware实现，可以用来处理异步请求。例如ajax请求数据再进行显示的时候，是需要先发起http请求然后在请求成功的回调函数中，获取到数据进行显示的。<br>
在react中的action只能是立马改变state状态，没有处理异步请求的用法。<br>
thunk注入后，`dispatch`可以接收`function(dispatch)`参数(闭包)。例如ajax更新list的`action`和`dispatch`写法大致如下：
```jsx
function show(users){
    return {
        type:"SHOW",
        users
    }
}
function reqUserShow(){
    return (dispatch)=>{
        $.get(someurl,data=>dispatch(data));
    }
}
<button onClick={e=>dispatch(reqUserShow())}>展示用户列表</button>
```
# 注入
```
npm install --save redux-thunk
```
```jsx
import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

let store = createStore(reducer,applyMiddleware(thunk))
```
# Demo
把`main.jsx`内容替换为`main-thunk.jsx`的内容