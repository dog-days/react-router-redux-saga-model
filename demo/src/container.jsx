import React from 'react';
import { BrowserProvider as Provider } from 'react-router-redux-saga-model';
import { Route, Link } from 'react-router-dom';
import Test from './test';

export default function container(props) {
  return (
    <Provider production={process.env.NODE_ENV === 'production'}>
      <Link to="/">主页</Link>
      <br />
      <Link to="/about">关于</Link>
      <Route
        exact
        path="/"
        component={props => {
          return <div>index</div>;
        }}
      />
      <Route
        path="/about"
        component={props => {
          return <div>about</div>;
        }}
      />
      <Test hot={props.hot} />
    </Provider>
  );
}
