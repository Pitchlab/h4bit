var app = angular.module('h4b');

// This makes any element draggable
// Usage: <div draggable>Foobar</div>
// Adapted from https://gist.github.com/codef0rmer/3975207
//
// Expects:
// Controller to register handler functions in scope
// $scope.handleDrag = function(element, attrs) -- called when draggable is declared
// $scope.handleDrop = function(dragIndex, reject, dragged, dragSource, dropTarget) -- called on drop
//
app.directive('draggable', function() 
{
  return {
    // A = attribute, E = Element, C = Class and M = HTML Comment
    //
    restrict: 'A',
    
    // The link function is responsible for registering DOM listeners as well as updating the DOM.
    //
    link: function(scope, element, attrs) 
    {    
      //try 
      //{
        scope.handleDrag(element, attrs);
      //}
      //catch (error)
      //{
      //  throw new Error("Draggable Directive expects $scope.handledrag(...) to be declared!");
      //}      
    }
  }
});

// This makes any element droppable
// Usage: <div droppable></div>
//
app.directive('droppable', function($compile) 
{
  return {
    restrict: 'A',
    link: function(scope,element,attrs)
    {
      // This makes an element Droppable using jquery
      //
      element.droppable(
      {
        hoverClass: "highlight",

        // the function called when dropped
        //
        drop: function(event,ui) 
        {          
          // get a few things straight about the dropped object
          //
          var dragIndex   = angular.element(ui.draggable).data('index');
          var reject      = angular.element(ui.draggable).data('reject');
          var dragged     = angular.element(ui.draggable);
          var dragSource  = angular.element(ui.draggable).parent();
          var dropTarget  = angular.element(this);    

          //try 
          //{
            scope.handleDrop(dragIndex, reject, dragged, dragSource, dropTarget);  
          //}
          //catch (error)
          //{
          //  throw new Error("Droppable Directive expects $scope.handledrop(...) to be declared!");
          //}
        }
      });
    }
  };
});    
