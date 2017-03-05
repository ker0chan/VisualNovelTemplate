/*
The scene display timeline:
- The scene is cleared (choices and characters are removed from the page)
- The actions are executed (changing place, updating variables, etc)
- The character is displayed
- The conditions on every choice are evaluated, and the available choices are displayed
- The player clicks on a choice, usually triggering a change of scene
*/

function onSceneCleared()
{
	//Custom code that will be executed right after the scene has been cleared from its choices and characters,
	//before any of the content of the scene is processed.
}

function onPlaceDisplayed(place)
{
	//Custom code that will be executed right after a place has been displayed in a scene
}

function onCharacterDisplayed(character)
{
	//Custom code that will be executed right after a character has been displayed in a scene
}

function onSceneDisplayed(scene)
{
	//Custom code that will be executed right after a scene is completely drawn
}

function onChoiceClicked(targetSceneId)
{
	//Custom code that will be executed when the player clicks on a choice
	//targetSceneId can be an actual scene identifier, but it could also be a special value that you want to catch instead!
	//In any case, this function needs to return false for the default behaviour to be executed.
	//The default behaviour is to display the scene that has targetSceneId as its identifier.
	//If you've done something else and want to prevent the scene from displaying, return true instead.
	
	//Example of a custom behaviour upon clicking on a choice:
	//Redirecting the player to an ending page if the target of the choice is called "end"
	if(targetSceneId.toLowerCase() == "end")
	{
		location = "end.html";
		return true;
	}

	return false;
}