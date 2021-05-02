const FONT = 'Nanum Myeongjo'
const MAX_FONT_SIZE = 500;
const MIN_FONT_SIZE = 150;
const ACC_VALUE = 1;
const MAX_LIFE = 300;

class Hangul {
    ctx;
    size;
    padding;
    x;
    y;
    y_acc;
    x_acc;
    life;
    constructor(props) {
        this.ctx = props.ctx;

        this.groupId = props.groupId

        this.text = props.text
        this.fontSize = props.fontSize
        this.fontFamily = props.fontFamily
        this.color = props.color
        this.opacity = props.opacity
        this.rotate = props.rotate

        this.x = props.x;
        this.y = props.y;
        this.x_acc = props.x_acc;
        this.y_acc = props.y_acc;
        this.crush_acc = props.crush_acc;
        this.maxLife = props.life;
        this.life = props.life;
        this.finLife = props.finLife

        /* Function 적용 여부 */
        this.isWall = props.isWall;
        this.isDetect = props.isDetect;
        this.isGravity = props.isGravity;
        this.isFadeIn = props.isFadeIn;
        this.isVibe = props.isVibe;
        this.isRotateDie = props.isRotateDie;
        this.init();

        //this.paddingVisiable = true;
    }

    init() {
        this.paddingVisiable = false

        this.fontSize = this.fontSize ? this.fontSize : getRandomInt(MIN_FONT_SIZE, MAX_FONT_SIZE);
        this.x = this.x ? this.x : getRandomInt(this.fontSize / 2, window.innerWidth - this.fontSize / 2);
        this.y = this.y ? this.y : 0;
        this.y_acc = this.y_acc ? this.y_acc : 0;
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

        this.ctx.globalAlpha = this.opacity;
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

    drawPadding() {
        this.ctx.save();
        this.ctx.fillStyle = "#666";
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.fontSize / 2, 0, Math.PI * 2)
        this.ctx.fill();
        this.ctx.restore();
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




    destory(addFunc) {
        if (this.life >= 0) {
            this.life -= 1;
            if (this.life < this.finLife && this.life >= 0) {
                addFunc();
            }
        }
    }


    scaleOut() {
        this.fontSize = this.fontSize / 60
        this.opacity = this.life / 60
    }


    fadeIn() {
        const opacity = (this.maxLife - this.life) / 30;
        if (opacity > 1) this.isFadeIn = false;
        this.opacity = opacity
    }

    die(life) {
        if (this.life > life) {
            this.life = life
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
