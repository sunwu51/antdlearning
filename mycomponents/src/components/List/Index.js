import React from 'react';
import { Table, Icon, Divider,Button } from 'antd';
import DelModal from './DelModal';
import EditModal from './EditModal';
import _ from 'lodash';
import PropTypes from 'prop-types';


class List extends React.Component{
    
    handleAdd=record=>{this.props.onAdd(record)}
    
    handleDelete=record=>{this.props.onDelete(record)}

    handleUpdate=record=>{this.props.onUpdate(record)}
    
    render(){
        let {columns,dataSource}=this.props;
        columns=columns.map(it=>{return Object.assign({title:it.key,dataIndex:it.key,type:"string"},it)});
        const titles = columns;
        let rowKey = columns.filter(i=>i.isId)[0]?columns.filter(i=>i.isId)[0]['key']:undefined;
        if(columns.filter(it=>it.key=='_action').length<1)
          columns.push({
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
                <Table rowKey={rowKey} columns={columns} dataSource={dataSource} />
              </div>
            </span>
          );
    }

}
List.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
export default List;