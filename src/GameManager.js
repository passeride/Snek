document.addEventListener('DOMContentLoaded', start, false);

// Canvas
var c;
// Context
var ctx;

// Player objects found in src/player.js
var Player1, player2;
// Keyboard listener, from github
var keyboardListener;


// Setting some constanct's to keep direction 
var UP = 3, RIGHT = 2, DOWN = 1, LEFT = 4;

// Config will read json queried from server
var config;

// How many squares in x and y dimension on board
var squares = 80;

var dimensions = 800/squares;

function start(){
    // Getting canvas
    c = document.getElementById('daCanvas');// From index.php canvas object
    ctx = c.getContext('2d'); // Getting context used for drawing and more

    dimension = c.width / squares; // Making sure the dimension of every square is the number of squares devided by witdth of canvas
    
    // getting the animantion frame
    setUpAnimationFrame();

    // Setting up players
    Player1 = new Player(1, 5, 5);
    Player2 = new Player(2, 10, 10);
    Player2.color = '#00FF00';
    
    setUpKeyboardListener();
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
    var animation = function(){
        animationFrame = requestAnimationFrame(animation);
        update();
	draw();
    }
    animationFrame = requestAnimationFrame(animation);
}

/*
  Here the game logic will be processed, such as adding input logic, and moving pieces
*/
function update(){
    //    console.log('hey');
    Player1.move();
    Player2.move();
}

/*
  After update this function will kick inn to draw everything on the canvas
*/
function draw(){
    ctx.clearRect(0,  0, c.width, c.height);// Clears the previous drawing off canvas
    drawGrid();
    Player1.draw(ctx);
    Player2.draw(ctx);
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
