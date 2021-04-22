const FONT = 'Nanum Myeongjo'
const BOTTOM = window.innerHeight - 45;
const MAX_FONT_SIZE = 500;
const MIN_FONT_SIZE = 150;
const ACC_VALUE = 1;
const MAX_LIFE = 300;

class Koong {
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
        this.padding = {
            value: this.size * 0.1,
            left: 0,
            right: 0,
            horizontalCenter: 0,
            top: 0,
            bottom: 0,
            verticalCenter: 0,
            visiable:false  // padding 디버깅
        }

        this.x = this.x ? this.x : getRandomInt(0, window.innerWidth - this.size);
        this.y = this.y ? this.y : 0;
        this.acc = getRandomInt(5, 15);
        this.horizontal_acc = 0;
        this.life = 0;
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = 'center';
        this.ctx.font = `${this.size}px ${FONT}`
        const y = this.y + ((MAX_FONT_SIZE - this.size) * 0.1) // canvas filltext size별로 높이 다른 부분 수정 계수
        this.ctx.fillText('쿵', this.x, y)
        this.padding.left = this.x + this.padding.value;
        this.padding.right = this.padding.left + this.size - (this.padding.value * 2);
        this.padding.horizontalCenter = (this.padding.left + this.padding.right) / 2;
        this.padding.top = y - this.size + this.padding.value;
        this.padding.bottom = this.padding.top + this.size - this.padding.value;
        this.padding.verticalCenter = (this.padding.top + this.padding.bottom) / 2;

        if(this.padding.visiable)
        this.ctx.fillRect(this.padding.left, this.padding.top, this.padding.right - this.padding.left, this.padding.bottom - this.padding.top)
    }

    gravity() {
        if (BOTTOM > this.y || this.acc < -1) {
            this.acc += ACC_VALUE;
            this.y += this.acc;

            if (this.y >= BOTTOM) {
                this.y = BOTTOM
                this.acc = this.acc * (-1 / 2)
            }

        }
    }



    horizontalMove() {
        if (this.horizontal_acc > 0) {
            this.horizontal_acc -= ACC_VALUE/2;
            this.x += this.horizontal_acc;
            if (this.x + (this.size/2) > window.innerWidth) {
                this.x = window.innerWidth - (this.size/2);
                this.horizontal_acc *= (-1 / 2)
            }
        } else if (this.horizontal_acc < 0) {
            this.horizontal_acc += ACC_VALUE/2;
            this.x += this.horizontal_acc;
            if (this.x < this.size/2) {
                this.x = this.size/2;
                this.horizontal_acc *= (-1 / 2)
            }
        }
    }

    detect(x, y) {

        if (this.padding.left < x &&
            x < this.padding.right &&
            this.padding.top < y &&
            y < this.padding.bottom) {


            if (this.padding.left < x &&
                x < this.padding.horizontalCenter) {
                this.horizontal_acc = 20;
            } else if (this.padding.horizontalCenter < x &&
                x < this.padding.right) {
                this.horizontal_acc = -20;

            }

            if (this.padding.top < y &&
                y < this.padding.verticalCenter) {

            } else if (this.padding.verticalCenter < y &&
                y < this.padding.bottom) {
                this.acc = -10;

            }

        }

        return false;
    }

    destory() {
        if (this.life >= 0) {
            this.life += 1;
            if (this.life > MAX_LIFE * 0.9 && this.life < MAX_LIFE) {
                this.size = this.size * 0.8
                this.y -= this.size *0.2
            }else if(this.life > MAX_LIFE){
                this.life = -1;
            }
        }
    }

}