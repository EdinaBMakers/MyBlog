'use strict';

const blogController = require('../controllers/blogController');

module.exports = app => {
  app.route('/get-posts').get(blogController.getPosts);
  app.route('/create-post').post(blogController.createPost);
}