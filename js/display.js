//So uh these need to be initialized somewhere and I thought "Why not here?"
//Why not here, indeed.
var scenes = {};
var characters = {};
var places = {};
var variables = {};

//Clears the scene, removing every choice and character elemnt that was added in the previous scene
function clearScene()
{
	$(".choice").remove();
  $(".character").remove();
}

function displayCharacter(characterData)
{
  //characterData only contains a character id and a pose
  //The actual images and names are in the characters dictionary
  //If the given key does not exist, throw an error and revert to the default character instead.
  if(!(characterData.id in characters))
  {
    console.error("Character "+characterData.id+" does not exist.");
    characterData.id = "default";
    characterData.pose = "hidden";
  }
  var character = characters[characterData.id];

  //Display the name of the character
	$("#characterName").html(character.name);

  //Set the character and pose attributes of the container so that custom CSS rules can be applied
  $("#container").attr("character", characterData.id);
  $("#container").attr("pose", characterData.pose);

  //the "hidden" pose simply means the character is hidden and there's nothing to display
  if(characterData.pose != "hidden")
  {
    //Create a character element and set its background before adding it to the scene
    var characterElement = $("<div class='character'></div>");
    characterElement.css({"background-image": "url('"+character.poses[characterData.pose]+"')"});
    $("#sceneContent").append(characterElement);  
  }

  //Custom code that executes after showing a character be called now
  onCharacterDisplayed(character);
}

function displayChoices(choices)
{
  //choices holds and array of choice, though there is sometimes only one element in it.
	for(var c in choices)
	{
		var choice = choices[c];

    //Does this choice have conditions?
    if(choice.conditions.length > 0)
    {
      //Let's assume they're all true for now
      display = true;
      //And check them one by one
      for(var c in choice.conditions)
      {
        var condition = choice.conditions[c];
        display = display && evaluateCondition(condition);
        //This condition was false, no need to check the rest of the list, they ALL need to be true
        if(!display) break;
      }

      //This choice isn't available to the player at this moment, skip to the next one.
      if(!display) continue;
    }

    //Choices that are available will be displayed in the list
    //We also give them a data attribute that can be read later when the player clicks on this choice.
		$("#choices").append("<div class='choice' data-target="+choice.target+">"+choice.text+"</a></div>");
	}
}

function displayPlace(placeId)
{
  //The actual images and names are in the places dictionary
  //If the given key does not exist, throw an error and exit the function.
  if(!(placeId in places))
  {
    console.error("Place "+placeId+" does not exist.");
    return;
  }
  var place = places[placeId];
  
  //Show its name
  $("#placeName").html(place.name);
  //Set the place attribute in the container for custom CSS rules to apply
  $("#container").attr("place", placeId);
  //Display the place's image as the background
  displayBackground(place.image);

  //Custom code that executes after changing places will be called now
  onPlaceDisplayed(place);
}

//This could technically be called from an custom action,
//to change the background without changing places for example?
function displayBackground(url)
{
	$("#sceneContent").css({"background":"url('"+url+"')"});
}

function displayScene(sceneId)
{	
  //Clear the scene
	clearScene();

  //Custom code that executes after clearing the scene will be called now
  onSceneCleared();

  //Checks if the scene we're trying to display actually exists?
  if(!(sceneId in scenes))
  {
    console.error("Scene "+sceneId+" not found.");
    return;
  }
	var currentScene = scenes[sceneId];

  //Handle every action in this scene
  for(var a in currentScene.actions)
  {
    var action = currentScene.actions[a];
    executeAction(action);
  }

  //Display the character
	displayCharacter(currentScene.character);

  //Display the choices
	displayChoices(currentScene.choices);

  //Custom code that executes after displaying the scene will be called now
  onSceneDisplayed(currentScene);
}

//Upon clicking on a choice
$(document).on("click", ".choice", function()
{
  //Call the custom code that handles choice clicks
  if( !onChoiceClicked($(this).data("target")) )
  {
    //If it has nothing to do, simply use the normal behaviour: displaying the target scene
    displayScene($(this).data("target"));
  }
});