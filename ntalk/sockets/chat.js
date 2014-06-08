module.exports = function(io) {
  var crypto = require('crypto')
    , md5 = crypto.createHash('md5')
    , sockets = io.sockets;
  sockets.on('connection', function(client) {
    var session = client.handshake.session
    , usuario = session.usuario;
    
    //create chat room
    client.on('join', function(sala) {
      if(sala) {
        sala = sala.replace('?', '');
      } else {
        var timestamp = new Date().toString();
        var  md5 = crypto.createHash('md5');
        sala = md5.update(timestamp).digest('hex');
      }
      client.set('sala', sala);
      client.join(sala);
      console.log('join sala: ' + sala)
    });

    // disconnect client
    client.on('disconnect', function() {
      client.get('sala', function(erro, sala){
        client.leave(sala);
      });
    });
    
    //send message
    client.on('send-server', function(msg) {
      var msg =  "<b>" + usuario.nome + ": </b> " + msg + "<br>";
      
      client.get('sala', function(erro, sala) {
        var data = {email: usuario.email, sala: sala};
        client.broadcast.emit('new-message', data);
        sockets.in(sala).emit('send-client', msg);
      });

    });

  });
};