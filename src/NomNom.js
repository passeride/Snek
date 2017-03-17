function NomNom(x, y, color, colorId){
    this.x = x;
    this.y = y;
    this.type = 1;
    this.color = color;
    this.colorId = colorId;

    this.draw = function(ctx){

	      ctx.fillStyle = this.color;// TODO: Change this to read from json
	      ctx.fillRect(this.x * dimensions, this.y * dimensions, dimensions, dimensions);
    };

    this.relocate = function(color, colorId){
        var onBlock = true;
        this.color = color;
        this.colorId = colorId;
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
