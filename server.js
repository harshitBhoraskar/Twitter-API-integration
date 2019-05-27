var express = require('express');
const cors = require('cors');
var app = express();

app.use(cors({ origin: true }));
app.use(express.static('app')); // myApp will be the same folder name.
// cors = require('cors');
//  app.use(cors());
app.options('*',cors())
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, x-email-id, x-device-id, x-device-token, x-device-type, role, role-region, admin, user-id, type, userid, self")
res.header('Access-Control-Allow-Origin', '*')
 res.header( "Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 res.header("Access-Control-Expose-Headers", "organizationId, cardConfigVersion")
  next();
});

app.get('/', function (req, res,next) {
 res.redirect('/');
});
app.listen(8080, () => console.log(`Example app listening on port `))
