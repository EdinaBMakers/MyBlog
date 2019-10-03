'use strict';

const mockfs = jest.genMockFromModule('fs');
let fileContentStr = JSON.stringify({});
let errorMessage = null;

function __givenFileContent(expectedFileContent) {
  this.errorMessage = null;
  this.fileContentStr = JSON.stringify(expectedFileContent);
}

function __givenFileError(errorMessage) {
  this.errorMessage = errorMessage;
  this.fileContentStr = null;
}

function __resetMock() {
  this.fileContentStr = JSON.stringify({});
  this.errorMessage = null;
}

function readFile(path, callback, data) {
  if (this.errorMessage == null) {
    callback(null, this.fileContentStr);
  } else {
    callback(this.errorMessage, null);
  }
}

function writeFile(path, dataStr, callback) {
  this.fileContentStr = dataStr;
}

mockfs.__givenFileContent = __givenFileContent;
mockfs.__givenFileError = __givenFileError;
mockfs.__resetMock = __resetMock;
mockfs.readFile = readFile;
mockfs.writeFile = writeFile;

module.exports = mockfs;