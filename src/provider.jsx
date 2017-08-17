import React from 'react';
import PropTypes from 'prop-types';
import Provider from 'react-router-redux-provider/libs/provider';
import getSagaModel from './saga-model';

function getStore() {
  const {
    history,
    reducers,
    preloadedState,
    models = [],
    middlewares = [],
    plugins = [],
    afterStoreCallback,
  } = this.props;
  const sagaModel = getSagaModel(
    history,
    reducers,
    preloadedState,
    models,
    middlewares,
    plugins
  );
  const store = sagaModel.store();
  //获取到store后的回到函数
  afterStoreCallback && afterStoreCallback(store);
  return store;
}

/**
 * @prop { object } history browser、hash、memory，跟react-router挂钩，必填
 * @prop { array } middlewares redux middlewares
 * @prop { array } enhancers redux enhancers
 * @prop { object } reducers redux reducers (传进来后会被combineReducers)
 * @prop { any } preloadedState redux preloadedState
 * @prop { function } afterStoreCallback 获取到store后的回到函数，这里运行与render函数前面
 */
export default class ModelProvider extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    middlewares: PropTypes.array,
    preloadedState: PropTypes.any,
    enhancers: PropTypes.array,
    reducers: PropTypes.object,
    afterStoreCallback: PropTypes.func,
  };
  static childContextTypes = {
    sagaStore: PropTypes.object,
  };
  getChildContext() {
    return {
      sagaStore: this.store,
    };
  }
  displayName = 'SagaModelProvider';
  state = {};
  store = getStore.bind(this)();
  render() {
    const { history, children } = this.props;
    const store = this.store;
    return (
      <Provider store={store} history={history}>
        {children}
      </Provider>
    );
  }
}
