var express = require('express');
const cors = require('cors');
var app = express();

app.use(cors({ origin: true }));
app.use(express.static('app')); // myApp will be the same folder name.
app.options('*',cors())
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*')
 res.header( "Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res,next) {
 res.redirect('/');
});
app.listen(8080, () => console.log(`App Running is 8080 port `))
