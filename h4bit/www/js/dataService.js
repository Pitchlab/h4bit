//
// DATA SERVICE
//
// This controller controls the canvas list and subparts of it
//
var app = angular.module('h4b');

// BELOW SHOULD FIX THE BINDING ISSUE AND MAKE IT POSSIBLE TO CREATE SEPARATE SUB OBJECTS
// FOR EACH "tier".
// HOWEVER: While three-way data bindings can be extremely convenient,
// be careful of trying to use them against deeply nested tree structures. 
// For performance reasons, stick to practical uses like synchronizing key / value
// pairs that aren't changed simultaneously by several users. 
// Do not try to use $bindTo() to synchronize collections or lists of data.
//
// // a factory to create a re-usable Profile object
// // we pass in a username and get back their synchronized data as an object
// app.factory("Profile", ["$firebaseObject",
//   function($firebaseObject) {
//     return function(username) {
//       // create a reference to the database where we will store our data
//       var randomRoomId = Math.round(Math.random() * 100000000);
//       var ref = new Firebase("https://docs-sandbox.firebaseio.com/af/obj/bindto/" + randomRoomId);
//       var profileRef = ref.child(username);

//       // return it as a synchronized object
//       return $firebaseObject(profileRef);
//     }
//   }
// ]);

// app.controller("ProfileCtrl", ["$scope", "Profile",
//   function($scope, Profile) {
//     // create a three-way binding to our Profile as $scope.profile
//     Profile("physicsmarie").$bindTo($scope, "profile");
//   }
// ]);

// Data Factory
//
app.factory('DataFactory', function($firebaseObject) {
  
  var DataFactory = function()
  {    
  };

  // get the FB object back
  //
  DataFactory.prototype.getData = function(ref)
  {
    return $firebaseObject(ref); 
  };

  // get a specific user by id
  //
  DataFactory.prototype.getUser = function(userid)
  {
    console.log(userid);
    return new Firebase("https://h4b.firebaseio.com/users/").child(userid);   
  };  

  // get actions for a specific user by id
  //
  DataFactory.prototype.getUserActions = function(userid)
  {
    console.log(userid);
    return new Firebase("https://h4b.firebaseio.com/users/").child(userid).child("actions");   
  };  

  // get history for a specific user by id
  //
  DataFactory.prototype.getUserHistory = function(userid)
  {
    console.log(userid);
    return new Firebase("https://h4b.firebaseio.com/users/").child(userid).child("history");   
  };  



  return DataFactory;
});

