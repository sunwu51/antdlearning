# Dva
```
npm i -g dva-cli
dva new dva
cd dva
npm start
```
# 文件结构
和create-react-app类似的都有src和public目录，src中的文件更多一些。
```js
//这是预先定好的设置，强制规定的
index.ejs  html入口模板
index.js   js入口
```
```js
//这是约定的文件夹，但是并不强制
components 组件
models     模型
routes     路由
services   服务层功能封装
utils      通用功能 
router.js  路由规则
```
# Demo
[Count](https://stackblitz.com/edit/dva-example-count)这个例子中实际上只用到了index.js这个文件，并没有用各种文件夹和router.js。相当于是个最小系统，我们可以从中看出自己写程序的时候应该怎么写。
## model
`model`是最核心的概念，他就是`redux`中的`reducer`，不过在reducer的基础上还内置了其他功能，比如处理异步逻辑的saga中的`effect`，以及`subscribe`。
## action
action与redux中完全一样都需要有个type字段，不过dva的model中提出了namespace的概念，使得action的格式必须是`namespace/reducer`的形式才能传到固定的reducer中，比redux中的switch判断要简洁。
## store
store和redux也是一致的，通过app._store可以访问，store不用单独创建，但是需要app绑定到model上，调用`app.model(mymodel)`方法。
## component
组件是react的写法，要绑定到dva的store上的话，也需要调用connect方法来完成。

