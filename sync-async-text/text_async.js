var fs = require('fs');

var inicio = new Date().getTime();

for(var i = 1; i <=5; i++){
	var file = "async-text" + i + ".txt";
	fs.writeFile(file, "Helllo Node.js", function(err, out){
		console.log(out);
	})
}

var fim = new Date().getTime();

console.log("Bloqueio assincrono: " + (fim - inicio) + "ms");