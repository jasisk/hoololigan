import configureStore from './store';
import Root from './containers/root';
import ReactDOM from 'react-dom';
import React from 'react';

export default function init(nodeId = 'content') {
  const node = document.getElementById(nodeId);
  const store = configureStore();

  ReactDOM.render(<Root store={store} />, node); 
}

init();
