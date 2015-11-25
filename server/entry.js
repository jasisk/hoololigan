import configureStore from '../client/store';
import Root from '../client/containers/root';
import ReactDOM from 'react-dom/server';
import React from 'react';
import HTML from '../client/components/html';
import DB from '../db/super-amazing-nosql-cassandra-rethink-mongo-hyper-turbo-shard-cdrom-database';

export default function init(renderProps) {
  const store = configureStore(DB);
  return `<!doctype html> ${ReactDOM.renderToStaticMarkup(<HTML store={store}><Root renderProps={renderProps} store={store} /></HTML>)}`; 
}
