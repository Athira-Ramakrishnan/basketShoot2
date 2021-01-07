class Basket{
    constructor(x, y, r){
        var options = {
            friction : 0.3, 
            isStatic : true
        }

        this.body = Bodies.circle(x, y, r, options);

        this.r = r;
        
        World.add(world, this.body);
        this.image = loadImage("images/net.png");
        this.flag = true
    }

    display(speed){
        var pos = this.body.position;
        var angle = this.body.angle;
        if(pos.y > 1 && this.flag){
            pos.y = pos.y + speed;
            if(pos.y > displayHeight-100){
                this.flag = false
            }
        }else if(! this.flag){
            pos.y = pos.y - speed;
            if(pos.y<15){
                this.flag = true
            }
        }

        //console.log(this.body.speed);


        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER );
        image(this.image, 0, 0, 100, 100);
        pop();
    }
}