
/**
 * Module dependencies.
 */

var express = require('express')
, app = express()
, load = require('express-load')
, error = require('./middleware/error')
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('Ntalk'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

load('models', {verbose: true})
  .then('controllers')
  .then('routes')
  .into(app);

app.use(error.noFound);
app.use(error.serverError);

io.sockets.on('connection', function(client) {
  client.on('send-server', function(data){
    var msg = "<b>"+ data.nome + "</b> " + data.msg + "<br>";
    client.emit('send-client', msg);
    client.broadcast.emit('send-client', msg);
  });
});

server.listen(3000, function(){
  console.log("Ntalk no ar.");
});