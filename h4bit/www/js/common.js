// ------------------------------------------
// Standard Library Functions
// ------------------------------------------
// common functions go in here
// split up later when needed...
//

// ------------------------------------------
// getRandomInt
// ------------------------------------------
// Returns a random integer between min (inclusive) and max (inclusive)
// Using Math.round() will give you a non-uniform distribution!
//
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ------------------------------------------
// guid
// ------------------------------------------
// Create a random number guid
// use: var uuid = guid();
//
function guid() 
{
  function s4() 
  {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// ------------------------------------------
// stripPrefix
// ------------------------------------------
// Strip a prefix from e.g. an id
//
function stripPrefix(key, str) 
{
  return str.substring(key.length, str.length);
}

// ------------------------------------------
// countProperties
// ------------------------------------------
// Count the number of keys in an object
//
function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            count++;
    }

    return count;
}

// ------------------------------------------
// leadingZero
// ------------------------------------------
// Make the int into a string with leading zero
// if needed. 
// @WARNING this will not check if n > length!
// 
function leadingZero(n, length)
{
  var s = "";
  for (var i=0; i<length; i++)
  {
    s += "0";
  }
  return (s + n).slice(-length);
}

// ------------------------------------------
// getTimeDifferenceString
// ------------------------------------------
// get the amount of time passed back
// so 
// just now
// 5-59 minutes ago
// 1-24 hours ago
// 1-7 days ago
// date 
//
getTimeDifferenceString = function(date, time)
{
  var d = new Date(date + " " + time);
  var diff = Math.floor(Math.abs((new Date() - d) / 60000));     // convert to minutes

  if (diff < 1)  { return "just now"; } 
  if (diff < 60) { return diff + "m ago";}

  diff = Math.floor(diff / 60);

  if (diff < 24) { return diff + "h ago";}

  diff = Math.floor(diff / 24);

  if (diff < 7)  { return diff + "d ago";}

  return date + " " + time;
}
