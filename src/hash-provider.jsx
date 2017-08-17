import React from 'react';
import Provider from './provider';
import createHistory from 'history/createHashHistory';

export default class HashProvider extends React.Component {
  displayName = 'SagaModelHashProvider';
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
