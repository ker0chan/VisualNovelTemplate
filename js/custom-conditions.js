//Example of a custom condition:
//This evaluates to true when the given number is strictly bigger
//than a randomly picked number between 0 and 99 (included).
//Example usage: <<random 50>>
//A value of 50 means this condition will evaluate to true, 50% of the time.
var evaluateRandomCondition = function(condition)
{
	//Get a random integer between 0 and 99 (included)
	var n = Math.floor(Math.random()*100);
	//Check if the given number is greater than n
	//0 will never be strictly greater than n
	//100 will always be strictly greater than n
	//You will always be greater than n ❤
  	return n < parseInt(condition.options[0]);
}

//Add functions to evaluate your custom conditions here!
/*
var myCustomCondition = function(condition)
{
	var result = false;
	
	//Do something here?

	return result;
}
*/

//A dictionary of all the known custom conditions, and the function they use to be evaluated.
//Don't forget to add your own "name":function pairs here, too!
var customConditions = {
  "random":evaluateRandomCondition,
  /* "custom":myCustomCondition, */
};