import Kraken from 'kraken-js';
import Express from 'express';

const app = Express();

app.use(Kraken());

app.on('start', () => {
  app.listen(app.kraken.get('PORT'), function () {
    const port = this.address().port || this.address();
    app.swagger.api.host = `127.0.0.1:${port}`;
    console.log(`Listening on ${port} ...`);
  });
});
