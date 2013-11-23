var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	var result = url.parse(request.url, true);
	var html = result.pathname.substring(1);

	if(html == ''){
		readFile('artigos', response);
	} else {
		readFile(html, response);
	}

});

function readFile(filename ,response){
	var path = __dirname + '/' + filename + '.html';
	fs.exists(path, function(exists){
		if(exists){
			fs.readFile(path, function(err, content){
				response.end(content);
			});
		} else {
			readFile('erro', response);
		}
	});
}

server.listen(3000, function(){	
	console.log('server online');
});