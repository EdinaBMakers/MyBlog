'use strict';

const fs = require('fs');

exports.getPosts = (req, res) => {
  fs.readFile('data/posts.json', function (error, file) {
    if (error == null) {
      res.json(file);
    } else {
      res.status(500).send(error);
    }
  });
};

exports.createPost = (req, res) => {
  const timestamp = Date.now();
  const post = req.body.blogpost;

  res.json({[timestamp]: post});
}