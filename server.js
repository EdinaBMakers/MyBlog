'use strict';

const express = require('express');
const app = require('./app');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.listen(port);

console.log(`Server is listening on port ${port}. Ready to accept requests!`);