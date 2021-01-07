class Ball{
    constructor(x, y, r){
        var options = {
            restitution : 1.0
        }

        this.body = Bodies.circle(x, y, r/2, options);

        this.r = r;

        World.add(world, this.body);

        this.image = loadImage("images/ball.png");
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.r*2, this.r*2);
        pop();
        }


}