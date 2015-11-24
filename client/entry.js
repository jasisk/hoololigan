import App from './components/app';
import ReactDOM from 'react-dom';
import React from 'react';

export default function init(nodeId = 'content') {
  const node = document.getElementById(nodeId);
  ReactDOM.render(<App />, node); 
}

init();
