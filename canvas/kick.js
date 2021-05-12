class Canvas_Kick extends HangulCanvas {

    constructor(props) {
        super(props);
        this.HangulClass = Kick;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
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
        const paramsArray = [];
        const params = {
            ...superParams,
            groupId: groupId,
            text: 'ㅋ',
            fontSize: getRandomInt(80, 130),
            fontFamily: 'Nanum Myeongjo',
            opacity: 1,
            x: getRandomInt(this.width *0.2, this.width *0.7),
            y: getRandomInt(this.height *0.3, this.height *0.8),
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
            rotate: getRandomInt(-30, 30),
        }
        const params2 = {
            ...params,
            x_acc: 0,
            y_acc: -acc * 1.3,
            fontSize: getRandomInt(80, 130),
            rotate: getRandomInt(-30, 30),
        }
        const params3 = {
            ...params,
            x_acc: -acc,
            y_acc: -acc,
            fontSize: getRandomInt(80, 130),
            rotate: getRandomInt(-30, 30),
        }
        paramsArray.push(params)
        if(Math.random() > 0.5)
            paramsArray.push(params2)
        paramsArray.push(params3)
        return paramsArray
    }


}
