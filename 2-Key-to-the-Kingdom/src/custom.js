//key to the kingdom js
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
//items
var items = ["short sword", "wooden shield", "rope", "jar", "firefly", "long sword", "metal shield", "shovel", "flute", "key"];
var itemLocation = [0, 1, 3, 6, 10, 15, 17, 20, 22, 24 ];
var backpack = [];
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
location.innerHTML = mapLocation + ": " + map[mapLocation];
button.addEventListener("click", clickHandler, false);
window.addEventListener("keydown", keydownHandler, false);
var playerInput = "";
var gameMessage = "";
var knownActions = ["north", "east", "south", "west", "take", "use", "drop"];
var knownItems = ["short sword", "wooden shield", "rope", "jar", "firefly", "long sword", "metal shield", "shovel", "flute", "key"];
var actionTaken = "";
var item = "";
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
		switch(item)
		{
			case "short sword":
				for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "shovel")
						{
							gameMessage = "<br>You use the shovel to take the <strong>" + item + "</strong>.";
							backpack.push(item);
							//remove item from game world
							items.splice(itemIndexNumber, 1);
							itemLocation.splice(itemIndexNumber, 1);
							break;
						}
						else
						{
							gameMessage = "if only you had something to dig with...";
						}
					}
			break;
			case "wooden shield":
				for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "rope")
						{
							gameMessage = "<br>You use the rope to take the <strong>" + item + "</strong>.";
							backpack.push(item);
							//remove item from game world
							items.splice(itemIndexNumber, 1);
							itemLocation.splice(itemIndexNumber, 1);
							break;
						}
						else
						{
							gameMessage = "a rope would make this easy..."
						}
					}
			break;
			case "rope":
				gameMessage = "<br>You take the <strong>" + item + "</strong>.";
				backpack.push(item);
				//remove item from game world
				items.splice(itemIndexNumber, 1);
				itemLocation.splice(itemIndexNumber, 1);
			break;
			case "jar":
				gameMessage = "<br>You take the <strong>" + item + "</strong>.";
				backpack.push(item);
				//remove item from game world
				items.splice(itemIndexNumber, 1);
				itemLocation.splice(itemIndexNumber, 1);
			break;
			case "firefly":
				gameMessage = "<br>You take the <strong>" + item + "</strong>.";
				backpack.push(item);
				//remove item from game world
				items.splice(itemIndexNumber, 1);
				itemLocation.splice(itemIndexNumber, 1);
			break;
			case "long sword":
				var jarFound = false;
				var fireflyFound = false;
				for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "jar")
						{
							jarFound = true;
						}
						else if (backpack[i] == "firefly")
						{
							fireflyFound = true;
						}
					}
					if(jarFound == true && fireflyFound == true)
					{
						gameMessage = "<br>You take the <strong>" + item + "</strong>.";
						backpack.push(item);
						//remove item from game world
						items.splice(itemIndexNumber, 1);
						itemLocation.splice(itemIndexNumber, 1);
						break;
					}
					else
					{
						gameMessage = "Need something to light this cave..."
					}
			break;
			case "metal shield":
				if(backpack.length === 0){
					gameMessage = "if I had a way to pacify the wolf...";
					break;
				}
				else
					{
						for(var i = 0; i<backpack.length; i++)
						{
							if(backpack[i] == "flute")
							{
								gameMessage = "<br>You use the flute to take the <strong>" + item + "</strong> from the wolf.";
								backpack.push(item);
								//remove item from game world
								items.splice(itemIndexNumber, 1);
								itemLocation.splice(itemIndexNumber, 1);
								break;
							}
							else
							{
								gameMessage = "if I had a way to pacify the wolf...";
							}
						}
					}
			break;
			case "shovel":
				gameMessage = "<br>You take the <strong>" + item + "</strong>.";
				backpack.push(item);
				//remove item from game world
				items.splice(itemIndexNumber, 1);
				itemLocation.splice(itemIndexNumber, 1);
			break;
			case "flute":
				gameMessage = "<br>You take the <strong>" + item + "</strong>.";
				backpack.push(item);
				//remove item from game world
				items.splice(itemIndexNumber, 1);
				itemLocation.splice(itemIndexNumber, 1);
			break;
			case "jar":
				gameMessage = "<br>You take the <strong>" + item + "</strong>.";
				backpack.push(item);
				//remove item from game world
				items.splice(itemIndexNumber, 1);
				itemLocation.splice(itemIndexNumber, 1);
			break;
			case "key":
				var swordOn = false;
				var shieldOn = false;
				for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "short sword" || backpack[i]=="long sword")
						{
							swordOn = true;
						}
						else if (backpack[i] == "wooden shield" || "metal shield")
						{
							shieldOn = true;
						}
					}
					if(shieldOn == true && swordOn == true)
					{
						gameMessage = "<br>You take the <strong>" + item + "</strong>.";
						backpack.push(item);
						//remove item from game world
						items.splice(itemIndexNumber, 1);
						itemLocation.splice(itemIndexNumber, 1);
						break;
					}
					else
					{
						gameMessage = "Probably need a sword and shield for this fight..."
					}
			break;
		}
	}
	else
	{
		gameMessage = "You can't do that.";
	}
	console.log("var itemIndexNumber = items.indexOf(item): " + itemIndexNumber);
	console.log("item: " + item);
}//end take item function
function dropItem()
{
	if(backpack.length !== 0 )
	{
		var backpackIndexNumber = backpack.indexOf(item);
		if(backpackIndexNumber != -1)
		{
			gameMessage = "You drop the <strong> " + item + ".</strong>";
			items.push(backpack[backpackIndexNumber, 1]);
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
				if(location === 24)
				{
					for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "wooden shield" || backpack[i] == "metal shield")
						{
							gameMessage = "You use your sword and board to best the black knight!"
						}
					}
				}
			break;
			case "wooden shield":
				if(location === 24)
					{
						for(var i = 0; i<backpack.length; i++)
						{
							if(backpack[i] == "short sword" || backpack[i] == "long sword")
							{
								gameMessage = "You use your sword and board to best the black knight!"
							}
						}
					}
			break;
			case "rope":
			break;
			case "jar":
				for(var i = 0; i<backpack.length; i++)
							{
								if(backpack[i] == "firefly")
								{
									gameMessage = "You combine your jar and firefly to create a glowing lantern!";
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
							}
			break;
			case "long sword":
				if(location === 24)
				{
					for(var i = 0; i<backpack.length; i++)
					{
						if(backpack[i] == "wooden shield" || backpack[i] == "metal shield")
						{
							gameMessage = "You use your sword and board to best the black knight!"
						}
					}
				}
			break;
			case "metal shield":
				if(location === 24)
					{
						for(var i = 0; i<backpack.length; i++)
						{
							if(backpack[i] == "short sword" || backpack[i] == "long sword")
							{
								gameMessage = "You use your sword and board to best the black knight!"
							}
						}
					}
			break;
			case "shovel":
				if(mapLocation === 0)
				{
					gameMessage += "<br>You use the shovel to unearth the grave."
				}
				else
				{
					gameMessage = "You can't use that here.";
				}
			break;
			case "flute":
				if(mapLocation === 17)
				{
					gameMessage += "<br>You serenade the wolf with beautiful music";
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
	playerInput.toLowerCase();
	gameMessage = "";
	actionTaken = "";
	//find item action
	for(i = 0; i < knownItems.length; i++)
	{
		if(playerInput.indexOf(knownItems[i]) !== -1)
		{
			item = knownItems[i];
			console.log("player's item: " + item);
		}
	}
	//find player action
	for(i = 0; i < knownActions.length; i++)
	{
		if(playerInput.indexOf(knownActions[i]) !== -1)
		{
			actionTaken = knownActions[i];
			break;
		}
	}
	
	switch(actionTaken)
	{
		case "north":
			if(mapLocation >= 5)
			{
				mapLocation -= 5;
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
		default:
			gameMessage = "I don't understand that."
	}//end switch
	render();
}//end playGame function
function render()
{
	//reset input field values and placeholder
	output.innerHTML = "";
	input.value = "";
	input.placeholder = "type your action here";
	//displays location and image
	location.innerHTML = mapLocation + ": " + map[mapLocation];
	imgDisplay.src = "src/images/"+images[mapLocation]+".jpg";
	//display items
	for(var i = 0; i < items.length; i++)
	{
		if(mapLocation === itemLocation[i])
		{
			output.innerHTML += "<br>You see a(n) <strong>"+items[i]+"</strong> here.<br>";
		}
	}

	//game message
	output.innerHTML += gameMessage 
	if(backpack.length !==0)
	{
		output.innerHTML += "<br>You are carrying: <strong>" + backpack.join(", ") + "</strong>";
	}
	
}





}()); //end main function wrapper
