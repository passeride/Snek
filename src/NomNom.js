function NomNom(x, y){
    this.x = x;
    this.y = y;
    this.type = 1;

    this.draw = function(ctx){

	      ctx.fillStyle = '#00FF00';// TODO: Change this to read from json
	      ctx.fillRect(this.x * dimensions, this.y * dimensions, dimensions, dimensions);
    };

    this.relocate = function(){
	      this.x = parseInt(Math.random() * squares);
	      this.y = parseInt(Math.random() * squares);
    };
}
