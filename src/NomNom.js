function NomNom(x, y){
    this.x = x;
    this.y = y;
    this.type = 1;

    this.draw = function(ctx){

	      ctx.fillStyle = '#00FF00';// TODO: Change this to read from json
	      ctx.fillRect(this.x * dimensions, this.y * dimensions, dimensions, dimensions);
    };

    this.relocate = function(){
        var onBlock = true;
        while(onBlock){
            onBlock = false;
	          this.x = parseInt(Math.random() * squares);
	          this.y = parseInt(Math.random() * squares);
            for(i = 0; i < Blocks.length; i++){
                if(this.x == Blocks[i].x && this.y == Blocks[i].y){
                    onBlock = true;
                }
            }
        }
    };
}
