var http = require('http');
var path = require('path');
var fs = require('fs');

var hostname='localhost';

var port=3000;

var server = http.createServer(function (req, res) {

    console.log(`Request for ${req.url} by method ${req.method}`);
    if(req.method==='GET'){
        var fileUrl=req.url;
        if(fileUrl=== '/'){ //http://localhost:3000/
            fileUrl='/index.html';//http://localhost:3000/index.html
    }
//define the file path to public folder
    var filePath=path.resolve('./public'+fileUrl); //public/index.html
    var fileExt=path.extname(filePath);

    if(fileExt==='.html'){
        fs.access(filePath,function(err){
            if(err){
                res.statusCode=404;
                res.setHeader('Content-Type','text/html');
                res.end(`<html><body><h1>Error 404:${fileUrl} not found </h1></body></html>`)
            return;
        }
        res.statusCode=200;
        res.setHeader('Content-Type','text/html');
        fs.createReadStream(filePath).pipe(res);
            });
    }else{
        res.statusCode=404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>Error 404:${fileUrl} not found </h1></body></html>`)
    }
}else{
    res.statusCode=404;
    res.setHeader('Content-Type','text/html');
    res.end(`<html><body><h1>Error 404:${fileUrl} not surpported </h1></body></html>`)
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});