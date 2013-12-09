var fs = require('fs');

fs.readdir(__dirname, function(erro, contents){

	if(erro) { throw erro; }

	contents.forEach(function(contet){
		
		var path = './' + contet;
		
		fs.stat(path, function(erro, stat){

			if (erro) { throw erro; }
			if (stat.isFile()) {
				console.log('%s %d bytes', contet, stat.size);	
			}

		});

	});

});