document.addEventListener('DOMContentLoaded', preLoad, false);

function preLoad(){
    loadMap(1);
}
// Canvas
var c;
// Context
var ctx;

// Player objects found in src/player.js
var Player1;
var Player2;
var Players = [];
// Keyboard listener, from github
var keyboardListener;

// This will be true as long as game is running
var gameRunning = true;
// Setting some constanct's to keep direction
var UP = 3, RIGHT = 2, DOWN = 1, LEFT = 4;

// Config will read json queried from server
var config;

// How many squares in x and y dimension on board
var squares;

// size of one square
var dimensions;

// Nom nom is what the sneks want to eat
// It's one or more that are allways here, when eaten, they just increase points and relocate, possibly also changing type.
var Noms = [];
var Blocks = [];

// If this is true the snek will just loop around,
// if it's false it will dies upon colliding with wall
var wallLoop = true;

// Colors for soling the stuff
var Colors = ["#00F0F0", "#F0F000"];



    FPS  = 30;// TODO: make it possible to change speed of sneks

// These are the html tags for the scoreboard, to update score
var player1ScoreBoard;
var player2ScoreBoard;

// This is the fps for phycis and movement, but not for rendering
var FPS = 10.0;
var MaxFPS = 30;
var MinFPS = 10;

// This is the config file
var CFG;

// This is the first function to be called,  to set everything up
function start(){
    // Reading from the confg
    squares = CFG.grid;
    wallLoop = CFG.wall_map_passtrgough;
    // Getting DOM Stuff
    player1ScoreBoard = document.getElementById('player1');
    player2ScoreBoard = document.getElementById('player2');

    // Getting canvas
    c = document.getElementById('daCanvas');// From index.php canvas object
    ctx = c.getContext('2d'); // Getting context used for drawing and more

    dimensions = c.width / squares; // Making sure the dimension of every square is the number of squares devided by witdth of canvas

    // getting the animantion frame
    setUpAnimationFrame();

    // Setting up blocks
    for(i = 0; i < CFG.blocks.length;i++){
        var block = new Block(CFG.blocks[i].x,  CFG.blocks[i].y, CFG.blocks[i].color);
        Blocks.push(block);
    }

    // Setting up players
    /*
    for(i = 0; i < CFG.players.length; i++){
        var player = new Player(i, CFG.players[i].startX, CFG.players[i].startY);
        player.colo = CFG.players[i].color;
        Players.push(player);
    }*/ // For when i set up more than two players
    Player1 = new Player(1, CFG.players[0].startX, CFG.players[0].startY);
    Player2 = new Player(2, CFG.players[1].startY, CFG.players[1].startY);
    Player1.color = CFG.players[0].color;
    Player2.color = CFG.players[1].color;

    setUpKeyboardListener();

    // Set up NomNom
    var nom = new NomNom(10, 10);
    Noms.push(nom);
    createNewNom(Noms.indexOf(nom));

    tick();// This will start the logic
    // Player1.tick();
    // Player2.tick();
}

function createNewNom(i){
    var newInt = parseInt(Math.random() * Colors.length);
    console.log(newInt);
    Noms[i].relocate(Colors[newInt], newInt);
};

/*
  this function will be called to start another game, so mostly to resett variables.
*/
function restart(){
    Noms=[];
    Player1 = new Player(1, CFG.players[0].startX, CFG.players[0].startY);
    Player2 = new Player(2, CFG.players[1].startY, CFG.players[1].startY);
    Player1.color = CFG.players[0].color;
    Player2.color = CFG.players[1].color;
    var nom = new NomNom(1, 1);
    nom.relocate();
    Noms.push(nom);

    if(!gameRunning){
        gameRunning = true;
        setUpAnimationFrame();
        tick();
    }
//    tick();
}

