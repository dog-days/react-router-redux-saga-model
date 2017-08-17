import React from 'react';
import Provider from './provider';
import createHistory from 'history/createMemoryHistory';

export default class MemoryProvider extends React.Component {
  displayName = 'SagaModelMemoryProvider';
  history = createHistory();
  render() {
    const { children, ...others } = this.props;
    const history = this.history;
    return (
      <Provider {...others} history={history}>
        {children}
      </Provider>
    );
  }
}
