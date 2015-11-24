import ReactDOM from 'react-dom';
import React from 'react';

export default function Html(props) {
  const { store, component } = this.props;
  const content = component ? ReactDOM.renderToString(component) : '';
  return (
    <html>
      <head>
        <title>{title}</title>
        <link href='app.css' rel='stylesheet' type='text/css' />
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={{__html: content}} />
        <script dangerouslySetInnerHTML={{__html: `window.__data = ${store.getState()};`}} />
        <script src='client.js' />
      </body>
    </html>
  );
}

Html.propTypes = {
  store: React.PropTypes.object.isRequired,
  component: React.PropTypes.element
};
