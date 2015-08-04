//monster smash js
(function(){ //function wrapper
	var monster =
	{
		IMG: "src/images/monsterTileSheet.png",
		SIZE: 128,
		COLUMNS: 3,
		HIDING: 0,
		JUMPING: 1,
		HIT: 2,
		state: this.HIDING,
		waitTime: undefined,
		timeToReset: 9,
		resetCounter: 0,
		getWaitTime: function()
		{
			this.waitTime = Math.ceil(Math.random() * 60);
		},
		sourceX: 0,
		sourceY: 0, 
		frameTotal: 5,
		currentFrame: 0,
		forward: true,
		updateAnimation: function()
		{
			if(this.state !== this.HIT)
			{
				if(this.waitTime > 0 || this.waitTime === undefined)
				{
					this.state = this.HIDING;
				}
				else
				{
					this.state = this.JUMPING;
				}
			}
			switch(this.state)
			{
				case this.HIT:
					this.currentFrame = 6;
					this.resetCounter ++;
					if(this.resetCounter === this.timeToReset)
					{
						this.state = this.HIDING;
						this.forward = true;
						this.currentFrame = 0;
						this.resetCounter = 0;
						this.getWaitTime();
					}
					break;
				case this.HIDING:
					this.currentFrame = 0;
					this.waitTime--;
				break;
				case this.JUMPING:
					if(this.currentFrame === this.frameTotal)
					{
						this.forward = false;
					}
					if(this.currentFrame === 0 && this.forward === false)
					{
						this.forward = true;
						this.getWaitTime();
						this.state = this.HIDING;
						break;
					}
					if(this.forward)
					{
						this.currentFrame++;
					}
					else
					{
						this.currentFrame--;
					}
			}//end switch
			this.sourceX = Math.floor(this.currentFrame % this.COLUMNS) * this.SIZE;
			this.sourceY = Math.floor(this.currentFrame / this.COLUMNS) * this.SIZE;
		}//end updateAnimation
	};//end monster object
	var gameTimer = {
		time: 0,
		interval: undefined,
		start: function()
		{
			var self = this;
			this.interval = setInterval(function(){self.tick();}, 1000);
		},
		stop: function()
		{
			clearInterval(this.interval);
		},
		reset: function()
		{
			this.time = 0;
		},
		tick: function()
		{
			this.time--;
		}
	};//end gameTimer obj
	var monstersHit = 0;
	var image = new Image();
	image.addEventListener("load", loadHandler, false);
	image.src = monster.IMG;
	var monsterObjects = [];
	var monsterCanavses = [];
	var monsterDrawingSurfaces = [];
	var ROWS = 3;
	var COLS = 4;
	var SIZE = monster.SIZE;
	var SPACE = 10;
	var score = document.querySelector("#score");
	var countdown = document.querySelector("#time");
	function mousedownHandler()
	{
		var theCanvasThatWasClicked = event.target;
		for(var i = 0; i < monsterCanavses.length; i++)
		{
			if(monsterCanavses[i] === theCanvasThatWasClicked && gameTimer.time > 0)
			{
				var monster = monsterObjects[i];
				if(monster.state === monster.JUMPING)
				{
					monstersHit++;
					monster.state = monster.HIT;
				}
			}
		}
		
	}//end mousedown
	function loadHandler()
	{
		buildMap();
		gameTimer.time = 30;
		gameTimer.start();
		updateAnimation();
	}//end loader
	function buildMap()
	{
		for(var row = 0; row<ROWS; row++)
		{
			for(var col = 0; col<COLS; col++)
			{
				var newMonsterObj = Object.create(monster);
				newMonsterObj.getWaitTime();
				monsterObjects.push(newMonsterObj);
				var canvas = document.createElement("canvas");
				canvas.setAttribute("width", SIZE);
				canvas.setAttribute("height", SIZE);
				stage.appendChild(canvas);
				canvas.style.top = row * (SIZE + SPACE) + "px";
				canvas.style.left = col *(SIZE + SPACE) + "px";
				canvas.addEventListener("mousedown", mousedownHandler, false);
				monsterCanavses.push(canvas);
				var drawSurface = canvas.getContext("2d");
				monsterDrawingSurfaces.push(drawSurface);
			}
		}
	}//end buildmap
	function updateAnimation()
	{
		if(gameTimer.time > 0)
		{
			setTimeout(updateAnimation, 120);
		}
		for(var i = 0; i < monsterObjects.length; i++)
		{
			monsterObjects[i].updateAnimation();
		}
		if(gameTimer.time === 0)
		{
			endGame();
		}
		render();
	}//end updateAnimation
	function endGame()
	{
		gameTimer.stop();
		for(var i = 0; i < monsterCanavses.length; i++)
		{
			var canvas = monsterCanavses[i];
			canvas.removeEventListener("mousedown", mousedownHandler, false);
		}
	}//end endGame func
	function render()
	{
		for(var i = 0; i < monsterObjects.length; i++)
		{
			var monster = monsterObjects[i];
			var surface = monsterDrawingSurfaces[i];
			surface.clearRect(0,0, SIZE, SIZE);
			surface.drawImage
			(
			image, 
			monster.sourceX, monster.sourceY, SIZE, SIZE,
			0, 0, SIZE, SIZE
			);
		}
		score.innerHTML = "Monsters Smashed: " + monstersHit; + "<br>";
		countdown.innerHTML = "Time Left: " + gameTimer.time;
	}//end render


}());//end main function wrapper