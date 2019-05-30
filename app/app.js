var myApp = angular.module('myApp',[]);
var consumerKey = 'VQBS0hroJa0MrbQG0wSFoI0H1'; // consumer key
var consumerSecret = 'afCwcK5tqiciBtN4BSAzoJq5jP5a6Qdjq6X0TlVqtd1RPhlj3l'; // consumer secret
var toEncodeString = consumerKey+ ':' + consumerSecret; // strings concated
var encodedString = window.btoa(toEncodeString); // concated string converted to base64


myApp.controller('mainController',  [ '$http', '$sce' ,'$q' ,function mainController ($http , $sce ,$q){
  var mainCtrl = this;
  mainCtrl.getToken = getToken;
  mainCtrl.getData = getData;
  mainCtrl.init = init();
  mainCtrl.fetchFollowers = fetchFollowers;
  mainCtrl.tweets = [];
  mainCtrl.tabOne = true;
  mainCtrl.tabTwo = false;

  // this function initialises all the required functions
  function init(){
    mainCtrl.getToken();
    mainCtrl.getData();

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
    })
  }

// fetch tweets
  function getData() {
  $http({
    method : 'GET',
    url : 'http://localhost:8080/getTweets'
    ,
    header: {
          'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8'
        }
  }).then(function (data){
    mainCtrl.tweets = data.data;
  })
}

  function fetchFollowers(){
    var deferred = $q.defer();
    $http({
        method :'GET',
        url  :'http://localhost:8080/twitterFollowers',
        header: {
          'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization' :"Bearer "+ mainCtrl.token,
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function (data){
        if(data.status == 200){
          mainCtrl.followers = data.data.users;

        } else if(data.status == 'failure')
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

myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
