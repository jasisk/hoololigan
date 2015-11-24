export default function routes(router) {
  router.get('/', function (req, res) {
    res.send('<!doctype html><html><head></head><body><div id="content"></div><script src="/client.js"></script></body></html>');
  });
}

module.exports = routes;