/*
  Setting up keybindings as follows
  Player 1: WASD
  PLAYER 2: Arrow keys
*/
function setUpKeyboardListener(){
    // Setting up keyboard listnere
    keyboardListener = new window.keypress.Listener();

    keyboardListener.simple_combo('a', function(){
        Player1.left();
    });
    keyboardListener.simple_combo('w', function(){
        Player1.up();
    });
    keyboardListener.simple_combo('s', function(){
        Player1.down();
    });
    keyboardListener.simple_combo('d', function(){
        Player1.right();
    });
    // Player 2
    keyboardListener.simple_combo('left', function(){
        Player2.left();
    });
    keyboardListener.simple_combo('up', function(){
        Player2.up();
    });
    keyboardListener.simple_combo('down', function(){
        Player2.down();
    });
    keyboardListener.simple_combo('right', function(){
        Player2.right();
    });
}


/*
  This is something new, where you can request an animation frame from the brwoser
  and i think it's no long processed on the GUI thread.
  Hopefully it will result in smoother gameplay.
*/
function setUpAnimationFrame(){
    var counter = 0;
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame ||
        window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame ||
        window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame;
    var animation = function(e){ // Apperently is 60 fps
        if(gameRunning){
            animationFrame = requestAnimationFrame(animation);// This is the number frame number 1,2,3....
            draw();
        }
    };
    animationFrame = requestAnimationFrame(animation);
}

/*
  this will run a seperate script to do the logic
  i do this because if not i would be restrained to 60 fps, and i plan to use fps to manipulate difficulty
  */
function tick(){
    if(gameRunning){
        update();
        setTimeout(tick,1000/FPS);
    }
}
/*
  Here the game logic will be processed, such as adding input logic, and moving pieces
*/
function update(){
    if(Player1.alive && Player2.alive){
        // Checks the position of players
        Player1.checkPosition();// Check position and then move
        Player1.move();
        Player2.checkPosition();
        Player2.move();
        // Updating the scoreboard
        player1ScoreBoard.innerHTML = 'Score: ' + Player1.score;
        player2ScoreBoard.innerHTML = 'Score: ' + Player2.score;
    }else{
        finnishGame();
    }
}

/*
  This is called when one or booth of the players are dead.
*/
function finnishGame(){
    if(!Player1.alive){
        player1ScoreBoard.innerHTML = 'DEAD! Score: ' + Player1.score;
    }else{
        player1ScoreBoard.innerHTML = 'Alive! Score: ' + Player1.score;
    }

    if(!Player2.alive){
        player2ScoreBoard.innerHTML = 'DEAD! Score: ' + Player2.score;
    }else{
        player2ScoreBoard.innerHTML = 'Alive! Score: ' + Player2.score;
    }

    if(Player1.score > Player2.score){
        console.log('player 1 won');
    }else if(Player1.score == Player2.score){
        console.log("It's a tie!");
    }else{
        console.log('player 2 won');
    }

    gameRunning = false;

}

/*
  After ulse{pdate this function will kick inn to draw everything on the canvas
*/
function draw(){
    // Clears the previous drawing off canvas
    ctx.clearRect(0,  0, c.width, c.height);

    // Draw's the grid as background
    drawGrid();

    // Draw's solids
    for(i = 0; i < Blocks.length;i++){
        Blocks[i].draw(ctx);
    }

    // Draw player sneks
    Player1.draw(ctx);
    Player2.draw(ctx);

    // Draw the nom nom
    for(var i = 0; i < Noms.length; i++){
        var nom = Noms[i];
        nom.draw(ctx);
    }
}


/*
  Thiw will draw the gridlines, and is called first in the draw function to make sure other object overlap the grid and not the other way round.
*/
function drawGrid(){
    ctx.strokeStyle = '#DDDDDD';
    for(var i = 0; i < squares; i++){
        ctx.beginPath();
        ctx.moveTo(i * dimensions, 0);
        ctx.lineTo(i * dimensions, c.height);
        ctx.stroke();
    }
    for(var i = 0; i < squares; i++){
        ctx.beginPath();
        ctx.moveTo(0, i * dimensions);
        ctx.lineTo(c.height, i * dimensions);
        ctx.stroke();
    }
}

function Block(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;

    this.draw = function(ctx){
        ctx.fillStyle = color;
        ctx.fillRect(x * dimensions, y * dimensions, dimensions, dimensions);
    };
}
