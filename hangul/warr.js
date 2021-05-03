
class Warr extends Hangul {

    constructor(props) {
        super(props);
        this.acc_value = 0.5;
        this.isGravity= true;
        this.isStop = false;
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
        if(this.isGravity) this.gravity();
        this.move();

        this.ctx.save();
        ///this.drawPadding();
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotate * Math.PI / 180);

        this.ctx.fillText(this.text, 0, 0)
        this.ctx.restore();

        this.destory();
    }

    gravity() {
        const bottom = window.innerHeight
        if (bottom > this.y + this.fontSize / 2) {
            this.y_acc += this.acc_value;
            this.y += this.y_acc;
            
        }
        if (this.y + this.fontSize / 2 >= bottom) {
            this.y = bottom - this.fontSize / 2
            this.y_acc = 0
        }

    }



    move() {
        if (this.x_acc > 0) {
            this.x_acc -= this.acc_value / 2;
            if (this.x_acc < 1) this.x_acc = 0
            this.x += this.x_acc;

            if (this.x + (this.fontSize / 2) > window.innerWidth
                && this.isWall) {
                this.x = window.innerWidth - (this.fontSize / 2);
                this.x_acc *= (-1 / 2)
            }
        } else if (this.x_acc < 0) {
            this.x_acc += this.acc_value / 2;
            if (this.x_acc > -1) this.x_acc = 0
            this.x += this.x_acc;
            if (this.x < this.fontSize / 2 && this.isWall) {
                this.x = this.fontSize / 2;
                this.x_acc *= (-1 / 2)
            }
        }

        if (this.y_acc > 0) {
        this.y_acc -= this.acc_value / 2;
            if (this.y_acc < 1) this.y_acc = 0
            this.y += this.y_acc;

            if (this.y + (this.fontSize / 2) > window.innerHeight
            && this.isWall) {
                this.y = window.innerHeight - (this.fontSize / 2);
                this.y_acc *= (-1 / 2)
            }
        } else if (this.y_acc < 0) {
            this.y_acc += this.acc_value / 2;
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
                //this.rotateDie();

            } else if (this.life > this.maxLife) {
                this.life = -1;
            }
        }
    }


    detect(obj) {
        
        const x = this.x - obj.x
        const y = this.y - obj.y
        const padding_size =0.95
        const distance = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * padding_size
        if (distance < (this.fontSize / 2) + (obj.fontSize / 2) // 거리가 두 오브젝트의 반지름의 합보다 작고,
            // 이 오브젝트가 기존 오브젝트보다 위에 있을 때
        ) { 
            if( this.y < obj.y){
                this.y_acc = 3
                if(this.x >obj.x){
                    this.x_acc = 3

                }else{
                    this.x_acc = -5
                }
                this.rotate+=2;
                return obj.y- this.y
            }
            else{
                //console.log(this.y, obj.y)
                const radian = Math.atan2(y, x);
                const x_vec = Math.sin(radian + Math.PI / 2)
                const y_vec = Math.cos(radian - Math.PI / 2)

                return 0;
            }
           
            //obj.x_acc = Math.sin(radian + Math.PI / 2) * obj.crush_acc
            //obj.y_acc = Math.cos(radian - Math.PI / 2) * -obj.crush_acc
        }
        return 0;
    }
    stop(){
        this.x_acc = 0;
        this.y_acc = 0;
        this.isGravity = false;
        this.isStop = true;
    }
    crush(x_vec, y_vec){
        //this.x_acc = x_vec * 5;
        this.y_acc = 0;
        this.isGravity = false;
    }



    
}

