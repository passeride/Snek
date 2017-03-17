function Segment(x, y){
    this.x = x; // X position of segment
    this.y = y; // Y Position of segment
    this.isHead = false; // if true this is head, and first in the chain
    this.direction = RIGHT; // The head's direction, and the direction it will move if no other commands are given

    // This is to make sure the direction is not changed two times per cycle
    this.nextDirection = this.direction;


    this.prevSegment; // This is a singly linked list, and this is the previous segment


    // Truning functions
    this.left = function(){
	      this.x -= 1;
    };

    this.right = function(){
	      this.x += 1;
    };

    this.up = function(){
	      this.y -= 1;
    };

    this.down = function(){
	      this.y += 1;
    };

    this.drawScale = 0.8;

    /*
      This will used the context sendt from gamemanager to player, to draw the snek segment
    */
    this.draw = function(ctx, color, alive){
	      ctx.fillRect(this.x * dimensions + (dimensions - dimensions * this.drawScale)/2, this.y * dimensions + (dimensions - dimensions * this.drawScale)/2, dimensions * this.drawScale, dimensions * this.drawScale);
    };

    /*
      This will move in this this.direction's direction if no other orders are given
    */
    this.move = function(){
        this.direction = this.nextDirection;// Set's the next direction to the direction
	      if(this.isHead){
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
	      }else{
	          // Here we start from the tail and sett the position equals the next segment
	          this.x = this.prevSegment.x;
	          this.y = this.prevSegment.y;
	      }
    };

    // Set new position function
    this.setNewPosition = function(x, y){
	      this.x = x;
	      this.y = y;
    };
};
