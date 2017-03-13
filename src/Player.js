function Player(playerId, startX, startY){
    // This will be the id of the player to make them easy to separate
    this.id = playerId;

    // This will be the current position, set at start position on init
    this.x = startX;
    this.y = startY;

    // This is the head, used to give commands on movement, by setting direction
    var head;

    // This is the tail, used to iterate over the singel link list
    var tail;
    
    this.color = '#FF0000'; // This players color

    this.alive = true; // If this is false, no movement will occur. Snek iz dead


    

    // Start sequense
    this.head = new Segment(this.x, this.y);
    this.head.isHead = true;// Making sure segment know's it's head
    this.head.direction = DOWN; //Setting start direction


    this.tail = this.head; // The last segment added will allways be tail, now we have one segment total, so head is tail. 


    /*
      This function will get the context from GameMangaer and draw the snek with all it's segments 
     */
    this.draw = function(ctx){
	var tmpSeg = this.tail;
	while(!tmpSeg.isHead){ // Every segment but not head
	    tmpSeg.draw(ctx, this.color, this.alive);
	    tmpSeg = tmpSeg.prevSegment;
	}

	// Drawing head
	ctx.fillStyle = this.color;
	ctx.fillRect(this.head.x * dimensions, this.head.y * dimensions, dimensions, dimensions);
    };

    
    /*
      This is called during GameManager.Update and wil prcess input and move snek
     */
    this.move = function(){
	var tmpSeg = this.head;
	tmpSeg.move();
    };
    
    /// Turning directions
    // Also checking so cannto turn 180
    this.up = function(){
	if(this.head.directions != DOWN)
	    this.head.direction = UP;
    };

    this.down = function(){
	if(this.head.direction != UP)
	    this.head.direction = DOWN;
    };

    this.left = function(){
	if(this.head.direction != RIGHT)
	    this.head.direction = LEFT;
    };

    this.right = function(){
	if(this.head.direction != LEFT)
	    this.head.direction = RIGHT;
    };
}
