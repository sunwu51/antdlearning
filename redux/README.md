# Redux
redux的基础介绍可以参考[REDUX.md](REDUX.md),详细介绍可以参考[中文文档](http://www.redux.org.cn/)。react-router的用法可以参考[这篇文章](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)
# Demo
这个例子展示了最小化redux系统，在实际开发中需要将`action`、`reducer`、`component`分别创建文件夹进行存放。
<br/>
这里是对quickstart中进行了稍微的改动，在前者基础上安装了一些库：
```
npm i redux react-redux react-router --save
```
除此之外只修改了`main.jsx`中的内容。
# 运行
```
webpack-dev-server
```