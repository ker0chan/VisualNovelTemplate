//Initializes the game in a local/offline environment
//This assumes that data/processed-data.js has been generated, using the build.bat script
//It also requires the data to be rebuilt everytime a change is made in the characters, places or story files.
function init_local()
{
	initCharacters();
	parseStory();
	onInit();
}

//Initializes the game in a server environment
//Doesn't rely on the data/processed-data.js file, and asynchronously loads the .json files instead
//A server environment (or a local *AMP stack, node, python microserver...) is required for the $.getJSON calls to work
//Except if your browser is particularly chill, in which case, maybe it works okay?
//I don't know, mine isn't.
function init_async()
{
	$.getJSON("data/characters.json", function(jsonCharacters) {
		characters = jsonCharacters;
		initCharacters();

		$.getJSON("data/places.json", function(jsonPlaces) {

			places = jsonPlaces;
			$.getJSON("data/story.json", function(jsonStory) {

				story = jsonStory;
				parseStory();
				onInit();
			});
		});
	});
}

//Initialize the character data after the data has been loaded
function initCharacters()
{
	for(var c in characters)
	{
		//Set a default approval level for all characters
		characters[c].approval = 0;
	}
}

//Called when the game is fully initialized
function onInit()
{
	//Only one thing left to do: start the game on the first Scene \o/ Here we go~
	displayScene("start");
}

//Are you running the game in a server environment?
//If you don't, or don't know if you do:
//- It's okay I still like you;
//- You will need to double-click build.bat everytime you edit the characters, places or story files;
//- You'll start the game by double-clicking index.html or game.html
//- You don't need to touch anything below, you can close this file :)

//If you do:
//- Great, you can edit the characters, places and story files and see your changes immediately in the game;
//- Do not start the game by double clicking the html files, use your server path instead;
//- Comment init_local() and uncomment init_async(), and you're done :)

init_local();
//init_async();
