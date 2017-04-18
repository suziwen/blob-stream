# file-system-stream

A Node-style writable stream for [HTML5 File System API](http://dev.w3.org/2009/dap/file-system/pub/FileSystem/), 
mostly useful in [Browserify](http://browserify.org/).  Allows you to take the output of any Node stream,
and turn it into FileSystem for opening in the browser, uploading to a server, etc.

## Example

```javascript
var fileSystemStream = require('file-system-stream');

var onInitFs = function(){
  fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry){
      fileEntry.createWriter(function(fileWriter) {
          someStream
            .pipe(fileSystemStream(fileEntry, writer))
            .on('finish', function() {
              // get a blob
              window.open(fileEntry.toURL());
            });
          
        }, function(err){console.log(err);})
    }, function(err){console.log(err);});
}


window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);
```

## License

MIT