//
app.service('DataService', function() 
{    
  // -----------------------------------------
  // COMMON
  // -----------------------------------------
  //
  // deleteData
  // delete data
  //
  // list : reference to list
  // id : id in list
  //
  this.deleteData = function(list, id)
  {
    list.child(id).set({});

    return true;
  }

  // copyData 
  // copy data
  //
  // list    : reference to list
  // id      : id in list
  // returns : ref to new item
  //
  this.copyData = function(list, id)
  {  
    list.child(id).once("value", function(snapshot) 
    {
      var data = snapshot.val();      
      var ref = projectlist.push(data);

      return ref;
    });    
  };

  // -----------------------------------------
  // USER
  // -----------------------------------------
  //
  // addUser
  // add a new user
  //
  // userlist: firebase ref to user list  
  //
  this.addUser = function(userlist, username)
  {
    
    var user = {
      "username" : username,
      "gold"    : 100,
      "xp"      : 0
    };
 
    var ref = userlist.push(user);    

    return ref;
  }

  // deleteUser
  // delete user and all its data
  //
  // userlist: firebase ref to user list  
  // id : user id
  //
  this.deleteUser = function(userlist, id)
  {
    return this.deleteData(userlist, id);
  }

  // -----------------------------------------
  // ACTIONS
  // -----------------------------------------
  // addAction
  // add a new  action
  //
  // actionlist: firebase ref to action list
  //
  this.addAction = function(actionlist)
  {
    var action = {
      "name"    : "(name)",
      "descr"   : "(descr)",
      "gold"    : 0,
      "xp"      : 0
    };

    var ref = actionlist.push(state);    

    return ref;
  }

  // deleteAction
  // delete the action
  //
  // actionlist: firebase ref to action list
  // id : action id
  //
  this.deleteAction = function(actionlist, id)
  {
    return this.deleteData(actionlist, id);
  }

  // copyAction
  // copy action with all contents
  // @TODO: fix the updates...
  //
  // actionlist: firebase ref to state list
  //
  this.copyAction = function(actionlist, id)
  {  
    return this.copyData(actionlist, id);
  };

  

  // // -----------------------------------------
  // // POSTITS
  // // -----------------------------------------
  // //
  // // getCanvasNrOfPostits
  // // canvas: firebase ref to canvas
  // //
  // this.getCanvasNrOfPostits = function(canvas) {

  //   var i = 0;
  //   for(var bbKey in canvas.buildingblocks)
  //   {        
  //     var bb = canvas.buildingblocks[bbKey];
  //     for(var pKey in bb.postits)
  //     {        
  //       var p = bb.postits[pKey];
  //       i++;
  //     }    
  //   }

  //   return i;
  // };

  // // add a new post it to the canvas
  // //
  // this.addPostIt = function(user, canvas, bb_id)
  // {
  //   // for now add to bb id=1 (center)
  //   //
  //   if (bb_id == null)
  //   {
  //     bb = canvas.child("buildingblocks").child("bb-0");
  //   }
  //   else
  //   {
  //     bb = canvas.child("buildingblocks").child("bb-" + bb_id); 
  //   }

  //   // post it
  //   //
  //   var p = {
  //     "postit" : "(new)",
  //     "color" : "pink",
  //     "x" : "50",
  //     "y" : "50"
  //   };

  //   var newPostIt = bb.child("postits").push(p);

  //   // set updated
  //   //
  //   this.update(user, canvas,"add_postit", newPostIt.key());
  // }; 

  // this.deletePostit = function(user, canvas, id)
  // {
  //   // find the post-it in its BB
  //   //
  //   var bb = findCurrentBuildingBlockForPostIt(canvas, id);

  //   canvas.child("buildingblocks").child(bb).child(id).set({});        

  //   // set updated
  //   //
  //   this.update(user, canvas, "delete_postit", id);
  // };

  // this.findCurrentBuildingBlockForPostIt = function(canvas, id) 
  // {
  //   var result = null;

  //   canvas.child("buildingblocks").once("value", function(snapshot) 
  //   {
  //     snapshot.forEach(function(bb) {

  //       var bbKey = bb.key();

  //       bb.child("postits").forEach(function(p) {
          
  //         var pKey = p.key();

  //         if (pKey === id)
  //         {
  //           result = bbKey;
  //           return;
  //         }
  //       });

  //     });
  //   });

  //   return result;
  // };

  // this.copyPostit = function(user, canvas, id)
  // {
  //   var self = this;

  //   var bb = this.findCurrentBuildingBlockForPostIt(canvas, id);

  //   canvas.child("buildingblocks").child(bb).child(id).once("value", function(snapshot) {
  //     var data = snapshot.val();      
  //     var cref = canvas.child("buildingblocks").child(bb).push(data);

  //     self.update(user, cref, "copy_postit", id)

  //     return cref;
  //   }); 
  // };

  // // add a new post it to the canvas
  // //
  // this.postItColor = function(user, canvas, id, color)
  // {
  //   var self = this;

  //   var bb = this.findCurrentBuildingBlockForPostIt(canvas, id);  
  //   console.log(bb + " " + id);    

  //   canvas.child("buildingblocks").child(bb).child("postits").child(id).child("color").set(color);    

  //   //this.update(user, canvas, "change_color", id);
  // };

  
});


app.filter('toArray', function () {
  'use strict';

  return function (obj) {
      if (!(obj instanceof Object)) {
          return obj;
      }

      return Object.keys(obj).map(function (key) {
          return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
      });
  };
});