import React from 'react';
import Provider from './provider';
import createHistory from 'history/createBrowserHistory';

export default class BrowserProvider extends React.Component {
  displayName = 'SagaModelBrowserProvider';
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
