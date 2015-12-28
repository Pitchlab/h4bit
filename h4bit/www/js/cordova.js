// Setting up angular to run correctly
// http://mobileangularui.com/blog/using-the-generator/

angular.module('h4b', [])

.factory('deviceReady', function(){
  return function(done) {
    if (typeof window.cordova === 'object') {
      document.addEventListener('deviceready', function () {
        done();
      }, false);
    } else {
      done();
    }
  };
});