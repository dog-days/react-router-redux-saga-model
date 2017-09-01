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
    production = true,
  } = this.props;
  const sagaModel = getSagaModel(
    history,
    reducers,
    preloadedState,
    models,
    middlewares,
    plugins,
    !production
  );
  const store = sagaModel.store();
  return store;
}

/**
 * @prop { object } history browser、hash、memory，跟react-router挂钩，必填
 * @prop { array } middlewares redux middlewares
 * @prop { array } enhancers redux enhancers
 * @prop { object } reducers redux reducers (传进来后会被combineReducers)
 * @prop { any } preloadedState redux preloadedState
 * @prop { boolean } production 是否是生产环境，默认为true
 */
export default class ModelProvider extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    middlewares: PropTypes.array,
    preloadedState: PropTypes.any,
    enhancers: PropTypes.array,
    reducers: PropTypes.object,
    production: PropTypes.bool,
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
    const { history, children, production } = this.props;
    const store = this.store;
    return (
      <Provider store={store} history={history} production={production}>
        {children}
      </Provider>
    );
  }
}
