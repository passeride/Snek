function Segment(x, y){
    this.x = x; // X position of segment 
    this.y = y; // Y Position of segment
    this.isHead = false; // if true this is head, and first in the chain
    this.direction = RIGHT; // The head's direction, and the direction it will move if no other commands are given
    this.nextSegment; // Legacy, might not use. TODO: Check if this is needed
    this.prevSegment;// This is a singly linked list, and this is the previous segment

    
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
	this.y -= 1;
    }

    this.down = function(){
	this.y += 1;
    }


    /*
      This will used the context sendt from gamemanager to player, to draw the snek segment 
     */
    this.draw = function(ctx, color, alive){
	if(alive){
	    ctx.fillStyle = color;
	}
	console.log('drawing at ' + this.x + ':' + this.y);
	ctx.fillRect(this.x * dimensions, this.y * dimensions, dimensions, dimensions);
	
    }
    
    /*
      This will move in this this.direction's direction if no other orders are given
     */
    this.move = function(dirChanged){
	if(!dirChanged){
	    switch(this.direction){
	    case UP:
		this.up();
		break;
	    case DOWN:
		this.down();
		break;
	    case LEFT:
		this.left();
		break;
	    case RIGHT:
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
