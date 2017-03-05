// <<string door == locked>>
// <<string door != locked>>
// <<string door exists>>
// a variable that doesn't exist is always != to the given value
function evaluateStringCondition(condition)
{
  result = false;
  var key = condition.options[0].toLowerCase();
  var operator = condition.options[1];
  var value;
  if(condition.options.length > 2)
  {
    value = condition.options[2];
  }
  
  switch(operator.toLowerCase())
  {
    case "==":
      result =  (key in variables &&
                variables[key] == value);
    break;
    case "!=":
      result =  !(key in variables) ||
                (key in variables &&
                  variables[key] != value);
    break;
    case "exists":
      result = (key in variables);
    break;
  }

  return result;
}

// <<number money exists>>
// <<number money == 10>>
// <<number money != 10>>
// <<number money > 10>>
// etc...
// a variable that doesn't exist is always != to the given value
// it is never ==, >, <, <= or >= to any value
function evaluateNumberCondition(condition)
{
  result = false;
  var key = condition.options[0].toLowerCase();
  var operator = condition.options[1];
  var value;
  if(condition.options.length > 2)
  {
    var value = parseInt(condition.options[2]);
  }
  switch(operator.toLowerCase())
  {
    case "==":
      result = (key in variables &&
                variables[key] == value);
    break;
    case "!=":
      result =  !(key in variables) ||
                (key in variables &&
                  variables[key] != value);
    break;
    case "<":
      result =  (key in variables &&
                  variables[key] < value);
    break;
    case ">":
      result =  (key in variables &&
                  variables[key] > value);
    break;
    case "<=":
      result =  (key in variables &&
                  variables[key] <= value);
    break;
    case ">=":
      result =  (key in variables &&
                  variables[key] >= value);
    break;
    case "exists":
      result = (key in variables);
    break;
  }

  return result;
}

//Computes the highest approval value in all characters.
//Doesn't work if the highest value is below -9999, but that probably means
//the entire world hates you more than anything else in existence.
//Get a warm cup of coffee and think of what you've done.
function computeMaxApproval()
{
  var max = -9999;
  for(var c in characters)
  {
    if(characters[c].approval > max)
    {
      max = characters[c].approval;
    }
  }
  return max;
}

// <<approval bob == 10>>
// <<approval bob != 10>>
// <<approval bob > 10>>
// etc...
// <<approval bob max>>

// A same max approval value can be shared by multiple characters.
// <<approval bob max>>
// <<approval alice max>>
// will both be evaluated to true if Bob and Alice have the same approval value and it's the highest

//Approval levels are at 0 by default
function evaluateApprovalCondition(condition)
{
  result = false;
  var character = condition.options[0].toLowerCase();
  if(!(character in characters))
  {
    console.error("Couldn't evaluate an approval condition: Character "+character+" not found.");
    return false;
  }
  var operator = condition.options[1];
  var value;
  if(condition.options.length > 2)
  {
    var value = parseInt(condition.options[2]);
  }
  switch(operator.toLowerCase())
  {
    case "==":
      result = characters[character].approval == value;
    break;
    case "!=":
      result = characters[character].approval != value;
    break;
    case "<":
      result = characters[character].approval < value;
    break;
    case ">":
      result = characters[character].approval > value;
    break;
    case "<=":
      result = characters[character].approval <= value;
    break;
    case ">=":
      result = characters[character].approval >= value;
    break;
    case "max":
      result = characters[character].approval == computeMaxApproval();
    break;
  }

  return result;
}

// <<type option0 option1 option2 option3 ...>>
// The minimal form is <<type option>> (always at least one option)
// Any condition that isn't registered in custom-conditions.js will be treated as an error
function evaluateCustomCondition(condition)
{
  var type = condition.type.toLowerCase();
  if(type in customConditions)
  {
    return customConditions[type](condition);
  } else 
  {
    console.error("Unsupported condition type: "+condition.type);
    return false;
  }
}

//Any condition that isn't known by the engine will be considered as a custom condition
function evaluateCondition(condition)
{
  var result = false;
  switch(condition.type.toLowerCase())
  {
    case "string":
      result = evaluateStringCondition(condition);
    break;
    case "number":
      result = evaluateNumberCondition(condition);
    break;
    case "approval":
      result = evaluateApprovalCondition(condition);
    break;
    default:
      result = evaluateCustomCondition(condition);
    break;
  }
  return result;
}