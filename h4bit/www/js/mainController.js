//
// MAIN CONTROLLER
//
// This controller controls the main screen
//

var app = angular.module('h4b');
// CONTROLLER
//
app.controller('MainController', function($scope, $location, $route, DataFactory, DataService) 
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

  // handle an action click
  //
  $scope.handleClick = function(action)
  {
    $scope.userref.child("xp").set($scope.user.xp + action.xp); 
    $scope.userref.child("gold").set($scope.user.gold + action.gold); 

    // add a new history action. 
    var date = new Date().toJSON();
    var historyItem = {
      "datetime": date,
      "gold": action.gold,
      "name": action.name,
      "xp": action.xp
    }

    //console.log(historyItem);
    var historyref = d.getUserHistory($scope.userid);
    historyref.push().set(historyItem);

  }

});