// <<string door = locked>>
function executeStringAction(action)
{
  var key = action.options[0].toLowerCase();
  var value = action.options[1];
  variables[key] = value;
}

// <<number money + 1>>
// <<number money - 10>>
// <<number money = 15>>
// Uninitialized variables are set to 0 before any + or - operation
function executeNumberAction(action)
{
  var key = action.options[0].toLowerCase();
  var operator = action.options[1];
  var value = parseInt(action.options[2]);
  
  if(!(key in variables))
  {
    variables[key] = 0;
  }

  switch(operator)
  {
    case "+":
      variables[key] += value;
    break;
    case "-":
      variables[key] -= value;
    break;
    default:
      console.error("Unsupported number operator: \""+operator+"\". Used \"=\" instead.")
    case "=":
      variables[key] = value;
    break;
  }
}
// <<place street>>
function executePlaceAction(action)
{
  displayPlace(action.options[0].toLowerCase());
}

// <<approval bob + 1>>
// <<approval bob - 10>>
// <<approval bob = 15>>
function executeApprovalAction(action)
{
  var character = action.options[0].toLowerCase();
  var operator = action.options[1];
  var value = parseInt(action.options[2]);
  
  if(!(character in characters))
  {
    console.error("Character does not exist: "+character);
  }

  switch(operator)
  {
    case "+":
      characters[character].approval += value;
    break;
    case "-":
      characters[character].approval -= value;
    break;
    case "=":
      characters[character].approval = value;
    break;
    default:
      console.error("Unsupported approval operator: \""+operator+"\"")
      break;
  }
}

// <<type option0 option1 option2 option3 ...>>
// The minimal form is <<type option>> (always at least one option)
//Any action that isn't registered in custom-actions.js will be treated as an error
function executeCustomAction(action)
{
  var type = action.type.toLowerCase();
  if(type in customActions)
  {
    customActions[type](action);
  } else 
  {
    console.error("Unsupported action type: "+action.type);
  }
}

//Any action that isn't known by the engine will be considered as a custom action
function executeAction(action)
{
  switch(action.type.toLowerCase())
  {
    case "string":
      executeStringAction(action);
    break;
    case "number":
      executeNumberAction(action);
    break;
    case "place":
      executePlaceAction(action);
    break;
    case "approval":
      executeApprovalAction(action);
    break;
    default:
      executeCustomAction(action);
    break;
  }
}