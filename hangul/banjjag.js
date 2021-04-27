class Banjjag extends Hangul {

    constructor(props){
        super(props);
        this.isBlur = props.isBlur
        this.blur = 20
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
        if(this.isBlur) this.ctx.filter = `blur(${this.blur}px)`;
        this.ctx.fillText(this.text, 0, 0)

        this.ctx.restore();

        this.sparkle();
        this.destory();
    }
    
    move() {
        this.x += this.x_acc;  
        if (this.y_acc > 0) {
            this.y_acc -= 0.1;
            if (this.y_acc < 0.1) this.y_acc = 0
            this.y += this.y_acc;

            if (this.y + (this.fontSize / 2) > window.innerHeight
                && this.isWall) {
                this.y = window.innerHeight - (this.fontSize / 2);
                this.y_acc *= (-1 / 2)
            }
        } else if (this.y_acc < 0) {
            this.y_acc += 0.1;
            if (this.y_acc > -0.1) this.y_acc = 0
            this.y += this.y_acc;
            if (this.y < this.fontSize / 2 && this.isWall) {
                this.y = this.fontSize / 2;
                this.y_acc *= (-1 / 2)
            }
        }  
    }


    destory() {
        super.destory(() => {
            this.opacity = this.life / 60;
        })
    }

    sparkle(){
        if(this.life % 130 < 2){
            this.blur = 0;
        }else{
            this.blur = 15
        }
    }
    
    detect(obj) {
        const x = this.x - obj.x
        const y = this.y - obj.y
        const padding_size = 0.7
        const distance = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * padding_size
        if (distance < (this.fontSize / 2) + (obj.fontSize / 2)) {
            const radian = Math.atan2(y, x);
            this.y_acc = Math.cos(radian - Math.PI / 2) * this.crush_acc
        }
    }
    
}