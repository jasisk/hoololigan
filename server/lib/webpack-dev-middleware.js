import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';
import webpack from 'webpack';

export default function webpackDev(config) {
  const opts = {
    contentBase: 'http://127.0.0.1:8000',
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
  };

  const compiler = webpack(config);
  const devMiddleware = dev(compiler, opts);
  const hotMiddleware = hot(compiler);

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
