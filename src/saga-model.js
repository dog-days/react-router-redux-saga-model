import { SagaModel } from 'redux-saga-model';
import { routerMiddleware, routerReducer as routing } from 'react-router-redux';

/**
 * 获取saga model实例化对象
 * @param { object } history 同react-router history
 * @param { object } reducers 为经过combineReducer的reducers
 * @param { any } preloadedState 请参考redux的createStore第二参数
 * @param { array } models 请参考redux-saga-model说明
 * @param { array } plugins 请参考redux-saga-model说明
 */
export default function getSagaModel(
  history,
  reducers,
  preloadedState,
  models = [],
  middlewares = [],
  plugins = [],
  openReduxDevTools
) {
  const initialState = preloadedState;
  const initialReducer = {
    ...reducers,
    routing,
  };
  console.log(openReduxDevTools);
  const initialMiddleware = [routerMiddleware(history), ...middlewares];
  const initialModels = models;
  const sagaModel = new SagaModel({
    initialState,
    initialReducer,
    initialMiddleware,
    initialModels,
    history,
    openReduxDevTools,
  });
  plugins.forEach(sagaModel.use.bind(sagaModel));
  return sagaModel;
}
