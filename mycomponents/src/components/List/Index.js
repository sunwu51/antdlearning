import React from 'react';
import { Table, Icon, Divider,Button } from 'antd';
import DelModal from './DelModal';
import EditModal from './EditModal';
import _ from 'lodash';


class List extends React.Component{
    
    handleAdd=record=>{this.props.onAdd(record)}
    
    handleDelete=record=>{this.props.onDelete(record)}

    handleUpdate=record=>{this.props.onUpdate(record)}
    
    render(){
        let {colums,dataSource}=this.props;
        colums=colums.map(it=>{return Object.assign({title:it.key,dataIndex:it.key,type:"string"},it)});
        const titles = colums.map(it=>{return {key:it.key,title:it.title,type:it.type,editable:it.editable}})
        let rowKey = colums.filter(i=>i.isId)[0]?colums.filter(i=>i.isId)[0]['key']:undefined;
        if(colums.filter(it=>it.key=='_action').length<1)
          colums.push({
            title: '操作',
            key: '_action',
            render: (text, record) => (
              <span>
                <DelModal onOk={this.handleDelete.bind(null,record)}>
                  <Button  type="danger">
                      删除
                  </Button> 
                </DelModal>
                <Divider type="vertical" />
                <EditModal record={ record } onOk={this.handleUpdate} titles={titles}>
                  <Button type="primary">更新</Button>
                </EditModal>
              </span>
            ),
          });
        return (
            <span>
              <EditModal titles={titles} record={{}} onOk={this.handleAdd}>
                <Button type="primary">创建</Button>
              </EditModal>
              <div>
                <Table rowKey={rowKey} columns={colums} dataSource={dataSource} />
              </div>
            </span>
          );
    }

}
export default List;