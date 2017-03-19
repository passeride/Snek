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

    this.teleport = false; // Used if moved by checkposition, so the move function does not move it 2 on one round

    this.snek = [];

    // Start sequense
    this.head = new Segment(this.x, this.y);
    this.snek.push(this.head);
    this.head.isHead = true;// Making sure segment know's it's head
    this.head.direction = DOWN; //Setting start direction

    this.speed = 0.01;
    this.blocks = 0;

    this.tail = this.head; // The last segment added will allways be tail, now we have one segment total, so head is tail.

    /*
      This function will get the context from GameMangaer and draw the snek with all it's segments
    */
    this.draw = function(ctx){
        for(i = 0; i < this.snek.length; i++){
            this.snek[i].draw(ctx, this.colod, this.alive);
        }
        if(this.alive){
            ctx.fillStyle = this.color;
        }else{
           ctx.fillStyle = this.deathColor;
        }
        // Drawing head
        ctx.fillRect(this.head.x * dimensions, this.head.y * dimensions, dimensions, dimensions);
    };


    /*
      Checking if self colliding or if snek is eating the a nom nom, also checking if out of bounds
    */
    this.checkPosition = function(){
        if(this.alive){
            // Checking if head is on top of nom nom and blocks
            for(var i = 0; i < Noms.length; i++){
                if(this.head.x == Noms[i].x && this.head.y == Noms[i].y){
                    console.log('eating nom nom');
                    this.score ++;
                    this.addSegment(Noms[i].color, Noms[i].colorId);
                    // Noms[i].relocate();
                    createNewNom(i);
                };
            }

            for(i = 0; i < Blocks.length; i++){
                if(this.head.x == Blocks[i].x && this.head.y == Blocks[i].y){
                    this.alive = false;
                }
            }

            // Check if self collision
            var tmpSeg = this.tail;
            // while(tmpSeg && !tmpSeg.ishead){
            for(i = 0; i < this.snek.length; i++){
                tmpSeg = this.snek[i];
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
                        if(tmpSeg.prevSegment.isHead)
                            Player2.looseSnek();
                        else
                            Player2.spliceSnek(tmpSeg);
                    }
                    tmpSeg = tmpSeg.prevSegment;
                }
            }else if(this == Player2){
                tmpSeg = Player1.tail;
                while(tmpSeg){
                    if(tmpSeg.x == this.head.x && tmpSeg.y == this.head.y){
                        if(tmpSeg.prevSegment.isHead)
                            Player1.looseSnek();
                        else
                            Player1.spliceSnek(tmpSeg);
                        // console.log('death');
                        // this.alive = false;
                    }
                    tmpSeg = tmpSeg.prevSegment;
                }
            }
            // Check if hit's wall, and if to die or loop around
            if(wallLoop){
                if(this.head.x >= squares){
                    this.head.x = 0;
                    this.teleport = true;
                }else if(this.head.x < 0){
                    this.head.x = squares - 1;
                    this.teleport = true;
                }else if(this.head.y >= squares){
                    this.head.y = 0;
                    this.teleport = true;
                }else if(this.head.y < 0){
                    this.head.y = squares - 1;
                    this.teleport = true;
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
      this will make you loose the entire snek
    */
    this.looseSnek = function(){
        // this.spliceSnek(this.head.nextSegment);
        this.snek = [];
        this.snek.push(this.head);
        this.tail = this.head;
    };

    /*
      this will remove all segments after this and mabye turn them to blocks
      */
    this.spliceSnek = function(seg){
        var poss = this.snek.indexOf(seg);
        this.snek[poss].nextSegment = null;
        this.tail = this.snek[poss];
        poss ++;
        for(i = poss; i >  0; i--){
            console.log(i);
            console.log(this.snek);
            console.log(this.snek[i]);
            if(LostSegTurnToBlock){
                createBlock(this.snek[i].x, this.snek[i].y);
            }
            this.removeSegment(this.snek[i]);
        }
    };
    /*
      This will create a static block beneath the tail
      */
    this.dropBlock = function(){
        if(this.tail.isBlock){
            if(this.head != this.tail)
                createBlock(this.tail.x, this.tail.y);
            else
                createBlock(this.head.preX, this.head.preY);
            this.block --;
            if(this.tail.blocksPrSegment <= 1)
                this.removeSegment(this.tail);
            else
                this.tail.blocksPrSegment --;
        }else{
            // cannot drop
        }
    };
    /*
      When snek goes over nom nom, one segment is added and made the new tail
    */
    this.addSegment = function(color, colorId){
        var newSeg = new Segment(this.head.preX, this.head.preY, color, colorId);
        this.snek.push(newSeg);
        if(this.tail == this.head){// First segment
            this.head.nextSegment = newSeg;
            this.tail = newSeg;
            newSeg.prevSegment = this.head;
        }else{
            this.head.nextSegment.prevSegment = newSeg;
            newSeg.nextSegment = this.head.nextSegment;
            newSeg.prevSegment = this.head;
            this.head.nextSegment = newSeg;
        }
        this.checkPattern();
    };

    this.checkPattern = function(){
        var cId = Colors[0];
        var numbers = 0;
        var segments = [];
        for(i = 0; i < this.snek.length; i++){
            if(this.snek[i].color == cId){
                numbers ++;
                segments.push(this.snek[i]);
                if(numbers >= 3){
                    // This will remove the three segments
                    this.removeSegment(segments[0]);
                    this.removeSegment(segments[1]);
                    this.removeSegment(this.head.nextSegment);
                    this.addFollowBlock();
                }
            }else{
                segments = [];
                cId = this.snek[i].color;
                numbers = 1;
            }
        }
    };

/*
This will be used to remove segments from the snek
  */
    this.removeSegment = function(seg){
        if(seg == this.tail){
            seg.prevSegment.nextSegment = null;
            this.tail = seg.prevSegment;
            this.snek.splice(this.snek.indexOf(seg), 1);
        }else{
            console.log(this.snek);
            console.log(seg);
                seg.prevSegment.nextSegment = seg.nextSegment;
            if(seg.nextSegment)
                seg.nextSegment.prevSegment = seg.prevSegment;
                this.snek.splice(this.snek.indexOf(seg), 1);
        }
    };

    this.addFollowBlock = function(){
        var newSeg = new Segment(this.tail.x, this.tail.y, '#000000', -1);
        newSeg.isBlock = true;
        this.snek.push(newSeg);
        this.tail.nextSegment = newSeg;
        newSeg.prevSegment = this.tail;
        this.tail = newSeg;
    };
    /*
      This is called during GameManager.Update and wil prcess input and move snek
    */
    this.move = function(){
        if(this.alive && !this.teleport){// When ded, snek no move
            // if(tmpSeg.nextSegment)
                // tmpSeg.nextSegment.move();
            for(i = 0; i < this.snek.length; i++){
                this.snek[i].move();
            }
            // Move segments
            // tmpSeg = this.head;
            // while(tmpSeg != null && this.tail != tmpSeg.nextSegment){
                // tmpSeg.move();
                // tmpSeg = tmpSeg.nextSegment;
            // }
        }else{
            this.teleport = false;
        }
    };

    /// Turning irections
    // Also checking so cannto turn 180
    this.up = function(){
        if(this.head.direction != DOWN)
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
