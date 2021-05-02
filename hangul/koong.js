
class Koong extends Hangul {

    constructor(props) {
        super(props);

        this.text = '쿵'
    }


    draw() {
        this.gravity();
        this.move();

        this.ctx.save();


        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`
        this.ctx.translate(this.x, this.y);
        this.ctx.fillText(this.text, 0, 0)

        this.ctx.restore();
        this.destory();
    }

    gravity() {
        const bottom = window.innerHeight
        const sizeGap = (this.fontSize/2)
        if (bottom > this.y + sizeGap || this.y_acc < -1) {
            this.y_acc += ACC_VALUE;
            this.y += this.y_acc;
            if (this.y + sizeGap >= bottom) {
                this.y = bottom - sizeGap
                this.y_acc = this.y_acc * (-1 / 2)
            }

        }
    }




    move() {
        if (this.x_acc > 0) {
            this.x_acc -= ACC_VALUE / 2;
            if (this.x_acc < 1) this.x_acc = 0
            this.x += this.x_acc;

            if (this.x + (this.fontSize / 2) > window.innerWidth) {
                this.x = window.innerWidth - (this.fontSize / 2);
                this.x_acc *= (-1 / 2)
            }
        } else if (this.x_acc < 0) {
            this.x_acc += ACC_VALUE / 2;
            if (this.x_acc > -1) this.x_acc = 0
            this.x += this.x_acc;
            if (this.x < this.fontSize / 2) {
                this.x = this.fontSize / 2;
                this.x_acc *= (-1 / 2)
            }
        }

    }




    destory() {
        if (this.life >= 0) {
            this.life -= 1;
            if (this.life < 60 && this.life >= 0) {
                this.scaleOut();

            } else if (this.life > this.maxLife) {
                this.life = -1;
            }
        }
    }

    scaleOut() {
        this.fontSize = this.fontSize * (this.life / 60)
    }

    detect(obj1, obj2) {
        const x = obj1.x - obj2.x
        const y = obj1.y - obj2.y
        const distance = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 1.2
        if (distance < (obj1.fontSize / 2) + (obj2.fontSize / 2)) {
            const radian = Math.atan2(y, x);
            obj1.x_acc = Math.sin(radian + Math.PI / 2) * obj1.crush_acc
            obj1.y_acc = Math.cos(radian - Math.PI / 2) * obj1.crush_acc
        }
    }




}

