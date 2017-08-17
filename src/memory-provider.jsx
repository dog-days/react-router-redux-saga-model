import React from 'react';
import PropTypes from 'prop-types';
import Provider from './provider';
import createHistory from 'history/createMemoryHistory';

export default class MemoryProvider extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
  };
  displayName = 'SagaModelMemoryProvider';
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
