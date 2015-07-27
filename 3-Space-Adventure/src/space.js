//space adventure js
(function(){ //function wrapper

//html reference to stage and output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");
//2-D 'map' array
var map =
[
	[0, 1, 0, 0, 0, 4],
	[0, 0, 2, 3, 0, 0],
	[1, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 1, 0],
	[0, 0, 2, 0, 0, 3]
];
//game objects array - things that move
var gameObjects =
[
	[0, 1, 0, 0, 0, 4],
	[0, 0, 2, 3, 0, 0],
	[1, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 1, 0],
	[5, 0, 2, 0, 0, 3]
];
//map key
var SPACE = 0;
var PIRATE = 1;
var PLANET_PURPLE = 2;
//var PLANET_RED =3;
//var PLANET_BROWN = 4;
//var PLANET_GREEN = 5;
var STATION = 3;
var VORTEX = 4; //destination
var SHIP = 5; //player
//cell size
var SIZE = 64;
var ROWS = map.length;
var COLUMNS = map[0].length;
//player ship loc
var shipRow;
var shipCol;
for(var row = 0; row < ROWS; row++) 
{	
  for(var col = 0; col < COLUMNS; col++) 
  {
    if(gameObjects[row][col] === SHIP)
    { 
      shipRow = row;
      shipColumn = col;
    }
  }
}
render();
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
					cell.src=("src/images/open-space.png");
					break;
				case PIRATE:
					cell.src=("src/images/pirateship.png");
					break;
				case PLANET_PURPLE:
					cell.src=("src/images/planet-purple.png");
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
					cell.src="src/images/ship.png";
					break;
			}
			//position image cell
			cell.style.top = row * SIZE + "px";
			cell.style.left = col * SIZE + "px";
		}
	}
}
}());//end main function wrapper