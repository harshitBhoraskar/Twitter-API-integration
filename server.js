var express = require('express');
const cors = require('cors');
var app = express();
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: "VQBS0hroJa0MrbQG0wSFoI0H1",
  consumer_secret:"afCwcK5tqiciBtN4BSAzoJq5jP5a6Qdjq6X0TlVqtd1RPhlj3l" ,
  bearer_token: "AAAAAAAAAAAAAAAAAAAAABYa%2BgAAAAAAn9TSgpmGlReIMAJQt%2FoCe8869rA%3De6YwxGMNSkhvfeZjpO9IrTmqZndizhOdNqWiGtwqF4hB9Y4VKP"
});



app.use(cors({ origin: true }));
app.use(express.static('app')); // myApp will be the same folder name.
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*')
 res.header( "Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 res.header("Access-Control-Expose-Headers", "organizationId, cardConfigVersion")
  next();
});

app.get('/getTweets', function (req, res,next) {
  console.log('get tweets');
  client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', { screen_name: 'twitterdev', count:'10' }, function(error, tweets, response) {
    if(error) console.log(error);
    res.status(200).send(response.body);
  });

});

app.get('/twitterFollowers', function (req, res,next) {
  console.log('get followers');
  client.get('followers/list', { screen_name: 'andypiper' }, function(error, tweets, response) {
    if(error) console.log(error);
    res.status(200).send(response.body);
  });

});
app.listen(8080, () => console.log('Example app listening on port'))
