function Player(playerId, startX, startY){
    // This will be the id of the player to make them easy to separate
    this.id = playerId;

    // This will be the current position, set at start position on init
    this.x = startX;
    this.y = startY;

    // This will be an array of segments, a singel link chain is also used
    this.snek = [];

    // This is the head, used to give commands on movement, by setting direction
    this.head;

    // This is the tail, used to iterate over the singel link list
    this.tail;

    // Start sequense
    head = new Segment(this.x, this.y);
    head.isHead = true;// Making sure segment know's it's head
    head.direction = UP; //Setting start direction

    snek.push(head);// Adding it to array
    tail = head; // The last segment added will allways be tail, now we have one segment total, so head is tail. 

    
    /// Turning directions
    this.up = function(){
	head.up
    }
    
}
