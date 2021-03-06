//key to the kingdom js
//key to the kingdom
(function(){

//game world map
var map = [];
map[0] = "A shallow grave";
map[1] = "A deep snake pit";
map[2] = "A hermit's shack";
map[3] = "An old wagon";
map[4] = "An arid desert"
map[5] = "A beautiful lake";
map[6] = "A mysterious house";
map[7] = "A snowy mountain";
map[8] = "An ice cave";
map[9] = "An abandoned camp";
map[10] = "A quiet meadow";
map[11] = "A giant tree";
map[12] = "A large field";
map[13] = "A misty valley";
map[14] = "An eerie swamp";
map[15] = "A dark cave";
map[16] = "An ancient old-growth forest";
map[17] = "A lone wolf";
map[18] = "A dense forest";
map[19] = "A bandit camp";
map[20] = "Ruins";
map[21] = "A tall fire tower";
map[22] = "An ancient statue";
map[23] = "A huge river";
map[24] = "A knight clad in black armor";
var helpInfo = [];
helpInfo[0] = "need something to dig with...";
helpInfo[1] = "need a way to lower myself down...";
helpInfo[2] = "nothing much to see here";
helpInfo[3] = "type 'take rope' to take item";
helpInfo[4] = "nothing much to see here";
helpInfo[5] = "nothing much to see here";
helpInfo[6] = "type 'take jar' to take item";
helpInfo[7] = "nothing much to see here";
helpInfo[8] = "nothing much to see here";
helpInfo[9] = "nothing much to see here";
helpInfo[10] = "type 'take firefly' to take item"; 
helpInfo[11] = "nothing much to see here";
helpInfo[12] = "nothing much to see here";
helpInfo[13] = "nothing much to see here";
helpInfo[14] = "nothing much to see here";
helpInfo[15] = "need a source of light to explore this cave"; 
helpInfo[16] = "nothing much to see here";
helpInfo[17] = "the wolf seems to love music";
helpInfo[18] = "nothing much to see here";
helpInfo[19] = "nothing much to see here";
helpInfo[20] = "type 'take shovel' to take item";
helpInfo[21] = "nothing much to see here";
helpInfo[22] = "type 'take flute' to take item";
helpInfo[23] = "nothing much to see here"; 
helpInfo[24] = "you'll need a sword and shield to fight him";
//location images"
var images = [];
images[0] = "grave"; //short sword
images[1] = "snake"; //wooden shield
images[2] = "hermit";
images[3] = "wagon"; //rope
images[4] = "desert";
images[5] = "lake";
images[6] = "house"; //jar
images[7] = "mountain";
images[8] = "ice-cave";
images[9] = "camp";
images[10] = "meadow"; //firefly
images[11] = "giant-tree";
images[12] = "field";
images[13] = "valley";
images[14] = "swamp";
images[15] = "dark-cave"; //long sword
images[16] = "old-forest";
images[17] = "wolf"; //metal shield
images[18] = "young-forest";
images[19] = "bandit";
images[20] = "ruins"; //shovel
images[21] = "fire-tower";
images[22] = "statue"; // flute
images[23] = "river"; 
images[24] = "knight"; //key to the kingdom
//player start location
var mapLocation = 12;
var imgDisplay = document.querySelector("#imgDisplay");
imgDisplay.src = "src/images/"+images[mapLocation]+".jpg";
var output = document.querySelector("#output");
var input = document.querySelector("#input");
var location = document.querySelector("#location");
var button = document.querySelector("#enter");
var xMap = document.querySelector("#xMap");
location.innerHTML = map[mapLocation];
button.addEventListener("click", clickHandler, false);
window.addEventListener("keydown", keydownHandler, false);
var playerInput = "";
var gameMessage = "";
//items
var items = ["rope", "jar", "firefly", "shovel", "flute"];
var itemLocation = [3, 6, 10, 20, 22];
var backpack = [];
var knownActions = ["north", "east", "south", "west", "take",
	 "use", "drop", "help", "talk"];
var knownItems = ["short sword", "wooden shield", "rope", "jar", "firefly", "long sword", "metal shield", "shovel", "flute", "key"];
var actionTaken = "";
var item = "";
var mapX = 100;
var mapY = 100;
function clickHandler()
{
	playGame();
}
function keydownHandler(e)
{
	if(e.keyCode === 13){
		playGame();
	}
}
function takeItem()
{
	var itemIndexNumber = items.indexOf(item);
	if(itemIndexNumber !== -1 && itemLocation[itemIndexNumber] === mapLocation)
	{
		gameMessage = "<em>You take the <strong>" + item + "</strong></em>.";
		//Add the item to the player's backpack 
	    backpack.push(item);
	   
	    //Remove the item from the game world
	    items.splice(itemIndexNumber, 1);
	    itemLocation.splice(itemIndexNumber, 1);
	}
	else
	{
	    //Message if you try and take an item
	    //that isn't in the current location
	    gameMessage = "You can't do that.";
	}
	
}//end take item function
function dropItem()
{
	if(backpack.length !== 0 )
	{
		var backpackIndexNumber = backpack.indexOf(item);
		if(backpackIndexNumber != -1)
		{
			gameMessage = "<em>You drop the <strong> " + item + ".</strong></em>";
			items.push(backpack[backpackIndexNumber]);
			itemLocation.push(mapLocation);
			backpack.splice(backpackIndexNumber, 1);
		}
		else
		{
			gameMessage = "You can't do that.";
		}
	}
	else
	{
		gameMessage = "You're not carrying anything.";
	}
}
function useItem()
{
	var backpackIndexNumber = backpack.indexOf(item);
	if(backpackIndexNumber === -1)
	{
		gameMessage = "You're not carrying it";
	}
	if(backpack.length === 0)
	{
		gameMessage = "Your backpack is empty!";
	}
	if(backpackIndexNumber !== -1)
	{
		switch(item)
		{
			case "short sword":
				if(mapLocation === 24)
				{
					for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "wooden shield" || backpack[i] == "metal shield")
						{
							gameMessage = "You use your sword and board to best the black knight!<br>";
							gameMessage = "You've found the key to kingdom! well done!";
						}
						else
						{
							gameMessage = "Without a shield this will not end well...";
						}
					}
				}
				else
				{
					gameMessage = "You flail and slice wildly through the air.."
					gameMessage +="damn mosquitos!";
				}
			break;
			case "wooden shield":
				if(mapLocation === 24)
					{
						for(var i = 0; i<backpack.length; i++)
						{
							if(backpack[i] == "short sword" || backpack[i] == "long sword")
							{
								gameMessage = "You use your sword and board to best the black knight!";
								gameMessage = "You've found the key to kingdom! well done!";
							}
							else
							{
								gameMessage = "Sadly, evil knight slaying requires more than just a shield..";
							}
						}
					}
					else
					{
						gameMessage = "You take a defensive pose..";
						gameMessage = "the local wildlife is very impressed";
					}
			break;
			case "rope":
						if(mapLocation === 1)
						{
							gameMessage = "You use the rope to lower yourself into the pit...";
							gameMessage = "and find a fine <strong>wooden shield</strong>!";
							items.push("wooden shield");
							//remove item from game world
							itemLocation.push(mapLocation);
						}
						else
						{
							gameMessage = "You fiddle with various knots to fill the time.";
						}
			break;
			case "jar":
				for(var i = 0; i<backpack.length; i++)
							{
								if(backpack[i] == "firefly")
								{
									gameMessage = "You combine your jar and firefly to create a glowing lantern!";
								}
								else
								{
									gameMessage = "You stare at the empty jar..a metaphor for your life perhaps?";
								}
							}
			break;
			case "firefly":
				for(var i = 0; i<backpack.length; i++)
							{
								if(backpack[i] == "jar")
								{
									gameMessage = "You combine your jar and firefly to create a glowing lantern!";
								}
								else
								{
									gameMessage = "You wonder at the life of the firefly..";
								}
							}
			break;
			case "long sword":
				if(mapLocation === 24)
				{
					for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "wooden shield" || backpack[i] == "metal shield")
						{
							gameMessage = "You use your sword and board to best the black knight!<br>";
							gameMessage = "You've found the key to kingdom! well done!";
						}
						else
						{
							gameMessage = "Without a shield this will not end well...";
						}
					}
				}
				else
				{
					gameMessage = "You flail and slice wildly through the air.."
					gameMessage +="damn mosquitos!";
				}
			break;
			case "metal shield":
				if(mapLocation === 24)
					{
						for(var i = 0; i<backpack.length; i++)
						{
							if(backpack[i] == "short sword" || backpack[i] == "long sword")
							{
								gameMessage = "You use your sword and board to best the black knight!";
								gameMessage = "You've found the key to kingdom! well done!";
							}
							else
							{
								gameMessage = "Sadly, evil knight slaying requires more than just a shield..";
							}
						}
					}
					else
					{
						gameMessage = "You take a defensive pose..";
						gameMessage = "the local wildlife is very impressed";
					}
			break;
			case "shovel":
				if(mapLocation === 0)
				{
					gameMessage = "You use the shovel to unearth the grave."
					gameMessage += "..and find a stout <strong>short sword</strong>!";
					items.push("short sword");
					//remove item from game world
					itemLocation.push(mapLocation);
				}
				else
				{
					gameMessage = "You dig a random hole..maybe you were a dog in a past life.";
				}
			break;
			case "flute":
				if(mapLocation === 17)
				{
					gameMessage = "You serenade the wolf with beautiful music";
					gameMessage += "...and the wolf presents to you a <strong>metal shield</strong>!";
					items.push("metal shield");
					itemLocation.push(mapLocation);
				}
				else
				{
					gameMessage = "You play a cheerful tune to the birds and trees around you";
				}
			break;
			case "key":
			break;
		}
	}
}
function playGame(){
	playerInput = input.value;
	playerInput = playerInput.toLowerCase();
	gameMessage = "";
	actionTaken = "";
	//find player action
	for(i = 0; i < knownActions.length; i++)
	{
		if(playerInput.indexOf(knownActions[i]) !== -1)
		{
			actionTaken = knownActions[i];
			break;
		}
	}
	//find item action
	for(i = 0; i < knownItems.length; i++)
	{
		if(playerInput.indexOf(knownItems[i]) !== -1)
		{
			item = knownItems[i];
			console.log("player's item: " + item);
		}
	}
	switch(actionTaken)
	{
		case "north":
			if(mapLocation >= 5)
			{
				mapLocation -= 5;
				mapX -= 50;
				xMap.style.top = mapX + "px";
			}
			else
			{
				gameMessage = "Too far North, let's change directions";
			}
			break;
		case "east":
			if(mapLocation %5 != 4)
			{
				mapLocation += 1;
				mapY += 50;
				xMap.style.left = mapY + "px";
			}
			else
			{
				gameMessage = "Too far East, let's change directions";
			}
			break;
		case "south":
			if(mapLocation <= 19)
			{
				mapLocation += 5;
				mapX += 50;
				xMap.style.top = mapX + "px";
			}
			else
			{
				gameMessage = "Too far South, let's change directions";
			}
			break;
		case "west":
			if(mapLocation % 5 != 0)
			{
				mapLocation -= 1;
				mapY -= 50;
				xMap.style.left = mapY + "px";
			}
			else
			{
				gameMessage = "Too far West, let's change directions";
			}
			break;
		case "take":
			takeItem()
			break;
		case "drop":
			dropItem()
			break;
		case "use":
			useItem()
			break;
		case "help":
			if(helpInfo[mapLocation] != "")
			{
				gameMessage = helpInfo[mapLocation] + " ";
			}
			gameMessage += "<br>Try any of these words: ";
			gameMessage += "north, east, south, west ";
			gameMessage += "take, use, drop, talk";
			break;
		case "talk":
			if(mapLocation === 2)
			{
				gameMessage = "The old hermit mentions he saw a mysterious knight";
				gameMessage += " clad in black to the South East";
			}
			else if (mapLocation === 19)
			{
				var hasWeapon = ((backpack.indexOf("short sword") > -1) || (backpack.indexOf("long sword") > -1));
				console.log(hasWeapon);
				if(hasWeapon === false)
				{
					gameMessage = " Hah! You don't scare me, piss off before I decide to care.";
				}
				else
				{
					gameMessage = "Put away ye sword! I submit!";
					gameMessage += "..I saw a nasty looking fella to the South..might want a sword and shield though...";
				}
			}
			else
			{
				gameMessage = "You talk to yourself, maybe you've been on the trail too long..";
			}
			break;
		default:
			gameMessage = "I don't understand that."
	}//end switch
	render();
}//end playGame function
function render()
{
	//helpInfo[mapLocation] = "";
	//reset input field values and placeholder
	output.innerHTML = "";
	input.value = "";
	input.placeholder = "enter direction, 'help' for more";
	//displays location and image
	location.innerHTML = map[mapLocation];
	imgDisplay.src = "src/images/"+images[mapLocation]+".jpg";
	//display items
	for(var i = 0; i < items.length; i++)
	{
		if(mapLocation === itemLocation[i])
		{
			output.innerHTML += "You see a(n) <strong>"+items[i]+"</strong> here.";
		}
	}
	//game message
	output.innerHTML += "<em>" + gameMessage + "</em><br>";
	if(backpack.length !==0)
	{
		output.innerHTML += "<br>You are carrying: <strong>" + backpack.join(", ") + "</strong>";
	}
}




}()); //end main function wrapper