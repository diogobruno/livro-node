var fs = require('fs');

var inicio = new Date().getTime();

for(var i = 1; i <= 5; i++){
	var file = "sync-txt" + i + ".txt";
	var out = fs.writeFileSync(file, "Hello Node.js!");
	console.log(out);
}

var fim = new Date().getTime();

console.log("Bloqueio sincrono: " + (fim - inicio) +"ms");