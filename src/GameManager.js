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
var UP = 1, RIGHT = 2, DOWN = 3, LEFT = 4;

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
    Player1 = new Player(5, 5);
    
    
    // Setting up keyboard listnere
    keyboardListener.simple_combo('a', function(){
	
    });
}

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


function update(){
//    console.log('hey');
}

function draw(){
    ctx.clearRect(0,  0, c.width, c.height);// Clears the previous drawing off canvas
    drawGrid();
}


function drawGrid(){

}
