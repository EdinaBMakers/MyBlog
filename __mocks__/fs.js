'use strict';

const mockfs = jest.genMockFromModule('fs');
let fileContent = JSON.stringify({});
let errorMessage = null;

function __givenFileContent(expectedFileContent) {
  this.errorMessage = null;
  this.fileContent = JSON.stringify(expectedFileContent);
}

function __givenFileError(errorMessage) {
  this.errorMessage = errorMessage;
  this.fileContent = null;
}

function __resetMock() {
  this.fileContent = JSON.stringify({});
  this.errorMessage = null;
}

function readFile(path, callback, data) {
  if (this.errorMessage == null) {
    callback(null, this.fileContent);
  } else {
    callback(this.errorMessage, null);
  }
}

function writeFile(path, data, callback) {
  this.fileContent = JSON.stringify(data);
}

mockfs.__givenFileContent = __givenFileContent;
mockfs.__givenFileError = __givenFileError;
mockfs.__resetMock = __resetMock;
mockfs.readFile = readFile;
mockfs.writeFile = writeFile;

module.exports = mockfs;