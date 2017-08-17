import React from 'react';
import PropTypes from 'prop-types';
import Provider from './provider';
import createHistory from 'history/createBrowserHistory';

export default class BrowserProvider extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
  };
  displayName = 'SagaModelBrowserProvider';
  history = createHistory(this.props);
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
