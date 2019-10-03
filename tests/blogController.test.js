'use strict';

const request = require('supertest');
const app = require('../app');

jest.mock('fs');

const fs = require('fs');
let dateSpy;

const setTime = time => {
  dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => time);
}

describe('blogController', () => {

  beforeEach(() => {
    fs.__resetMock();
    setTime(0);
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

    test('It responds with error if cannot read posts', (done) => { 
      let errorMessage = 'File not found';

      fs.__givenFileError(errorMessage);
      
      request(app).get('/get-posts').then((response) => {
        expect(response.status).toStrictEqual(500);
        done();
      });
    });
  });

  describe('createPosts', () => {
    test('It can handle post create posts route', (done) => {
      request(app).post('/create-post').then((response) => {
        expect(response.status).toBe(200);
        done();
      });
    });

    test('It responds with post when first post added', (done) => {        
      const expectedTime = 111;
      const expectedPost = 'test post';
      
      setTime(expectedTime);

      request(app)
        .post('/create-post')
        .send(`blogpost=${expectedPost}`)
        .then((response) => {
          expect(response.body).toStrictEqual({[expectedTime]: expectedPost});
          done();
      });
    });

    test('It responds only with the last post when new post added', (done) => {        
      const firstPostTime = 111;
      const firstPost = 'test post 1';
      
      setTime(firstPostTime);

      request(app)
        .post('/create-post')
        .send(`blogpost=${firstPost}`)
        .then((response) => {
          expect(response.body).toStrictEqual({[firstPostTime]: firstPost});

          const secondPostTime = 112;
          const secondPost = 'test post 2';
          
          setTime(secondPostTime);

          request(app)
          .post('/create-post')
          .send(`blogpost=${secondPost}`)
          .then((response) => {
            expect(response.body).toStrictEqual({[secondPostTime]: secondPost});
            done();
        });
      });
    });

    test('It appends new post to the file', (done) => {
      const existingPostTime = 111;
      const existingPost = "test post";
      let fileContent = {[existingPostTime]: existingPost};

      fs.__givenFileContent(fileContent);

      const newPostTime = 112;
      const newPost = 'new test post';
      
      setTime(newPostTime);

      request(app)
        .post('/create-post')
        .send(`blogpost=${newPost}`)
        .then((createPostResponse) => {
          expect(createPostResponse.body).toStrictEqual({[newPostTime]: newPost});

          request(app).get('/get-posts').then((getPostsResponse) => {
            expect(getPostsResponse.body).toStrictEqual({
              [existingPostTime]: existingPost,
              [newPostTime]: newPost
            });
            done();
          });
      });
    });

    test('It responds with error if cannot create post', (done) => { 
      let errorMessage = 'File not found';

      fs.__givenFileError(errorMessage);
      
      request(app).post('/create-post').then((response) => {
        expect(response.status).toStrictEqual(500);
        done();
      });
    });
  });
});