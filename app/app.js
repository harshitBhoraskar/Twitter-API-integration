var myApp = angular.module('myApp',[]);
var consumerKey = 'VQBS0hroJa0MrbQG0wSFoI0H1'; // consumer key
var consumerSecret = 'afCwcK5tqiciBtN4BSAzoJq5jP5a6Qdjq6X0TlVqtd1RPhlj3l'; // consumer secret
var toEncodeString = consumerKey+ ':' + consumerSecret; // strings concated
var encodedString = window.btoa(toEncodeString); // concated string converted to base64


myApp.controller('mainController',  [ '$http', '$sce' ,'$q' ,function mainController ($http , $sce ,$q){
  var mainCtrl = this;
  mainCtrl.getToken = getToken;
  mainCtrl.init = init();
  mainCtrl.getData = getData;
  mainCtrl.fetchFollowers = fetchFollowers;
  mainCtrl.tweets = [];
  mainCtrl.tabOne = true;
  mainCtrl.tabTwo = false;

  // this function initialises all the required functions
  function init(){
    mainCtrl.getToken();
  }

// Function to get bearer token using Consumer Key
  function getToken(){
    $http({
      method : 'POST',
      url : 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token?grant_type=client_credentials',
      headers : {
        'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization' : "Basic " + encodedString
      }
    }).then(function (data){
      mainCtrl.token = data.data.access_token;
      getData();
    })
  }

// fetch tweets
  function getData(){
    $http({
      method :'GET',
      url :'https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=https://twitter.com/NASA&count=50',
      header: {
        'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization' : "Bearer " + mainCtrl.token
      }
    }).then(function (data){
      mainCtrl.data = data.data;
      mainCtrl.html = mainCtrl.data.html;
  })

}

  function fetchFollowers(){
    var deferred = $q.defer();
    $http({
        method :'GET',
        url :'https://api.twitter.com/1.1/followers/ids.json?cursor=-1&screen_name=NASA&count=10',
        header: {
          'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization' :"Bearer "+ mainCtrl.token,
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function (data){
        if(data.data == 'success'){

        } else if(data.data.status == 'failure')
        {
          deferred.resolve()
        }
        return deferred.promise;

    }).catch(function (err) {
      console.log('Exception log');
      console.log(err);
     throw err;
});
  }
}])

// to render HTML received in JSON
.filter('trustHtml',function($sce){
  return function(html){
    return $sce.trustAsHtml(html)
  }
})
