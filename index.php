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
             display:inline-block;
             float:center;
             margin-left:auto;
             margin-right:auto;
         }
         #player1{
             background-color:blue;
             color:white;
             /* margin-left:20%; */
             /* float:left; */
         }
         #player2{
             background-color:red;
             color:white;
             /* margin-right:20%; */
             /* float:right; */
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
         .rules{
             background-color:gray;
             color:white;
             display:block;
             left:0;
             width:20%;
             float:left;
             border:2px solid black;
             top:50%;
             position:fixed;
         }
         .playerBoard p{
             margin:0px;

         }
        </style>
    </head>
    <body>
        <h1 id="headline" >Top Snek! </h1>
        <div id="player1" name="player1" class="playerBoard" >
            <p> Player1 </p>
            <p id="player1_score">
                Score: 0
            </p>
            <p id="player1_blocks">
                Blocks: 4
            </p>
        </div>

        <div name="player2" id="player2" class="playerBoard" >
            <p> Player2 </p>
            <p id="player1_score">
                Score: 0
            </p>
            <p id="player2_score">
                Blocks: 4
            </p>
        </div>
        <div >
            <button type="button" class="BigButtonClass" id="startButton" onclick="restart()" name="startButton">
                Restart!
            </button>
        </div>
        <!--
        <label>
            MapSelect
            <select id="mapSelect">
                <option name="hey">Waxzup</option>
            </select>
        </label>
        <div class="rules" id="rulesBoard">
            Pick up noms!<br/>
            Don't hit Black Blocks <br/>
            Don't hit yourslef! <br/>
            Hit other player to make big snek smaller snek! <br/>
        </div>
        -->
            <canvas id="daCanvas" width="800" height="800" style="position:aboslute;border:2px solid black; margin-left:auto; margin-right:auto;" >
            Your browser does not support canvas!
        </canvas>

    </body>
</html>
