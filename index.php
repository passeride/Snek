<html>
    <head>
        <title>
            snek
        </title>
        <script src="src/Config.js"></script>
        <script src="src/keypress-2.1.4.min.js" ></script>
        <script src="src/Player.js" ></script>
        <script src="src/NomNom.js" ></script>
        <script src="src/Segment.js" ></script>
        <script src="src/GameManager.js" ></script>
        <style>
         #headline{
             text-align:center;
         }
         .playerBoard{
             outline:2px solid black;
             width:100px;
         }
         #player1{
             background-color:blue;
             color:white;
             margin-left:10%;
             float:left;
         }
         #player2{
             background-color:red;
             color:white;
             margin-right:10%;
             float:right;
         }
         canvas{
             display:block;
             margin-left:auto;
             margin-right:auto;
             width:800px;
         }
         .BigButtonClass{
             width:200px;
             height:100px;
             float:center;
             display:block;
             color:white;
             border: none;
             background-color:black;
             margin-left:auto;
             margin-right:auto;
         }
        </style>
    </head>
    <body>
        <!-- Commenting for testing magit -->

        <h1 id="headline" >Top Snek! </h1>

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
        <div >
            <button type="button" class="BigButtonClass" id="startButton" onclick="restart()" name="startButton"> Restart! </button>
        </div>
        <canvas id="daCanvas" width="800" height="800" style="position:aboslute;border:2px solid black; margin-left:auto; margin-right:auto;" >
            Your browser does not support canvas!
        </canvas>

    </body>
</html>
