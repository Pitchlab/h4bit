var app = angular.module('h4b');

// content editable 
//
app.directive("contenteditable", function() 
{
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) 
    {

      // Write data to the model
      // use the .text rather than .html so we have no weird input.
      //
      function read() {
        var text = element.text();              
        ngModel.$setViewValue(text);
      }

      if(!ngModel) return; // do nothing if no ng-model

      ngModel.$render = function() 
      {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() 
      {        
        scope.$apply(read);        
      });      
    }
  };
});