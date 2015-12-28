//
// HISTORY CONTROLLER
//
// This controller controls the history screen
//
var app = angular.module('h4b');
// CONTROLLER
//
app.controller('HistoryController', function($scope, $location, $route, DataFactory, DataService) 
{
  // @HACK TEMP
  //
  $scope.userid = "A12345";

  // @HACK TEMP
  //
  var d = new DataFactory();
  $scope.userref = d.getUser($scope.userid);
  var obj = d.getData($scope.userref);
  obj.$bindTo($scope,"user"); 


});