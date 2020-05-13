let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function(req, res){
    const fileName = url.parse(req.url, true);
    let file = "." + fileName.pathname;
    if (file === "./"){ file = "./index.html";}
    fs.readFile(file, function(err, data) {
        if (err) {
                fs.readFile('./error.html', function(err, data) {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        return res.end("404 Not Found");
                    }
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    return res.end();
                })
            } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
            }
    });
}).listen(8080);