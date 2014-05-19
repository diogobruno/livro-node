module.exports = function(app) {

  var ChatController = {
    index: function(req, res){
      var params = {email: req.params.email};
      res.render('chat/index', params);
    },
    diogo: function(req, res){
      res.render('chat/diogo');
    }
  };
  
  return ChatController;

};