# Ant design learning
antd是一个不错的组织前端的框架，他不仅提供了好看且适合国内网站风格的CSS样式，同时也将各种组件封装。<br>
在[官网](https://ant.design/components/menu-cn/)有非常详细的文档，但是学习曲线有些陡峭，即使有点react的基础，在创建项目的时候也有些搞不懂这些新的工具都是什么（如dva）。
# 快速开始
官网的开始中，用dva-cli创建项目、路由等，在这个过程中如果不知道dva的工作方式的话，会有很多困惑，并不能将关注点全都放在antd本身。<br><br>
为了更简单的开始我做了一个快速开始的样例，这里不需要用dva去创建项目、组件、路由等步骤，比官网的开始要更容易一些。直接跳转[快速开始](quickstart/)。
# 用create-react-app开始
```
npm i -g yarn create-react-app

create-react-app myapp

cd myapp

yarn add antd react-router react-redux react-thunk

yarn start
```
[目录](create-react-app/)中src是放置代码的地方，该目录中`index.js`为入口文件，public下的`index.html`是html的入口。
# Redux 
redux可以合理的管理state，在大项目中是非常有用的。可以参考[Demo](redux/)
# dva
# 用dva-cli开发

