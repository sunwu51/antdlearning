import List from '../components/List/Index'
import React from 'react';
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


class App extends React.Component{
    state={
        ds: []
    }
    getData(){
        let that = this;
        fetch('http://localhost/gateway',{'headers':{'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTMwODIyMDEsInN1YiI6IntcInVpZFwiOjIsXCJ1c2VybmFtZVwiOlwiYWRtaW5cIixcInBhc3N3b3JkXCI6XCIxMjNcIixcInJvbGVcIjpcIlJPTEVfQURNSU5cIn0iLCJleHAiOjE1MTMwODU4MDF9.2FYqGrQCVCrlpopo67Z1JN6mB4RetWLHhU35log7s6U'},'method':'get'}).
        then(r=>r.json()).
        then(function(data){
            if(data.status==401||data/status==403){
                console.log(data.status,data.message)
            }
            else
                that.setState({ds:data});
        })
    }
    componentDidMount(){
        this.getData();
    }
    render(){
        return <List  colums={col} dataSource={this.state.ds}
            onAdd={(record)=>{console.log("添加条目",record)}}
            onDelete={(record)=>{console.log("删除条目",record)}}
            onUpdate={(record)=>{console.log("更新条目",record)}}
    /> 
    }
    
} 
export default App;