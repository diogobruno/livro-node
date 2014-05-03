
/**
 * Module dependencies.
 */

var express = require('express')
, app = express()
, load = require('express-load')
, error = require('./middleware/error');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('Ntalk'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

load('models', {verbose: true})
  .then('controllers')
  .then('routes')
  .into(app);

app.use(error.noFound);
app.use(error.serverError);

app.listen(3000, function(){
  console.log("Ntalk no ar.");
});