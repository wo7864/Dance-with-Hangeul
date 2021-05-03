class Canvas__kkk extends HangulCanvas {

    constructor(props) {
        super(props);
        this.HangulClass = Kkk;

    }
    init() {
        super.init();
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = "#fff";
    }

    start() {

        //const colors = ["#ffc107", "#80bdff", "#ff9800"]
        const step = (timestamp) => {


            this.createObjects();
            this.detectObjects();
            this.removeObject();
            this.drawBackground();
            this.drawObject();
            this.animation = requestAnimationFrame(step);

        }
        this.animation = requestAnimationFrame(step);
    }
    getParams() {
        const acc = 10
        const groupId = new Date();
        const superParams = super.getParams();
        const params = {
            ...superParams,
            groupId: groupId,
            text: 'ㅋ',
            fontSize: getRandomInt(150, 160),
            fontFamily: 'Nanum Myeongjo',
            opacity: 1,
            x: getRandomInt(200, window.innerWidth - 200),
            y: getRandomInt(300, window.innerHeight),
            life: 180,
            isGravity: false,
            isFadeIn: true,
            isDetect: true,
            isVibe: true,
            isWall: false,
            isRotateDie: true,
            x_acc: acc,
            y_acc: -acc,
            crush_acc: 10,
            rotate: getRandomInt(-20, 20),
        }
        const params2 = {
            ...params,
            x_acc: 0,
            y_acc: -acc * 1.3,
            rotate: getRandomInt(-20, 20),
        }
        const params3 = {
            ...params,
            x_acc: -acc,
            y_acc: -acc,
            rotate: getRandomInt(-20, 20),
        }
        return [params, params2, params3]
    }


}
