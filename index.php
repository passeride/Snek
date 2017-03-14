<html>
    <head>
	<title>
	    snek
	</title>
	<script src="src/keypress-2.1.4.min.js" ></script>
	<script src="src/Player.js" ></script>
	<script src="src/NomNom.js" ></script>
	<script src="src/Segment.js" ></script>
	<script src="src/GameManager.js" ></script>
	<style>
	 .playerBoard{
	     background-color:gray;
	     outline:2px solid black;
	     width:100px;
	     margin-left:auto;
       margin-right:auto;
	     display:block;
	 }
	 canvas{
	     display:block;
	     margin-left:auto;
	     margin-right:auto;
	     width:800px;
	 }
	</style>
    </head>
    <body>
	<!-- Commenting for testing magit -->

	<h1 id="scoreCounter" > Snek! </h1>

	<div id="player1" name="player1" class="playerBoard" >
	    <p> Player1 </p>
	    <p id="score">
		      Score: 0pp
	    </p>
	</div>

	<div name="player2" id="player2" class="playerBoard" >
	    <p> Player2 </p>
	    <p id="score">
		      Score: 0
	    </p>
	</div>

	<canvas id="daCanvas" width="800" height="800" style="position:aboslute;border:2px solid black; margin-left:auto; margin-right:auto;" >
	    Your browser does not support canvas!
	</canvas>

    </body>
</html>
