import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import testModel from './testModel';

function getStore() {
  var store = this.context.sagaStore;
  store.register(testModel);
  return store;
}
@connect(state => {
  return {
    display: state.test,
  };
})
export default class Test extends React.Component {
  static contextTypes = {
    sagaStore: PropTypes.object,
  };
  store = getStore.bind(this)();
  showToggleEvent = e => {
    const { dispatch, display } = this.props;
    if (display) {
      dispatch({
        type: 'test/toggleShow',
        payload: false,
      });
    } else {
      dispatch({
        type: 'test/toggleShow',
        payload: true,
      });
    }
  };
  render() {
    //console.log(this.store);
    const { display } = this.props;
    return (
      <div>
        <button onClick={this.showToggleEvent}>
          {display && '隐藏'}
          {!display && '显示'}
        </button>
        {display && <div>我被显示了</div>}
      </div>
    );
  }
}
