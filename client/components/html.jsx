import ReactDOM from 'react-dom/server';
import React from 'react';

export default function Html(props) {
  const { store, children } = props;
  const content = children ? ReactDOM.renderToString(children) : '';
  return (
    <html>
      <head>
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={{__html: content}} />
        <script dangerouslySetInnerHTML={{__html: `window.__data = ${JSON.stringify(store.getState())};`}} />
        <script src='/client.js' />
      </body>
    </html>
  );
}

Html.propTypes = {
  store: React.PropTypes.object.isRequired,
  component: React.PropTypes.element
};
