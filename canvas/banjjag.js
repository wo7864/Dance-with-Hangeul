class Canvas_Banjjag extends HangulCanvas {

    constructor(props){
        super(props);
        this.HangulClass = Banjjag;
        this.maxCooltime = 10;
        this.maxObjectCount = 2;
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
            text: '반짝',
            fontSize: Math.random() < 0.8 ? getRandomInt(30, 40) : getRandomInt(80, 90),
            fontFamily: 'Nanum Myeongjo',
            opacity: 0,
            x: getRandomInt(500, window.innerWidth - 400),
            y: getRandomInt(200, window.innerHeight-200),
            x_acc: getRandomInt(10, 30) / -20,
            life: 400,
            finLife: 30,
            isFadeIn: true,
            isDetect: true,
            crush_acc: 1.5,
            rotate: getRandomInt(-20, 20),
            isBlur: Math.random() > 0.2 ? true : false
        }
    }



}

