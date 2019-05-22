var myApp = angular.module('myApp',[]);
var consumerKey = 'IKFVH2PtRx7I0epBJPO5lD4Rz'; // consumer key
var consumerSecret = 'cx0ZZISYZMAU4W5ZjsTFPkKaW9g7JKdwbzf3WMGnng2LxIUgb8'; // consumer secret
var toEncodeString = consumerKey+ ':' + consumerSecret; // strings concated
var encodedString = window.btoa(toEncodeString); // concated string converted to base64


myApp.controller('mainController',  [ '$http', '$sce' ,function mainController ($http , $sce){
  var mainCtrl = this;
  mainCtrl.getToken = getToken;
  mainCtrl.init = init();
  mainCtrl.getData = getData();
  mainCtrl.tweets = [];

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
      mainCtrl.token = data.data.token;
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
        'Authorization' : "Bearer " + mainCtrl.token,
      }
    }).then(function (data){
      mainCtrl.data = data.data;
      mainCtrl.html = mainCtrl.data.html;
    })
  }

}])

// to render HTML received in JSON
.filter('trustHtml',function($sce){
  return function(html){
    return $sce.trustAsHtml(html)
  }
})
