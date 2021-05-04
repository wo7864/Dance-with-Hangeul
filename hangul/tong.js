
class Tong extends Hangul {

    constructor(props) {
        super(props);

        this.text = '통'
        this.acc_value =1
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
            this.y_acc += this.acc_value;
            this.y += this.y_acc;
            if (this.y + sizeGap >= bottom) {
                this.y = bottom - sizeGap
                this.y_acc = this.y_acc * (-3 / 4)
            }

        }
    }




    move() {
        if (this.x_acc > 0) {
            this.x_acc -= this.acc_value / 5;
            if (this.x_acc < 1) this.x_acc = 0
            this.x += this.x_acc;

            if (this.x + (this.fontSize / 2) > window.innerWidth) {
                this.x = window.innerWidth - (this.fontSize / 2);
                this.x_acc *= (-3 / 4)
            }
        } else if (this.x_acc < 0) {
            this.x_acc += this.acc_value / 5;
            if (this.x_acc > -1) this.x_acc = 0
            this.x += this.x_acc;
            if (this.x < this.fontSize / 2) {
                this.x = this.fontSize / 2;
                this.x_acc *= (-3 / 4)
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

    detect(obj) {
        const x = this.x - obj.x
        const y = this.y - obj.y
        const distance = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 1.2
        if (distance < (this.fontSize / 2) + (obj.fontSize / 2)) {
            const radian = Math.atan2(y, x);
            this.x_acc = Math.sin(radian + Math.PI / 2) * this.crush_acc
            this.y_acc = Math.cos(radian - Math.PI / 2) * this.crush_acc
            obj.x_acc = Math.sin(radian + Math.PI / 2) * -obj.crush_acc
            obj.y_acc = Math.cos(radian - Math.PI / 2) * -obj.crush_acc
        }
    }




}

