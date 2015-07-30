//monster smash js
(function(){ //function wrapper
	var monster =
	{
		image: "src/images/monsterTileSheet.png",
		HIDE: 0,
		SHOW: 1,
		state: 0
	};
	var canvas = document.querySelector("canvas");
	var surface = canvas.getContext("2d"); 
	var monsterImg = new Image(); //blank image object
	monsterImg.addEventListener("load", render, false); //force img to load before running js
	monsterImg.src = monster.image;
	window.addEventListener("keydown", keydownHandler, false);

	function keydownHandler(event)
	{
		console.log("keydown fired");
		showMonster();
	}
	function hideMonster()
	{
		monster.state = monster.HIDE;
		render();
	}
	function showMonster()
	{
		monster.state = monster.SHOW;
		setTimeout(hideMonster, 1000);
		render();
	}
	function render()
	{
		surface.drawImage
		(
			monsterImg,
			0, 128 * monster.state, 128, 128,
			0, 0, 64, 64
		);
	}

}());//end main function wrapper