import React from 'react';
import { connect } from 'dva';

function List({ dataSource }) {
  console.log(dataSource)
  return (
    <table>
      <thead>
        <tr>
          <td>name</td><td>age</td>
        </tr>
      </thead>
      <tbody>
        {
          dataSource.map((it) => {
            return <tr><td>{it.name}</td><td>{it.age}</td></tr>;
          })
        }
      </tbody>
    </table>
  );
}


export default connect(state => ({ dataSource: state.list.dataSource }))(List);
