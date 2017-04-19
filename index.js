var WritableStream = require('stream').Writable;
var util = require('util');
var Blob = require('blob');
var URL = global.URL || global.webkitURL || global.mozURL;

function FileSystemStream(fileEntry) {
  if (!(this instanceof FileSystemStream))
    return new FileSystemStream;
    
  WritableStream.call(this);
  this.fileEntry = fileEntry;
  this.length = 0;
}

util.inherits(FileSystemStream, WritableStream);

FileSystemStream.prototype._write = function(chunk, encoding, callback) {
  // convert chunks to Uint8Arrays (e.g. Buffer when array fallback is being used)
  if (!(chunk instanceof Uint8Array))
    chunk = new Uint8Array(chunk);
    
  if (chunk.length > 0){
    var that = this;
    this.fileEntry.createWriter(function(writer){
      that.length += chunk.length;
      writer.seek(writer.length)
      writer.onwriteend = function(){
        setTimeout(function(){
          callback();
          writer.onwriteend = null;
        },100);
      }
      writer.write(new Blob([chunk], {type: 'application/octet-stream'}))
    }, function(err){console.log(err);});
  } else {
    callback();
  }
};

module.exports = FileSystemStream;
