'use strict';

const fs = require('fs');

exports.getPosts = (req, res) => {
  fs.readFile('data/posts.json', function (error, file) {
    if (error == null) {
      res.json(JSON.parse(file));
    } else {
      res.status(500).send(error);
    }
  });
};

exports.createPost = (req, res) => {
  const timestamp = Date.now();
  const post = req.body.blogpost;

  fs.readFile('data/posts.json', function (error, file) {
    if (error == null) {
      let blog = JSON.parse(file);

      blog[timestamp] = post;

      fs.writeFile('data/posts.json', blog, function (error) {
        console.log('done');
      });

      res.json({[timestamp]: post});
    } else {
      res.status(500).send(error);
    }
  });
}