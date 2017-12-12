# 自己制作的组件
组件全都放到了`src\components`
# List组件
可传递参数：
```jsx
<List colums={col} dataSource={this.state.ds}
      onAdd={(record)=>{console.log("添加条目",record)}}
      onDelete={(record)=>{console.log("删除条目",record)}}
      onUpdate={(record)=>{console.log("更新条目",record)}}
/> 
```
colums是`antd`中`Table`组件的扩展，扩展了`isId`和`editable`参数，分别代表是否是id和是否可编辑。例子见下，其中只有`key`是必传的参数，与`datasource`中的字段名保持一致，`isId`代表主键，非主键的可以不加这个参数，`title`则代表表格的表头显示的文字，不传则默认是`key`。`editable`代表是否可编辑，在增和改的modal中不可编辑则不显示这个input。`type`默认是string，可选的目前只有`number`和`string`。`selection`则是下拉形式的`section+option`时候用，内容为候选value组成的数组
```jsx
const col=[ {
    title: '网关id',
    key: 'gid',
    isId:'true',
    editable:false,
    type:"number"
  },{
    title: '配置id',
    key: 'gconfid',
    type:"number",
    selection:[
      0,1,2
    ]    
  }, {
    title: 'mqtt客户端',
    key: 'mqttclientid',
    type:"string"
  },
  {
    title: 'mqtt密码',
    key: 'mqttpassword',
    type:"string"
  },{
    title: '在线',
    key: 'online',
    type:"string",
    editable: false,
    render: (t,r)=>{return t.toString()}
  },{
    title: '位置',
    key: 'position',
    type:"string"
  },{
    title: '序列号',
    key: 'seq',
    type:"string"
  },{
    title: '备注',
    key: 'remark',
    type:"string"
  }
];

```
dataSource也是对`antd`的`dataSource`的扩展，例如：
```jsx
[
  {"gid":1,"seq":"0001","position":"shanghai","mqttclientid":"0001","mqttpassword":"123","online":false,"gconfid":0,"remark":"test1"},
  {"gid":2,"seq":"0002","position":"beijing","mqttclientid":"0002","mqttpassword":"123","online":false,"gconfid":0,"remark":"test2"}
]
```
其中键名要和columns中一致。  
注意：
- 1 如果只需要显示部分字段，如上述seq不想再list显示，则columns中删去这一项即可。
- 2 如果值为数字，可以将colums中type设为number