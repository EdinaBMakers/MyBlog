'use strict';

const request = require('supertest');
const app = require('../app');

describe('blogController', () => {
  test('It can handle get posts route', (done) => {
    request(app).get('/get-posts').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});