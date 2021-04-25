const FONT = 'Nanum Myeongjo'
const BOTTOM = window.innerHeight - 45;
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
    acc;
    horizontal_acc;
    v
    life;
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.init();
    }

    init() {
        this.size = getRandomInt(MIN_FONT_SIZE, MAX_FONT_SIZE);
        this.paddingVisiable = false

        this.x = this.x ? this.x : getRandomInt(0, window.innerWidth - this.size);
        this.y = this.y ? this.y : 0;
        this.acc = getRandomInt(5, 15);
        this.horizontal_acc = 0;
        this.life = 0;
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${this.size}px ${FONT}`
        this.ctx.fillText('쿵', this.x, this.y)

        if (this.paddingVisiable) {
            this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
            this.ctx.fill();
        }
    }

    gravity() {
        if (BOTTOM > this.y + this.size / (2.5) || this.acc < -1) {
            this.acc += ACC_VALUE;
            this.y += this.acc;

            if (this.y + this.size / (2.5) >= BOTTOM) {
                this.y = BOTTOM - this.size / (2.5)
                this.acc = this.acc * (-1 / 2)
            }

        }
    }



    horizontalMove() {
        if (this.horizontal_acc > 0) {
            this.horizontal_acc -= ACC_VALUE / 2;
            this.x += this.horizontal_acc;
            if (this.x + (this.size / 2) > window.innerWidth) {
                this.x = window.innerWidth - (this.size / 2);
                this.horizontal_acc *= (-1 / 2)
            }
        } else if (this.horizontal_acc < 0) {
            this.horizontal_acc += ACC_VALUE / 2;
            this.x += this.horizontal_acc;
            if (this.x < this.size / 2) {
                this.x = this.size / 2;
                this.horizontal_acc *= (-1 / 2)
            }
        }
    }


    destory() {
        if (this.life >= 0) {
            this.life += 1;
            if (this.life > MAX_LIFE * 0.9 && this.life < MAX_LIFE) {
                this.size = this.size * 0.8
                this.y -= this.size * 0.2
            } else if (this.life > MAX_LIFE) {
                this.life = -1;
            }
        }
    }

}