(function(){

	//game variables
	var alienX = 80;
	var alienY = 20;
	var guessX = 0;
	var guessY = 0;
	var shotsAvail = 8;
	var shotsFired = 0;
	var gameState = "Shots Fired: " + shotsFired + " Shots Remaining: " + shotsAvail;
	var gameWon = false;
	//game status
	var gameStatus = document.querySelector("#gameStatus");
	gameStatus.innerHTML = gameState;
	//game objects
	var cannon = document.querySelector("#cannon");
	var missile = document.querySelector("#missile");
	var alien = document.querySelector("#alien");
	var explosion = document.querySelector("#explosion");
	//input and output
	var output = document.querySelector("#output");
	var inputX = document.querySelector("#inputX");
	var inputY = document.querySelector("#inputY");
	//button
	var button = document.querySelector("#fire");
	button.style.cursor = "pointer";
	button.addEventListener("click", clickHandler, false);
	console.log("alienX = " + alienX);
	console.log("alienY = " + alienY);
	window.addEventListener("keydown", keydownHandler, false);
	//click handler
	function clickHandler(){
		console.log("alienX = " + alienX);
	console.log("alienY = " + alienY);
		validateInput();
	}
	//keydown handler
	function keydownHandler(e){
		if(e.keyCode === 13){
			validateInput();
		}
	}
	//input checker
	function validateInput(){
		guessX = parseInt(inputX.value);
		guessY = parseInt(inputY.value);
		if(isNaN(guessX) || isNaN(guessY)){
			output.innerHTML = "Please enter a number.";
		}
		else if (guessX > 300 || guessY > 300){
			output.innerHTML = "Please enter a number less than 300";
		}
		else{
			playGame();
		}
	}
	//render game
	function render(){
		//move alien icon
		alien.style.left = alienX + "px";
		alien.style.top = alienY + "px";
		//move cannon
		cannon.style.left = guessX + "px";
		//move missle
		missile.style.left = guessX + "px";
		missile.style.top = guessY + "px";
		if(gameWon){
			explosion.style.display = "block";
			explosion.style.left = alienX + "px";
			explosion.style.top = alienY + "px";
			alien.style.display = "none";
			missile.style.display = "none";
		}
	}
	//playGame() function
	function playGame(){
		shotsAvail--;
		shotsFired++;
		output.innerHTML = "Enter X & Y position (0-300), then click fire.<br>";
		gameState = "Shots Fired: " + shotsFired + " Shots Remaining: " + shotsAvail;
		gameStatus.innerHTML = gameState;
		if(guessX >= alienX &&  guessX <= alienX+20){
			//hit x axis, check Y axis
			if(guessY >= alienY && guessY <= alienY+20){
				//hit X & Y
				gameWon = true;
				endGame();
			}
		}
		else {
			output.innerHTML += shotsFired + ": <strong>MISS! <strong>";
			if(shotsAvail < 1){
				endGame();
			}
		}
		if(!gameWon){
			//randomize alien's X position
			alienX = Math.floor(Math.random()* 281);
			//advance Y coords so alien moves down
			alienY += 30;
		}
		render();
	}
	function endGame(){
		if(gameWon){
			gameStatus.innerHTML = "<h3> YOU WIN!</h3>";
			output.innerHTML = "<h3> YOU WIN!</h3>";
		}
		else {
			gameStatus.innerHTML = "<h3> The Earth has been DESTROYED!</h3>";
			output.innerHTML = "<3> YOU LOSE!</h3>";
		}
		//Disable the button
 		button.removeEventListener("click", clickHandler, false);
  		button.disabled = true;
  		//Disable the enter key
  		window.removeEventListener("keydown", keydownHandler, false);
  		//Disable the input fields
	    inputX.disabled = true;
	    inputY.disabled = true;
	}
}());
