'use strict';

const bodyParser = require('body-parser')
const express = require('express');
const routes = require('./api/routes/blogRoutes');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app);

module.exports = app;