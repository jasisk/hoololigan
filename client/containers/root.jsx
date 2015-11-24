import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../containers/app';
import DevTools from './dev-tools';

const Root = props => (
  <Provider store={props.store}>
    { process.env.NODE_ENV === 'development' ?
      <div>
        <App />
        <DevTools />
      </div> :
      <App /> }
  </Provider>
);

export default Root;
