import React from 'react';
import App from '../containers/app';

const SuperFan = (props) => (
  <div>SPECIAL LINK FOR SUPERFANS ONLY!</div>
);

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'super', component: SuperFan }
  ]
};

export default routes;
