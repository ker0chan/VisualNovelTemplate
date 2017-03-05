//Example of a custom action:
//Shakes the game container from left to right multiple times.
//The given option lets us determine how broad the shaking should be.
//Example usage: <<screenshake 10>>
var executeScreenshakeAction = function(action)
{
  //Actions can have an impact on any element of the page and any variable in the code. Do wild stuff.
  //Remember, great power, great responsibility (...I mean it's easy to break stuff too).
  var element = $("#container");

  //Parse the first option as an integer
  var strength = parseInt(action.options[0]);

  //Multiple jQuery animations will be (b r u t a l l y) queued.
  element.animate({
    "left":strength+"px"
  }, 50);
  element.animate({
    "left":-strength+"px"
  }, 100);
  element.animate({
    "left":strength+"px"
  }, 100);
  element.animate({
    "left":-strength+"px"
  }, 100);
  element.animate({
    "left":strength+"px"
  }, 100);
  element.animate({
    "left":-strength+"px"
  }, 100);
  element.animate({
    "left":"0px"
  }, 50);
}

//Add functions to execute your custom actions here!
/*
var myCustomAction = function(action)
{ 
  //Do something here?
}
*/

var myCustomAction = function(action)
{ 
  //Do something here?
}

//A dictionary of all the known custom actions, and the function they call when they're executed.
//Don't forget to add your own "name":function pairs here, too!
var customActions = {
  "screenshake":executeScreenshakeAction,
  /* "custom":myCustomAction, */
}