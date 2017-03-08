document.addEventListener('DOMContentLoaded', start, false);
window.addEventListener('keydown', this.keyboardInput, false);
// This is start
var c;
var ctx;

var squares = 15;
var dimensions = 400/squares;

var upArrow = false, downArrow = false, leftArrow = false, rightArrow = false;
var currPositionX = squares/2, currPositionY = squares/2;

var points = 0;

function NomNom(x, y){
    this.x = x;
    this.y = y;
    this.type = 1;
}

function segment(x, y){
    this.x = x;
    this.y = y;
    this.isHead = false;
    this.direction = right;
    
    // Truning functions
    this.left = function(){
	this.x -= 1;
    }

    this.right = function(){
	this.x += 1;
    }

    this.up = function(){
	this.y += 1;
    }

    this.down = function(){
	this.y -= 1;
    }

    this.move = function(dirChanged){
	if(!dirChanged){
	    switch(this.direction){
	    case up:
		this.up();
		break;
	    case down:
		this.down();
		break;
	    case left:
		this.left();
		break;
	    case right:
		this.right();
		break;
	    }
	}
    }
    
    // Set new position function
    this.setNewPosition = function(x, y){
	this.x = x;
	this.y = y;
    };
}

var snek = [];
var head;
var up = 1, right = 2, down = 3, left = 4;
// 1 is up, 2 is right, 3 is down 4 is left
var direction = right;
var currNomNom;
var id;
var FPS = 2;

function start(){    
    c = document.getElementById('daCanvas');
    ctx = c.getContext('2d');
    // Creating snek
    var headSegment = new segment(parseInt(squares/2), parseInt(squares/2));
    headSegment.isHead = true;
    head = headSegment;
    snek.push(headSegment);
    // Create nomnom for snek
    currNomNom = new NomNom(parseInt(Math.random() * squares),parseInt( Math.random() * squares));
    // Setting up interval
    id = setInterval(function(){
	update();
    }, 1000/FPS);
}

function keyboardInput(e){
    switch(e.keyCode){
    case 83:
	console.log('up');
	upArrow = true;
	break;
    case 87:
	console.log('down');
	downArrow = true;
	break;
    case 65:
	console.log('left');
	leftArrow = true;
	break;
    case 68:
	console.log('right');
	rightArrow = true;
	break;
    }
}

function update(){
    ctx.clearRect(0, 0, c.width, c.height);
    drawGrid();
    move();
    checkPosition();
    drawNomNom();
    drawSnek();
}

function checkPosition(){
    console.log('x: ' + head.x + ' ' + currNomNom.x + ' y:' + head.y + ' ' + currNomNom.y);
    if(head.x == currNomNom.x && head.y == currNomNom.y){
	console.log('hit!');
	currNomNom.x = parseInt(Math.random() * squares);
	currNomNom.y = parseInt(Math.random() * squares);
    }
}

function drawNomNom(){
    ctx.fillStyle = '#FF0000';
    //    ctx.fillRect(currNomNom.x * dimensions - (dimensions / 2), currNomNom.y * dimensions - (dimensions / 2), dimensions, dimensions);
    ctx.fillRect(currNomNom.x * dimensions, currNomNom.y * dimensions, dimensions, dimensions);
}


function move(){
    var dirChange = false;
    if(upArrow){
	head.up();
	head.direction = up;
	upArrow = false;
	dirChange = true;
    }else if(downArrow){
	head.down();
	head.direction = down;
	downArrow = false;
	dirChange = true;
    }else if(leftArrow){
	head.left();
	head.direction = left;
	leftArrow = false;
	dirChange = true;
    }else if(rightArrow){
	head.right();
	head.direction = right;
	rightArrow = false;
	dirChange = true;
    }

    head.move(dirChange);
    
}

function drawSnek(){
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(head.x * dimensions,  head.y * dimensions, dimensions, dimensions);
}

function drawGrid(){
    for(var i = 0; i < squares; i++){
	ctx.beginPath();
	ctx.moveTo(i * dimensions, 0);
	ctx.lineTo(i * dimensions, 400);
	ctx.stroke();
    }
    for(var i = 0; i < squares; i++){
	ctx.beginPath();
	ctx.moveTo(0, i * dimensions);
	ctx.lineTo(400, i * dimensions);
	ctx.stroke();
    }
}
