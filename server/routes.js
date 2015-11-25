import React from 'react';
import entry from './entry';
import ReactDom from 'react-dom/server';
import { match } from 'react-router';
import routes from '../client/routes';

module.exports = function (router) {
  router.get('*', function (req, res) {
    //res.send('<!doctype html><html><head></head><body><div id="content"></div><script src="/client.js"></script></body></html>');
		match({ routes, location: req.path }, (error, redirectLocation, renderProps) => {
			if (error) {
				res.status(500).send(error.message)
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search)
			} else if (renderProps) {
				res.status(200).send(entry(renderProps))
			} else {
				res.status(404).send('Not found')
			}
		})
  });
}
