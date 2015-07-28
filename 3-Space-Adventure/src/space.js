//space adventure js
(function(){ //function wrapper

//html reference to stage and output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");
var fuel = document.querySelector("#fuel");
var food = document.querySelector("#grub");
var credits = document.querySelector("#credits");
var xp = document.querySelector("#xp");
window.addEventListener("keydown", keydownHandler, false);
//2-D 'map' array
var map =
[
	[2, 0, 0, 1, 0, 7],
	[0, 0, 6, 0, 0, 0],
	[3, 0, 0, 0, 0, 0],
	[0, 1, 0, 5, 0, 1],
	[0, 0, 0, 1, 0, 0],
	[8, 6, 0, 0, 0, 4],
];
//game objects array - things that move
var gameObjects =
[
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 9, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[8, 0, 0, 0, 0, 0],
];
//map key
var SPACE = 0;
var PIRATE = 1;
var PLANET_PURPLE = 2;
var PLANET_RED =3;
var PLANET_BROWN = 4;
var PLANET_GREEN = 5;
var STATION = 6;
var VORTEX = 7; //destination
var SHIP = 8; //player
var CTHULHU = 9; //wandering monster
//cell size
var SIZE = 64;
var ROWS = map.length;
var COLUMNS = map[0].length;
//player ship loc
var shipRow;
var shipCol;
//monster loc
var monsterRow;
var monsterCol;
//keydown values
var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
//game variables
var fuelAmount = 10;
var creditAmount = 10;
var foodAmount = 10;
var xpAmount = 0;
//output text
var gameMessage = "Use arrow keys to find your way to the vortex<br>"
	+ "You will need fuel, credits, and food to explore and fight";
output.innerHTML = gameMessage;
fuel.innerHTML = fuelAmount;
credits.innerHTML = creditAmount;
food.innerHTML = foodAmount;
xp.innerHTML = xpAmount;


//loop to get initial player ship position
for(var row = 0; row < ROWS; row++) 
{	
  for(var col = 0; col < COLUMNS; col++) 
  {
    if(gameObjects[row][col] === SHIP)
    { 
      shipRow = row;
      shipCol = col;
    }
    else if(gameObjects[row][col] === CTHULHU)
    {
    	monsterRow = row;
    	monsterCol = col;
    }
  }
}

render();
function keydownHandler(event)
{
	switch(event.keyCode)
	{
		case UP:
			if(shipRow > 0)
			{
				gameObjects[shipRow][shipCol] = 0; //clear current cell
				shipRow --; //change row value
				gameObjects[shipRow][shipCol] = SHIP; //move ship to new position
				console.log("up: " + UP);
			}
			break;
		case DOWN:
			if(shipRow < ROWS - 1)
			{
				gameObjects[shipRow][shipCol] = 0;
				shipRow ++;
				gameObjects[shipRow][shipCol] = SHIP;
				console.log("down: " + DOWN);
			}
			break;
		case LEFT:
			if(shipCol > 0)
			{
				gameObjects[shipRow][shipCol] = 0;
				shipCol --;
				gameObjects[shipRow][shipCol] = SHIP;
			}
			break;
		case RIGHT:
			if(shipCol < COLUMNS - 1)
			{
				gameObjects[shipRow][shipCol] = 0;
				shipCol ++;
				gameObjects[shipRow][shipCol] = SHIP;
			}
			break;
	} //end keydown switch
	moveMonster();
	switch(map[shipRow][shipCol])
	{
		case SPACE:
			gameMessage = "You drift through silent space."
			+ "<br><span style= \"float:left; color: red;\">fuel lost: "
			+"</span><span id = \"youLose\">-" 
			+ 1 + " </span></strong>";
			break;
		case PIRATE:
			gameMessage = "You've encountered space pirates! ayyyyy!!";
			fight();
			break;
		case PLANET_PURPLE:
			gameMessage = "An agricultural farm world for this system.";
			trade();
			break;
		case PLANET_BROWN:
			gameMessage = "An industrial mining colony remains here.";
			trade();
			break;
		case PLANET_GREEN:
			gameMessage = "An agricultural farm world for this system.";
			trade();
			break;
		case PLANET_RED:
			gameMessage = "You've entered a lawless domain, prepare to fight!";
			fight();
			break;
		case STATION:
			gameMessage = "A supply station, time to fill up!";
			trade();
			break;
		case VORTEX:
			gameMessage = "You've made it to the vortex!";
			//endGame();
			break;
	}//end switch
	//update ships supplies
	fuelAmount--;
	foodAmount--;
	if((fuelAmount <= 0 || foodAmount <= 0) || (map[shipRow][shipCol] === VORTEX) || (gameObjects[shipRow][shipCol] === CTHULHU))
	{
		endGame();
	}
	render();
}
function moveMonster()
{
	var UP = 1;
	var DOWN = 2;
	var LEFT = 3;
	var RIGHT = 4;
	var possibleDirection = [];
	var direction = undefined;
	if(monsterRow > 0)
	{
		var thingAbove = map[monsterRow - 1][monsterCol];
		if(thingAbove === SPACE)
		{
			possibleDirection.push(UP);
		}
	}
	if(monsterRow < ROWS -1)
	{
		var thingBelow = map[monsterRow + 1][monsterCol];
		if(thingBelow === SPACE)
		{
			possibleDirection.push(DOWN);
		}
	}
	if(monsterCol > 0)
	{
		var thingLeft = map[monsterRow][monsterCol - 1];
		if(thingLeft === SPACE)
		{
			possibleDirection.push(LEFT);
		}
	}
	if(monsterCol < COLUMNS - 1)
	{
		var thingRight = map[monsterRow][monsterCol + 1];
		if(thingRight === SPACE)
		{
			possibleDirection.push(RIGHT);
		}
	}
	if(possibleDirection.length !== 0)
	{
		var randomNum = Math.floor(Math.random() * possibleDirection.length);
		direction = possibleDirection[randomNum];
		switch(direction)
		{
			case UP:
				gameObjects[monsterRow][monsterCol] = 0;
				monsterRow--;
				gameObjects[monsterRow][monsterCol] = CTHULHU;
				break;
			case DOWN:
				gameObjects[monsterRow][monsterCol] = 0;
				monsterRow++;
				gameObjects[monsterRow][monsterCol] = CTHULHU;
				break
			case LEFT:
				gameObjects[monsterRow][monsterCol] = 0;
				monsterCol--;
				gameObjects[monsterRow][monsterCol] = CTHULHU;
				break
			case RIGHT:
				gameObjects[monsterRow][monsterCol] = 0;
				monsterCol++;
				gameObjects[monsterRow][monsterCol] = CTHULHU;
				break;
		}//end switch
	}//end if
		

}//end monsterMove func
function fight()
{
	var shipStrength = Math.ceil((foodAmount+creditAmount)/2); 
	var pirateStrength = Math.ceil(Math.random()*shipStrength *2);
	if(pirateStrength > shipStrength) 
	{
		var creditsLost = Math.round(pirateStrength/2);
		creditAmount -= creditsLost;
		fuelAmount--;
		xpAmount += 1;
		gameMessage += "<br>You fight and <strong><em>LOSE.</em></strong><br>"
		+ "<span style= \"float:left; color: red;\">credits lost: </span><span id = \"youLose\">-" 
		+ creditsLost + " </span></strong><br>"
		+ "<span style= \"float:left; color: red;\">fuel lost: </span><span id = \"youLose\">-" 
		+ 1 + " </span></strong><br>"
		+ "<span id = \"youWin\" style= \"float:left;\">experience gained: </span><span id = \"youWin\">+" + 1
		+ "</span><br>Your ship's strength: <span>" 
		+ shipStrength + "</span><br>The pirate's strength: <span>" 
		+ pirateStrength + "</span>";
	}
	else
	{
		var pirateCredits = Math.round(pirateStrength/2);
		creditAmount += pirateCredits;
		xpAmount += 2;
		gameMessage += "<br>You fight and <strong><em>WIN.</em></strong><br>"
		+"<span id = \"youWin\" style= \"float:left;\">credits gained: </span><span id = \"youWin\">+" 
		+ pirateCredits + " </span></strong><br>"
		+ "<span id = \"youWin\" style= \"float:left;\">experience gained: </span><span id = \"youWin\">+" + 2
		+ "</span><br>Your ship's strength: <span>" + shipStrength 
		+ "</span><br>pirate's strength: <span>" + pirateStrength + "</span>";
	}
}//end fight function
function trade()
{
	var planetResources = xpAmount + creditAmount;
	var cost = Math.ceil(Math.random() * planetResources);
	if(creditAmount > cost)
	{
		switch(map[shipRow][shipCol])
		{
			case PLANET_PURPLE:
				foodAmount += cost;
				xpAmount += 2;
				gameMessage += " Nice trade! You've gained food and experience.<br>"
				+ "<span id = \"youWin\" style= \"float:left;\">food gained: </span><span id = \"youWin\">+" 
				+ cost + " </span><br>" 
				+ "<span id = \"youWin\" style= \"float:left;\">experience gained: </span><span id = \"youWin\">+" + 2 + "</span>";
				break;
			case PLANET_RED:
				fight();
				break;
			case PLANET_GREEN:
				foodAmount += cost;
				xpAmount += 2;
				gameMessage += " Nice trade! You've gained food and experience.<br>"
				+ "<span id = \"youWin\" style= \"float:left;\">food gained: </span><span id = \"youWin\">+" 
				+ cost + " </span><br>" 
				+ "<span id = \"youWin\" style= \"float:left;\">experience gained: </span><span id = \"youWin\">+" + 2 + "</span>";
				break;
			case PLANET_BROWN:
				fuelAmount += cost;
				xpAmount += 2;
				gameMessage += " Nice trade! You've gained fuel and experience.<br>"
				+ "<span id = \"youWin\" style= \"float:left;\">fuel gained: </span><span id = \"youWin\">+" 
				+ cost + " </span><br>" 
				+ "<span id = \"youWin\" style= \"float:left;\">experience gained: </span><span id = \"youWin\">+" + 2 + "</span>";
				break;
			case STATION:
				console.log("cost: " + cost);
				fuelAmount += cost;
				xpAmount += 1;
				gameMessage += " Nice trade! You've gained fuel and experience.<br>"
				+ "<span id = \"youWin\" style= \"float:left;\">fuel gained: </span><span id = \"youWin\">+" 
				+ cost + " </span><br>" 
				+ "<span id = \"youWin\" style= \"float:left;\">experience gained: </span><span id = \"youWin\">+" + 1 + "</span>";
				break;
		} //end trade switch
	} //end if
	else
	{
		gameMessage += "<span id = \"youLose\"> We have insufficient credits to trade here..</span>"
		+ "<br>station price: <span>" + cost
		+ "</span><br>total credits: <span> " + creditAmount+"</span>";
	}
}//end trade func
function endGame()
{
	if(map[shipRow][shipCol] === VORTEX)
	{
		var score = creditAmount+foodAmount+xpAmount+fuelAmount;
		gameMessage += " Dear god man you've done it!"
		+ "<br><h2 class = \"text-center\">Final Score: <strong style = \"color: #ff57c5;\">" 
		+ score + "</strong></h2>";		
	}
	else if (gameObjects[shipRow][shipCol] === CTHULHU)
	{
		gameMessage = "A powerful CTHULHU devours all life and energy within your ship. "
			+ "Probably should have avoided such a beast!"
			+ "<br><h2 style = \"color:red; text-align: center;\">You Lose</h2>";
	}
	else if(fuelAmount <= 0)
	{
		gameMessage = "No..More..Fuel..The crew sit in silence, throwing nervous glances between themselves. "
		+ "It won't be long now before hunger and desperation consume the last of you."
		+ "<br><h2 style = \"color:red; text-align: center;\">You Lose</h2>";
	}
	else
	{
		gameMessage = "No..More..Food..With no food, what little crew left alive is too weak to seek help.."
		+"your ship drifts forever into the void."
		+ "<br><h2 style = \"color:red; text-align: center;\">You Lose</h2>";
	}//end if
	window.removeEventListener("keydown", keydownHandler, false);
}// end endGame func

function render()
{
	//look for old child divs and remove
	if(stage.hasChildNodes())
	{
		for(var i=0; i< ROWS*COLUMNS; i++)
		{
			stage.removeChild(stage.firstChild);
		}
	}
	//adds new img children to stage
	for(var row = 0; row < ROWS; row++)
	{
		for(var col = 0; col < COLUMNS; col++)
		{
			//create a new img div to display
			var cell = document.createElement("img");
			cell.setAttribute("class", "game-cell");
			stage.appendChild(cell);
			//find correct image to display
			switch(map[row][col])
			{
				case SPACE:
					cell.src="src/images/open-space.png";
					break;
				case PIRATE:
					cell.src=("src/images/pirateship.png");
					break;
				case PLANET_PURPLE:
					cell.src=("src/images/planet-purple.png");
					break;
				case PLANET_RED:
					cell.src=("src/images/planet-red.png");
					break;
				case PLANET_GREEN:
					cell.src=("src/images/planet-green.png");
					break;
				case PLANET_BROWN:
					cell.src=("src/images/planet-brown.png");
					break;
				case STATION:
					cell.src=("src/images/spacestation.png");
					break;
				case VORTEX:
					cell.src=("src/images/vortex.png");
					break;
			}
			switch(gameObjects[row][col])
			{
				case SHIP:
					cell.src = "src/images/ship.png";
					break;
				case CTHULHU:
					cell.src = "src/images/monster.png";
					break;
			}
			//position image cell
			cell.style.top = row * SIZE + "px";
			cell.style.left = col * SIZE + "px";
		} //inner for loop end
	} //outer for loop end
	fuel.innerHTML = fuelAmount;
	credits.innerHTML = creditAmount;
	food.innerHTML = foodAmount;
	xp.innerHTML = xpAmount;
	output.innerHTML = gameMessage;
}

}());//end main function wrapper