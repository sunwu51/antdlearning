
export default {

  namespace: 'list',

  state: {
    dataSource: [
      {
        name: 'zs', age: 10,
      },
      {
        name: 'ls', age: 20,
      },
    ],
  },

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
  },

};
