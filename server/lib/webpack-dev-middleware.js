import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';
import webpack from 'webpack';

export default function webpackDev(config) {
  const compiler = webpack(config);
  const devMiddleware = dev(compiler, {
    contentBase: 'http://127.0.0.1:8000',
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
  });
  const hotMiddleware = hot(compiler, { log: console.log });

  return function chain(req, res, done) {
    const middlewares = [devMiddleware, hotMiddleware];
    function next(err) {
      let middleware;
      if (err) { return done(err); }
      if (middleware = middlewares.shift()) {
        middleware(req, res, next);
      } else {
        done();
      }
    }
    next();
  }
}

module.exports = webpackDev;
