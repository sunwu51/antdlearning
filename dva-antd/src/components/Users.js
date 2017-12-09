import React from 'react';
import { Table, Icon, Divider,Button } from 'antd';
import Delmodal from './Delmodal';
import Editmodal from './Editmodal';

function Users({dispatch, data}){
    console.log('重绘整个')
    function handleEdit(record){
      dispatch({type: 'users/edit',record: record})
    }

    function handleDelete(key){
      dispatch({type: 'users/delete', key: key})
    }

    function handleAdd(record){
      dispatch({type: 'users/add', record: record});
    }

    const colums= [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Delmodal onOk={handleDelete.bind(null,record.key)}>
              <Button  type="danger">
                删除
              </Button>
            </Delmodal>
            <Divider type="vertical" />
            <Editmodal record={ record } onOk={handleEdit} text={"update"}>
              <Button type="primary">更新</Button>
            </Editmodal>
          </span>
        ),
      }];
    return (
      <span>
        <Editmodal record={{}} onOk={handleAdd}>
          <Button type="primary">创建</Button>
        </Editmodal>
        <Table columns={colums} dataSource={data} />
      </span>
    );
}

export default Users;