'use strict';

const express = require('express');
const routes = require('./api/routes/blogRoutes');
const formidable = require('express-formidable');
const app = express();

app.use(formidable());

routes(app);

module.exports = app;