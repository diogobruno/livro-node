exports.index = function(req, res) {
  res.render('home/index');
};

exports.contato = function(req, res) {
  res.send('contato');
};