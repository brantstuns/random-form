const express = require('express');
const chalk = require('chalk');
const index = require('../public/index.html.js');
const compression = require('compression');
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const redis = new Redis();
const retrieveSessionController = require('./controllers/retrieveSessionController');

module.exports = {
  getApp: (app = express()) => {
    app.use(compression());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/saveForm', async (req, res) => {
      const { sessionId, email, form } = req.body;

      if (sessionId && email && form) {
        try {
          await redis.hset(email, sessionId, JSON.stringify(req.body));
          return res.sendStatus(200);
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    });

    app.get('/getSession/:user', retrieveSessionController(redis));
    app.get('/getSession/:user/:session', retrieveSessionController(redis));

    app.use('/*', (req, res) => res.send(index()));

    return app;
  },
  start: (port, app) => {
    app.listen(port, () =>
    // Probably want to replace this with a logger like winston
    /* eslint-disable */
      console.log(`\n${chalk.black('~'.repeat(28))}`
        + `\n${chalk.yellow.underline.bold(`Server started on port: ${port}`)}`
        + `\n${chalk.black('~'.repeat(28))}\n`));
    /* eslint-enable */
  }
};