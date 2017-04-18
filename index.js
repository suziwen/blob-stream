var WritableStream = require('stream').Writable;
var util = require('util');
var Blob = require('blob');
var URL = global.URL || global.webkitURL || global.mozURL;

function FileSystemStream(fileEntry, writer) {
  if (!(this instanceof FileSystemStream))
    return new FileSystemStream;
    
  WritableStream.call(this);
  this.fileEntry = fileEntry;
  this.writer = writer;
  this.length = 0;
}

util.inherits(FileSystemStream, WritableStream);

FileSystemStream.prototype._write = function(chunk, encoding, callback) {
  // convert chunks to Uint8Arrays (e.g. Buffer when array fallback is being used)
  if (!(chunk instanceof Uint8Array))
    chunk = new Uint8Array(chunk);
    
  this.length += chunk.length;
  this.writer.write(new Blob([chunk], {type: 'application/octet-stream'}))
  callback();
};

module.exports = FileSystemStream;
