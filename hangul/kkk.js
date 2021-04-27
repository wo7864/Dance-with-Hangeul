
class kkk extends Hangul {
    ctx;
    size;
    padding;
    x;
    y;
    y_acc;
    x_acc;
    life;
    constructor(props) {
        super(props);
        
        this.text = 'ㅋ'
       
    }

    init() {
        this.paddingVisiable = false

        this.fontSize = this.fontSize ? this.fontSize : getRandomInt(MIN_FONT_SIZE, MAX_FONT_SIZE);
        this.x = this.x ? this.x : getRandomInt(this.fontSize / 2, window.innerWidth - this.fontSize / 2);
        this.y = this.y ? this.y : 0;
        this.y_acc = this.y_acc ? this.y_acc : getRandomInt(5, 15);
        this.x_acc = this.x_acc ? this.x_acc : 0;
        this.life = this.life ? this.life : 300;
    }

    draw() {
        if (this.isGravity) this.gravity();
        if (this.isVibe) this.vibe();
        this.move();

        this.ctx.save();

        if (this.paddingVisiable) {
            this.ctx.fillStyle = "#666";
            this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, this.fontSize / 2, 0, Math.PI * 2)
            this.ctx.fill();
        }

        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotate * Math.PI / 180);

        if (this.isFadeIn) this.fadeIn();


        this.ctx.fillText(this.text, 0, 0)
        this.ctx.restore();

        this.destory();
    }

    gravity() {
        if (BOTTOM > this.y + this.fontSize / (2) || this.y_acc < -1) {
            this.y_acc += ACC_VALUE;
            this.y += this.y_acc;

            if (this.y + this.fontSize / (2) >= BOTTOM) {
                this.y = BOTTOM - this.fontSize / (2)
                this.y_acc = this.y_acc * (-1 / 2)
            }

        }
    }



    move() {
        if (this.x_acc > 0) {
            this.x_acc -= ACC_VALUE / 2;
            if (this.x_acc < 1) this.x_acc = 0
            this.x += this.x_acc;

            if (this.x + (this.fontSize / 2) > window.innerWidth
                && this.isWall) {
                this.x = window.innerWidth - (this.fontSize / 2);
                this.x_acc *= (-1 / 2)
            }
        } else if (this.x_acc < 0) {
            this.x_acc += ACC_VALUE / 2;
            if (this.x_acc > -1) this.x_acc = 0
            this.x += this.x_acc;
            if (this.x < this.fontSize / 2 && this.isWall) {
                this.x = this.fontSize / 2;
                this.x_acc *= (-1 / 2)
            }
        }

        if (this.y_acc > 0) {
            this.y_acc -= ACC_VALUE / 2;
            if (this.y_acc < 1) this.y_acc = 0
            this.y += this.y_acc;

            if (this.y + (this.fontSize / 2) > window.innerHeight
            && this.isWall) {
                this.y = window.innerHeight - (this.fontSize / 2);
                this.y_acc *= (-1 / 2)
            }
        } else if (this.y_acc < 0) {
            this.y_acc += ACC_VALUE / 2;
            if (this.y_acc > -1) this.y_acc = 0
            this.y += this.y_acc;
            if (this.y < this.fontSize / 2 && this.isWall) {
                this.y = this.fontSize / 2;
                this.y_acc *= (-1 / 2)
            }
        }
    }




    destory() {
        if (this.life >= 0) {
            this.life -= 1;
            if (this.life < 60 && this.life >= 0) {
                this.rotateDie();

            } else if (this.life > this.maxLife) {
                this.life = -1;
            }
        }
    }

    vibe() {
        if (this.vibeLevel === undefined) this.vibeLevel = 0
        if (this.vibeLevel === 0) {
            this.y -= 5
            this.vibeLevel += 1
        }
        else if(this.vibeLevel === 5){
            this.y += 5
            this.vibeLevel += 1
        }else if(this.vibeLevel === 10){
            this.vibeLevel = 0
        }else{
            this.vibeLevel += 1
        }

        if(this.life<90){
            this.isVibe=false;
        }
    }

    scaleOut(){
        this.fontSize = this.fontSize * 0.8
        this.y -= this.fontSize * 0.2
    }
    
    rotateDie(){
        this.rotate += 2;
        this.y_acc+=2;

    }

    fadeIn() {
        const opacity = (this.maxLife - this.life) / 30;
        if (opacity > 1) this.isFadeIn = false;
        this.ctx.globalAlpha = opacity
    }

    die(){
        if(this.life>60){
            this.life =60
            this.isVibe = false;
        }
    }


}


function detect(obj1, obj2) {
    const x = obj1.x - obj2.x
    const y = obj1.y - obj2.y
    const distance = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 1.2
    if (distance < (obj1.fontSize / 2) + (obj2.fontSize / 2)) {
        const radian = Math.atan2(y, x);
        obj1.x_acc = Math.sin(radian + Math.PI / 2) * obj1.crush_acc
        obj1.y_acc = Math.cos(radian - Math.PI / 2) * obj1.crush_acc
        obj1.die();
        obj2.die();
    }
}
