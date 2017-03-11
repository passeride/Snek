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
