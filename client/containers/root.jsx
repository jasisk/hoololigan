import createBrowserHistory from 'history/lib/createBrowserHistory';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, RoutingContext } from 'react-router';
import DevTools from './dev-tools';
import routes from '../routes';

const Root = props => {
  let router;
  if (process.env.BROWSER) {
    router = <Router history={createBrowserHistory()} routes={routes} />;
  } else {
    //router = <Router history={createBrowserHistory()} routes={routes} />;
    router = <RoutingContext {...props.renderProps} />
  }
  return (
    <Provider store={props.store}>
      <div>
        {router}
        { process.env.NODE_ENV === 'development' ? <DevTools /> : '' }
      </div>
    </Provider>
  );
};

export default Root;
