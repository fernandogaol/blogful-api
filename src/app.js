require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const ArticlesService = require('./articles-service');
const errorHandler = require('./errorHandler');
const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/articles', (req, res, next) => {
  const KnexInstance = req.app.get('db');
  ArticlesService.getAllArticles(KnexInstance)
    .then(articles => {
      res.json(articles);
    })
    .catch(next);
});
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/articles/:article_id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  ArticlesService.getById(knexInstance, req.params.article_id)
    .then(articles => {
      res.json(articles);
    })
    .catch(next);
});

app.use(errorHandler);

module.exports = app;
