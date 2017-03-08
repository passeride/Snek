document.addEventListener('DOMContentLoaded', start, false);
window.addEventListener('keypress', this.keyboardInput, false);
// This is start
var c;
var ctx;

var squares = 80;
var dimensions = 800/squares;

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
    this.nextSegment;
    // Truning functions
    this.left = function(){
	if(this.x - 1 >= 0)
	    this.x -= 1;
	else
	    alive = false;
    }

    this.right = function(){
	if(this.x + 1 <= squares)
	    this.x += 1;
	else
	    alive = false;
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
var tail;
var up = 1, right = 2, down = 3, left = 4;
// 1 is up, 2 is right, 3 is down 4 is left
var direction = right;
var currNomNom;
var id;
var FPS = 30;
var alive = true;
var aliveColor = '#00FF00';
var deathColor = '#DDFFDD';

function start(){    
    c = document.getElementById('daCanvas');
    ctx = c.getContext('2d');
    // Creating snek
    var headSegment = new segment(parseInt(squares/2), parseInt(squares/2));
    headSegment.isHead = true;
    head = headSegment;
    tail = headSegment;
    snek.push(headSegment);
    // Create nomnom for snek
    currNomNom = new NomNom(parseInt(Math.random() * squares),parseInt( Math.random() * squares));
    // Setting up interval
    id = setInterval(function(){
	update();
    }, 1000/FPS);
}

function keyboardInput(e){
    console.log(e.keyCode);
    switch(e.keyCode){
    case 83:
	upArrow = true;
	break;
    case 87:
	downArrow = true;
	break;
    case 65:
	leftArrow = true;
	break;
    case 68:
	rightArrow = true;
	break;
    case 38:
	// Player two up
	break;
    case 37:
	// Player two left
	break;
    case 39:
	// player two right
	break;
    case 40:
	// player two down
	break;
    }
}

function update(){
    ctx.clearRect(0, 0, c.width, c.height);
    drawGrid();
    if(alive){
	move();
	checkPosition();
	moveSegments();
    }
    drawNomNom();
    drawSnek();
    drawSegments();
    document.getElementById('scoreCounter').innerHTML = "Score: " + points;
//    console.log(snek);
}

function checkPosition(){
//    console.log('x: ' + head.x + ' ' + currNomNom.x + ' y:' + head.y + ' ' + currNomNom.y);
    if(head.x == currNomNom.x && head.y == currNomNom.y){
	console.log('hit!');
	currNomNom.x = parseInt(Math.random() * squares);
	currNomNom.y = parseInt(Math.random() * squares);
	points ++;
	addSegment();
    }

    var tmpSeg = tail;
    while(!tmpSeg.isHead){
	if(tmpSeg.x == head.x && tmpSeg.y == head.y && tmpSeg != head && !tmpSeg.nextSegment.isHead){
	    console.log('bad shit man!');// works
	    alive = false;
	}
	tmpSeg = tmpSeg.nextSegment;
    }

    if(head.x >= squares || head.x < 0 || head.y >= squares || head.y < 0){
	console.log('out of bounds');// Works
	alive = false;
    }
    
}

function drawSegments(){
    var tmpSeg = tail;
    while(!tmpSeg.isHead){
	if(alive){
	    ctx.fillStyle = aliveColor;
	}else{
	    ctx.fillStyle = deathColor;
	}
	ctx.fillRect(tmpSeg.x * dimensions,  tmpSeg.y * dimensions, dimensions, dimensions);
	tmpSeg = tmpSeg.nextSegment;
    }
}

function drawNomNom(){
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(currNomNom.x * dimensions, currNomNom.y * dimensions, dimensions, dimensions);
}

function addSegment(){
    var newTail = new segment(tail.x, tail.y);
    newTail.nextSegment = tail;
    tail = newTail;
    snek.push(newTail);
//    console.log('Segments now ' + snek.length);
}

function moveSegments(){
    var tmpSeg = tail;
    while(!tmpSeg.isHead){
	tmpSeg.x = tmpSeg.nextSegment.x;
	tmpSeg.y = tmpSeg.nextSegment.y;
	tmpSeg = tmpSeg.nextSegment;
    }
}

function move(){
    var dirChange = false;
    if(upArrow){
	if(head.direction != down){
	    head.up();
	    head.direction = up;
	    upArrow = false;
	    dirChange = true;
	}
    }else if(downArrow){
	if(head.direction != up){
	    head.down();
	    head.direction = down;
	    downArrow = false;
	    dirChange = true;
	}
    }else if(leftArrow){
	if(head.direction != right){
	    head.left();
	    head.direction = left;
	    leftArrow = false;
	    dirChange = true;
	}
    }else if(rightArrow){
	if(head.direction != left){
	    head.right();
	    head.direction = right;
	    rightArrow = false;
	    dirChange = true;
	}
    }

    head.move(dirChange);
    
}

function drawSnek(){
    if(alive){
	ctx.fillStyle = aliveColor;
    }else{
	ctx.fillStyle = deathColor;
    }
    ctx.fillRect(head.x * dimensions,  head.y * dimensions, dimensions, dimensions);
}

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
