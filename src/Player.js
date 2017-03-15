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
    this.deathColor = '#000000'; // This will be displayed when player is dead

    this.alive = true; // If this is false, no movement will occur. Snek iz dead

    this.score = 0; // Score of this player


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
        if(this.alive){
            ctx.fillStyle = this.color;
        }else{
            ctx.fillStyle = this.deathColor;
        }
	      while(tmpSeg != undefined && !tmpSeg.isHead){ // Every segment but not head
	          tmpSeg.draw(ctx, this.color, this.alive);
	          tmpSeg = tmpSeg.prevSegment;
	      }

	      // Drawing head
	      ctx.fillRect(this.head.x * dimensions, this.head.y * dimensions, dimensions, dimensions);
    };


    /*
      Checking if self colliding or if snek is eating the a nom nom, also checking if out of bounds
    */
    this.checkPosition = function(){
	      if(this.alive){
	          // Checking if head is on top of nom nom
	          for(var i = 0; i < Noms.length; i++){
		            if(this.head.x == Noms[i].x && this.head.y == Noms[i].y){
		                console.log('eating nom nom');
		                this.score ++;
		                this.addSegment();
		                Noms[i].relocate();
		            }
	          }
            // Check if self collision
            var tmpSeg = this.tail;
            while(tmpSeg && !tmpSeg.ishead){
                if(tmpSeg.x == this.head.x && tmpSeg.y == this.head.y && tmpSeg.prevSegment && !tmpSeg.prevSegment.isHead && tmpSeg.prevSegment.prevSegment && !tmpSeg.prevSegment.prevSegment.isHead){
                    console.log('death');
                    this.alive = false;
                }
                tmpSeg = tmpSeg.prevSegment;
            }

            // Check if collision with other player
            if(this == Player1){
                tmpSeg = Player2.tail;
                while(tmpSeg){
                    if(tmpSeg.x == this.head.x && tmpSeg.y == this.head.y && tmpSeg.prevSegment){
                        console.log('death');
                        this.alive = false;
                    }
                    tmpSeg = tmpSeg.prevSegment;
                }
            }else if(this == Player2){
                tmpSeg = Player1.tail;
                while(tmpSeg){
                    if(tmpSeg.x == this.head.x && tmpSeg.y == this.head.y){
                        console.log('death');
                        this.alive = false;
                    }
                    tmpSeg = tmpSeg.prevSegment;
                }
            }

            // Check if hit's wall, and if to die or loop around
	          if(wallLoop){
		            if(this.head.x >= squares){
		                this.head.x = 0;
		            }else if(this.head.x < 0){
		                this.head.x = squares;
		            }else if(this.head.y >= squares){
		                this.head.y = 0;
		            }else if(this.head.y < 0){
		                this.head.y = squares;
		            }
	          }else{
		            // Checking if colliding with wall
		            if(this.head.x >= squares || this.head.x < 0 || this.head.y >= squares || this.head.y < 0){
		                console.log('out of bounds');
		                this.alive = false;
		            }
	          }
	      }
    };



    /*
      When snek goes over nom nom, one segment is added and made the new tail
    */
    this.addSegment = function(){
	      var newTail = new Segment(this.tail.x, this.tail.y);
	      newTail.prevSegment = this.tail;
	      this.tail = newTail;
    };

    /*
      This is called during GameManager.Update and wil prcess input and move snek
    */
    this.move = function(){
	      if(this.alive){// When ded, snek no move
	          var tmpSeg = this.head;// Moves Head
	          tmpSeg.move();
	          // Move segments
	          tmpSeg = this.tail;
	          while(tmpSeg != null && !tmpSeg.isHead){
		            tmpSeg.move();
		            tmpSeg = tmpSeg.prevSegment;
	          }
	      }
    };

    /// Turning directions
    // Also checking so cannto turn 180
    this.up = function(){
	      if(this.head.directions != DOWN)
	          this.head.nextDirection = UP;
    };

    this.down = function(){
	      if(this.head.direction != UP)
	          this.head.nextDirection = DOWN;
    };

    this.left = function(){
	      if(this.head.direction != RIGHT)
	          this.head.nextDirection = LEFT;
    };

    this.right = function(){
	      if(this.head.direction != LEFT)
	          this.head.nextDirection = RIGHT;
    };
};
