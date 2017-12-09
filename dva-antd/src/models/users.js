
import { Divider ,Icon} from 'antd';
import _ from 'lodash';

export default {

  namespace: 'users',

  state: [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }],


  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    delete(state, action){
      _.remove(state, n=>n.key===action.key);    
      let newstate = state.slice(0)
      return newstate;
    },
    edit(state,action){
      let newstate = state.slice(0)
      let index =  _.findIndex(newstate, function(chr) {
        console.log(chr,action)
        return chr.key == action.record.key;
      });
      newstate[index]=action.record;
      return newstate;
    },
    add(state,action){
      let newstate = state.slice(0)
      let key = parseInt(_.last(newstate).key)+1;
      newstate.push(Object.assign(action.record,{key: key.toString()}));
      return newstate;
    }

  },

};
