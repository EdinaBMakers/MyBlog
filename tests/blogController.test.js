'use strict';

const request = require('supertest');
const app = require('../app');

jest.mock('fs');

const fs = require('fs');

describe('blogController', () => {

  beforeEach(() => {
    fs.__resetMock();
  });

  describe('getPosts', () => {

    test('It can handle get posts route', (done) => {
      request(app).get('/get-posts').then((response) => {
        expect(response.status).toBe(200);
        done();
      });
    });

    test('It responds with empty json if no post available', (done) => {  
      let expectedFileContent = {};

      fs.__givenFileContent(expectedFileContent);
      
      request(app).get('/get-posts').then((response) => {
        expect(response.body).toStrictEqual(expectedFileContent);
        done();
      });
    });

    test('It responds with post if single post available', (done) => {  
      let expectedFileContent = {[Date.now()]: "test post"};

      fs.__givenFileContent(expectedFileContent);
      
      request(app).get('/get-posts').then((response) => {
        expect(response.body).toStrictEqual(expectedFileContent);
        done();
      });
    });

    test('It responds with posts if multiple posts available', (done) => {  
      let expectedFileContent = {
        [Date.now()]: "test post 1",
        [Date.now() + 1]: "test post 2"
      };

      fs.__givenFileContent(expectedFileContent);
      
      request(app).get('/get-posts').then((response) => {
        expect(response.body).toStrictEqual(expectedFileContent);
        done();
      });
    });

    test('It responds with error if can not read posts', (done) => { 
      let errorMessage = 'File not found';

      fs.__givenFileError(errorMessage);
      
      request(app).get('/get-posts').then((response) => {
        expect(response.status).toStrictEqual(500);
        done();
      });
    });
  });
});