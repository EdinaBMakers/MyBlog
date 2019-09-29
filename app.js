'use strict';

const express = require('express');
const routes = require('./api/routes/blogRoutes');
const app = express();

routes(app);

module.exports = app;