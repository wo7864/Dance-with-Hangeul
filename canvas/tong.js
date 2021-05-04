
class Canvas_Tong extends HangulCanvas {

    init() {
        super.init();
        this.HangulClass = Tong;
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = "#fff";
    }

    start() {
        const step = () => {
            this.createObject();
            this.detectObjects();
            this.removeObject();
            this.drawBackground();
            this.drawObject();

            this.animation = requestAnimationFrame(step);
        }
        this.animation = requestAnimationFrame(step);
    }



    getParams(){


        const params = super.getParams();
        return {
            ...params,
            ctx: this.ctx,
            text: '통',
            fontSize: getRandomInt(MIN_FONT_SIZE, MAX_FONT_SIZE),
            fontFamily: 'Nanum Myeongjo',
            color: '#fff',
            x: getRandomInt(this.fontSize / 2, window.innerWidth - this.fontSize / 2),
            y: 0,
            y_acc:10,
            crush_acc:40,
            life: 300,
        }
    }

}


