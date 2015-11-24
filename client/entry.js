import configureStore from './store';
import Root from './containers/root';
import ReactDOM from 'react-dom';
import React from 'react';
import DB from '../db/super-amazing-nosql-cassandra-rethink-mongo-hyper-turbo-shard-cdrom-database';


export default function init(nodeId = 'content') {
  const node = document.getElementById(nodeId);
  const store = configureStore(DB);

  ReactDOM.render(<Root store={store} />, node); 
}

init();
