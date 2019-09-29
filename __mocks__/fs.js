'use strict';

const mockfs = jest.genMockFromModule('fs');
let expectedFileContent = {};
let errorMessage = null;

function __givenFileContent(expectedFileContent) {
  this.errorMessage = null;
  this.expectedFileContent = expectedFileContent;
}

function __givenFileError(errorMessage) {
  this.errorMessage = errorMessage;
  this.expectedFileContent = null;
}

function __resetMock() {
  this.expectedFileContent = {};
  this.errorMessage = null;
}

function readFile(path, callback, data) {
  if (this.errorMessage == null) {
    callback(null, this.expectedFileContent);
  } else {
    callback(this.errorMessage, null);
  }
}

mockfs.__givenFileContent = __givenFileContent;
mockfs.__givenFileError = __givenFileError;
mockfs.__resetMock = __resetMock;
mockfs.readFile = readFile;

module.exports = mockfs;