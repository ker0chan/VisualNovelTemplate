# Visual Novel Template Documentation

![Screenshot](/img/screenshot.PNG?raw=true)

Code and documentation: [@ker0chanFR](https://twitter.com/ker0chanFR)

Characters and background art: [@LtEmi](https://twitter.com/LtEmi)

[Demo/Tutorial/Example](https://ker0chan.github.io/VisualNovelTemplate) (yes, it's everything at once)
___
# Table of Contents

* [Disclaimer](#disclaimer)
* [Getting started](#getting-started)
	* [Quickstart instructions](#quickstart-instructions)
	* [Testing your game](#testing-your-game)
	* [Distributing your game](#distributing-your-game)
* [Lexicon](#lexicon)
* [Scripting syntax](#scripting-syntax)
	* [The simplest scene](#the-simplest-scene)
	* [Normal scene](#normal-scene)
	* [Scene with actions](#scene-with-actions)
	* [Multiple answers](#multiple-answers)
	* [Non-branching multiple answers](#non-branching-multiple-answers)
	* [Conditions](#conditions)
	* [Multiple conditions](#multiple-conditions)
	* [Ending choice](#ending-choice)
	* [Comments](#comments)
	* [Empty lines](#empty-lines)
	* [Existing conditions](#existing-conditions)
		* [Conditions on string variables](#conditions-on-string-variables)
		* [Conditions on number variables](#conditions-on-number-variables)
		* [Approval conditions](#approval-conditions)
		* [Custom conditions](#custom-conditions)
	* [Existing actions](#existing-actions)
		* [Actions on string variables](#actions-on-string-variables)
		* [Actions on number variables](#actions-on-number-variables)
		* [Approval actions](#approval-actions)
		* [Custom actions](#custom-actions)
* [Customization](#customization)
	* [Changing the appearance of the game](#changing-the-appearance-of-the-game)
		* [CSS](#css)
		* [HTML](#html)
	* [Adding or editing features](#adding-or-editing-features)


# Disclaimer
Keep in mind that this was intended as a template/boilerplate code base to get a project started on the right tracks, rather than as a full-fledged engine. If your project needs features that differ completely from those presented here, you might want to dig into the code and add them yourself (or with the help of a programmer). Custom actions and stylesheets can give pretty good results to some extent, but reworking the core of the engine will probably be more stable/scalable/optimized in the long run.

It's also largely untested, most of the code was recycled from a previous project of mine, and cleaned up/reorganized to be more user-friendly and easy to dive into. Some features have been added in the process, but I haven't had the chance to test them for a real project yet. Expect bugs, missed opportunities and a positive amount of disappointment.

# Getting started
The engine currently handles stories written in [Yarn](https://github.com/InfiniteAmmoInc/Yarn), and exported as a JSON file. Yarn is a dialogue editor that helps you build nodes and branching trees in a visual way, similar to Twine. In this template, a specific script syntax (**that slightly differs from the standard Yarn syntax**) is used, in order to provide an easy access to the features needed in a visual novel game. Check out the scripting syntax below for more information.
The characters and places data are stored as JSON files that need to be edited by hand. Using a JSON editor (like http://www.jsoneditoronline.org/) or a text editor with syntax highlighting (Notepad++, Sublime Text) is strongly recommended.

## Quickstart instructions
* Download this project as a [zip file](https://github.com/ker0chan/VisualNovelTemplate/archive/master.zip), or clone the repository
* Create a story using [Yarn](https://github.com/InfiniteAmmoInc/Yarn) and save it in `data/story.json`
* Define your characters in `data/characters.json`
* Define your places in `data/places.json`
* Add images for your characters and places, probably in the `img` folder
* Edit `css/scene.css` to define the appearance (position, size) of your characters (optional)
* Edit `index.html` and `end.html` to create your own menu and ending screens (optional for now, but you should at least give a name to your game!)

## Testing your game
* If you are creating your game in an offline environment ("I am not a coder"):
    * Launch `build.bat` (Windows) or `build.sh` (Mac, Linux). This will compile your JSON files into a single javascript file that will be loaded in the page. **You will need to do this every time you change the content of the JSON files or your story for the changes to appear in the game.**
    * Open `index.html` in your web browser to start the game, or open `game.html` to skip the menu page.
* If you are creating your game in a server environment ("I am a coder" or "I'm tired of launching the build script every 5 seconds"):
    * Edit `main.js` and follow the instructions to enable asynchronous data loading.
    * Go to `your_server_address/index.html` in your browser to start the game, or `your_server_address/game.html` to skip the menu page.

## Distributing your game
Once you're done creating your game (🎉🎉🎉 congratulations 🎉🎉🎉), you might want to make it available online and show it to the world. As a web-based game, it simply needs to be hosted somewhere: a personal website or a game hosting website like [itch.io](http://itch.io) or [Gamejolt](http://gamejolt.com) or even [GitHub Pages](http://leereilly.net/2012/11/29/hosting-games-on-github.html), for example.
Specific instructions for these platforms can be found on their respective website, but the usual steps will require you to package all your files in a zip archive. Make sure you put all the game files in the archive. You don't have to include `build.bat` or this instructions file, the game will run without them.


# Lexicon
**Node**: **The building block of your story**. This is the visual thing you see in Yarn, it's a block that has a title, and some content. The content spans multiple lines, each of them representing a Scene, Action, or Choice. Nodes hold all the narrative content of the game in a single branching path, and can be linked to and from other nodes, in order to build a conversation tree.

**Scene**: The state of the game at a given moment: background, character, text. Clicking on a choice usually moves the player to another scene, which means the scene is **"that thing that exists between two clicks"**. Scenes contain one or more choices, and can contain one or more action. Scenes have an identifier that is either the title of the node they are in (for the first scene in a node), or an automatically generated identifier. You probably don't need to access that, or if you do, you probably know how to find it anyway.

**Action**: **Something that happens when entering a scene**. This is usually used to move to a different Place or changing some variable state, but with some custom code, it can do anything! Shaking the screen, changing parts of the stylesheet, playing a sound...

**Choice**: **The link between to scenes**. Some scenes may have only one choice, and that's okay. When creating a branchig path in the narrative tree, multiple choices will be used. Choices can also contain one or multiple Conditions. If conditions are not met, the choice will simply not appear on the player's screen. As such, a scene with no available choice will result in a dead end. This is usually not an intended behaviour, so make sure there is always one or more choice that has no condition, or that at least one of your conditions will be evaluated to true.

**Identifier**: Places, characters, variables and pretty much every piece of data in your game can be referenced by its identifier. It's their **"name in the code"**. They are case-insensitive (`bobby`, `Bobby`, and `BOBBY` will all reference the same character, named "Bobby") and need to start with a letter. They can contain numbers and symbols like `-` or `_`. These names are used inside of the code, so keep it simple and avoid dangerous characters like line breaks or emojis (it might work okay, I haven't tested it extensively, but I can't think of a single situation where you'd want to do that anyway). Seriously just type `anything-like-that`, `likeThat`, or `even_that` and you're good to go.

**Variable**: **A box that holds a value for later use**. String and Number variables respectively hold strings (`ending_unlocked`, `open`, `true`, `fancy`) or integer numbers (`0`, `100`, `-5`, `200000`). String values can't contain spaces. Number values will be parsed as integers, 10.0 is not allowed, neither is -3^10. Variables have an identifier that is used to reference them in actions or conditions.

**Condition**: Controls the **circumstances under which a choice is made available** to the player. Some examples include:

- Checking if a string variable holds a given value ("Is the door locked?")
- Comparing the value of a number variable to some other value ("Does the player have more than 200 coins?")
- Checking the approval level of a character ("Does Bobby hate the player?")

A single choice can contain multiple conditions, in which case they ALL need to be true for the choice to be available.

**Place**: A place where scenes are happening. Places can be changed using an Action. They contain a name and an image, that are usually both displayed on screen during the game. This does not provide a player movement system (though you could probably add it with some custom code), it is only a way to change **the background** of the game during a playthrough. Places have an identifier that is used to reference them in actions.

**Character**: Each scene contains **a character** that will be displayed on screen, along with their name and their current dialog line(s). Characters can have multiple poses, with one pose used at a time during a scene (`{{alice,happy}} I'm so happy!`). The `hidden` pose can be used on any character, allowing for a character to not appear on screen at all. When no pose is mentioned, the `default` pose will be used. When no character is mentioned, a default character ("The Narrator") will be used with a hidden pose. Characters and poses are referenced by their identifier (This is not correct: `{{The One-Eyed Monster,Very angry}} Rawr!`, this is correct: `{{one-eyed-monster,very-angry}} Rawr!`).

**Approval**: Characters have an approval level, a number that usually describes **how much they like the player**. This is a common feature in dating games which is why it's defined here, but it is simply a number variable at its heart so feel free to use it for something else. Like a power level, that goes over 9000.

# Scripting syntax
## The simplest scene
```
Hello World
```
The Narrator says the words "Hello World". Clicking on it goes to the next scene.

## Normal scene
```
{{alice,happy}} Hello, I'm Alice nice to meet you!
```
Alice is shown on screen in her "happy" pose, according to what was set in `characters.json`. She says her line. Clicking on it goes to the next scene.
## Scene with actions
```
<<place street>>
{{alice}} This street sure looks nice, doesn't it?
```
The background is set to the image associated with the place called `street`, according to what was set in `places.json`
## Multiple answers
```
[[{{bobby}} I'll leave you alone forever now.|leave_the_party]]
[[{{bobby}} ...|keep_partying]]
```
Two answers from Bobby are available. Clicking the first one will lead to the first scene in the node called `leave_the_party`. Clicking the second one will lead to the first scene in the node called `keep_partying`.

## Non-branching multiple answers
```
[[{{bobby}} Everyone says I'm very attractive but it doesn't really matter.]] <<number attractiveness > 1000>>
[[{{bobby}} People say I'm pretty, sometimes. It doesn't really matter.]] <<number attractiveness <= 1000>> <<number attractiveness > 500>>
[[{{bobby}} They call me ugly. It doesn't really matter.]] <<number attractiveness <= 500>>
{{alice}} You're right Bobby, you're beautiful in your own way, whether people like it or not. Attractiveness isn't an absolute number.
```
Each of these choices will lead to the scene where Alice gives a really good life advice. This doesn't need to be split up into two nodes and clutter up the tree. Any choice that doesn't specify a target scene will just keep going down the tree as if it was a regular scene.
Note that you can mix branching and non-branching answers:
```
Don't worry.
[[I'll stay here forever.]]
[[I'm leaving.|somewhere_else]]
See, I'm still here.
```
In this example, the second choice leads to another scene in the node called `somewhere else`, but the first choice leads to the next available scene, without leaving the node. Using branching choices and creating multiple nodes will help you create a tree that's easy to understand visually, while using this trick might hide some complexity. Try to find the right balance between a clean dialogue tree and an obscure dialogue tree.

## Conditions
```
[[I'm rich|target_node_for_rich_people]] <<number money >= 200>>
[[I'm poor|target_node_for_poor_people]] <<number money < 200>>
```
If the variable `money` holds a value that is greater or equal to 200, the first choice will be available. Otherwise, the seond choice will be available. **The variable needs to be set somewhere before, otherwise none of the choices will be available.**

## Multiple conditions
```
[[I'm too young to drink.|sober]] <<number age < 21>>
[[I didn't drink tonight.|sober]] <<number age >= 21>> <<string drink == none>>
[[I AM NOT DRUNK OKaY?|drunk]] <<number age >= 21>> <<string drink == allofthem>>
```
Depending on the value of the variables `age` and `drink`, only one of the three choices will be displayed. It is assumed that those variables have been set to some value before (otherwise every condition will be false), and that the variable `drink` is either equal to "none" or "allofthem". Depending on the rest of the dialogue tree, we might run into a situation where none of the choices are available, because the age hasn't been set, or because the character has *only had like, ONE glass of wine and maybe a shot but also we've had dinner before*. Make sure all the situations are covered to avoid dead ends in the narrative tree.

## Ending choice
```
[[And they lived happily ever after.|end]]
```
The special identifier `end` lets you end the game by leaving the game page and opening `end.html`, by default. This behaviour is described in `js/custom-display.js`, as an example on how to change the default behaviour of clicking on a choice.

## Comments
```
//This is a comment. Yay.
```
Comments will be ignored when displaying the scene. Use them when your tree becomes too complicated and hard to follow, you'll thank yourself later!

## Empty lines
```
{{alice,bored}} Nothing ever happens here.
{{alice,bored}} I'm tired of being used as an example.

{{alice,bored}} Seriously.




{{alice,angry}} DO SOMETHING.
```
Empty lines are ignored. This example will result in four consecutive scenes with a single choice, with Alice seemingly losing her patience for no apparent reason.

## Existing conditions
### Conditions on string variables
```
[[We've done something to that door.|something]] <<string door exists>>
```
Checks if the variable `door` has alreay been set to any value (it exists once its value has been set for the first time)
___
```
[[It's locked.|locked]] <<string door == locked>>
```
Checks if the variable `door` is equal to "locked"
___
```
[[It's not locked.|unlocked]] <<string door != locked>>
```
Checks if the variable `door` is not equal to "locked". **Note**: if it doesn't exist, this will evaluate to true.
### Conditions on number variables
```
[[Blah blah blah|bla]] <<number money > 200>>
```
Checks if the variable "money" is greater than 200.
Other operators:
```
<<number money < 200>>
<<number money >= 200>>
<<number money <= 200>>
<<number money == 200>>
<<number money != 200>>
```
**Note**: if the variable `money` hasn't been set to any value, all of these will evaluate to false, except for `<<number money != 200>>` (It is, in fact, different from 200 if it doesn't exist).

### Approval conditions
```
[[{{bobby}} I really really really really like you.|date_bobby]] <<approval bobby > 69>>
```
Other operators:
```
<<approval bobby < 69>>
<<approval bobby >= 69>>
<<approval bobby <= 69>>
<<approval bobby == 69>>
<<approval bobby != 69>>
```
___
```
[[{{alice}} Bobby and I are meant for each other.|marry_bobby]] <<approval bobby max>>
[[{{alice}} Max and I are meant for each other.|marry_max]] <<approval max max>>
```
Checks if the character `bobby` and `max` have an approval level that is the highest of all the characters (note that multiple characters can have the same approval level, and can thus both be the highest).
Sorry for the weird example, I thought having `max` as a character identifier was fun because I got to write "*max max*". Hopefully it's not too confusing.
### Custom conditions
```
[[I don't see anything.|keep_watching]]
[[Oh look, a shooting star!|make_a_wish]] <<random 75>>
[[Oh look, a meteorite is heading towards us!|oops]] <<random 1>>
```
Picks a random number between 0 and 99 (included), and checks if it's smaller than the given value. In this example, the second choice will appear ~75% of the time, and the third choice will appear ~1% of the time.
**This is a custom condition that serves as an example on how to add your own conditions, check out `js/custom-conditions.js` for more information.**

## Existing actions
### Actions on string variables
```
<<string door open>>
```
Set the value of the variable `door` to "open" (note that the values can't contain spaces, otherwise only the first word will be considered as the value!)

### Actions on number variables
```
<<number money = 5>>
<<number money + 10>>
<<number money - 3>>
```
Set the value of `money` to 5, then add 10 to it, then substract 3. Yup, that's 12.

### Approval actions
```
<<approval bobby = 420>>
<<approval bobby + 10>>
<<approval bobby - 100>>
```
Sets the approval level of the character `bobby` to 420, before adding 10 and substracting 100 for no apparent reason. Make up your mind, Bobby.

### Custom actions
```
<<screenshake 10>>
```
Shakes the screen from -10px to the left to 10px to the right, multiple times.
**This is a custom action that serves as an example on how to add your own actions, but it's rather crude/boring/annoying in a game so maybe don't use it.**

# Customization
## Changing the appearance of the game
### CSS
CSS files can be edited freely, with the most important bits being in `css/ui.css` and `css/scene.css`.
* `ui.css` defines the appearance of the user interface elements, like the choice container, the place name or the container. Use it to change the resolution of the game area, add a prettier UI, etc.
* `scene.css` defines the appearance of the elements inside of a scene, namely the characters. It also lets you add rules that will be applied under specific circumstances. The attributes character, pose and place are added to the `#container` element when a scene is displayed, and can be used as follows:

Changing the color of the character name depending on the active character:
```
#container[character="bobby"] #characterName
{
	color:rgb(255, 247, 128);
}

#container[character="alice"] #characterName
{
	color:rgb(255, 80, 150);
}
```
___
Setting a character's position on screen, depending on the active character and their active pose:
```
#container[character="alice"][pose="happy"] .character
{
	left:10px;
}
```
___
Styling the name of the place, depending on the active place:
```
#container[place="dorm"] #placeName
{
	color: hotpink;
}
```

### HTML
The game area has a simple structure that can be seen in the `game.html` file. Do not delete the existing blocks as this can cause errors when playing the game (you can hide some of them with CSS if needed). Feel free to add more blocks to suit your needs: an approval meter, a space to display the amount of money you have, a clock or calendar...

## Adding or editing features
The available Actions and Conditions should cover most of the basic, usual needs of an adventure-style visual novel. Specific features can be added with the help of some javascript code.
`js/custom-actions.js` and `js/custom-conditions.js` will let you define the behaviour of some custom tags that you can then use in your story. Both of these file contain at least one example to help you get started.

Additionally, in `js/custom-display.js`, functions that are called at various stages of the display of a scene can be found. Any code can be added there as well, in order to add functionalities on top of the default behaviour of the engine. Please read the comments in the file to understand when these functions are called and how to make use of them efficiently.

You can access any part of the engine code at any time, but the notable elements you might be looking for are:
* `characters`: a Javascript object that holds the information on the characters. It contains the info that you provided in characters.json, along with the approval levels of each of these characters.
* `places`: a Javascript object that holds the information on the places. It contains the info provided in places.json.
* `variables`: a Javascript object that holds the information on the variables you set and read with `<<string ...>>` and `<<number ...>>`.
* `scenes`: a Javascript object that holds all the scenes extracted from the story.

For example, if you need to display the content of a variable called `money` in your game, you can add some code in the `onSceneRendered()` function:
```
function onSceneDisplayed(scene)
{
	//Custom code that will be executed right after a scene is completely drawn

	//Read the current value of the "money" variable
	var moneyAmount = variables["money"];
	//Display it inside the html element with the id "moneyCounter"
	//(you also need to add this element to the game.html file)
	$("#moneyCounter").text("Cash: " + moneyAmount + "€");
}
```

Finally, most of the code is commented in the other .js files, so if you are confident in your javascript programming skills, feel free to improve, refine or break any part of the code to fit your needs!
