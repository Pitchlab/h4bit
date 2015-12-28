//
// CONFIG
// Routing etc
//

// phonegap 
// we need to configure the router to whitelist file URIs. 
// http://stackoverflow.com/questions/15105910/angular-ng-view-routing-not-working-in-phonegap
//


angular.module('h4b', ["ngRoute", "firebase"])


.config(function($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/home', {
        templateUrl  : 'partials/main.html',
        controller   : 'MainController',
        controllerAs : 'mainCtrl'
    })

    // route for the history page
    .when('/history', {
        templateUrl  : 'partials/history.html',
        controller   : 'HistoryController',
        controllerAs : 'historyCtrl'
    })

    // default
    .otherwise({
        redirectTo: '/home'
    });
});
