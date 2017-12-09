import React from 'react';
import { connect } from 'dva';
import Users from '../components/Users'
import { Divider } from 'antd';

export default connect(
    (state)=>{
        return {data: state.users}
    }
)(Users);
