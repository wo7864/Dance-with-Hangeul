class Canvas_Banjjag extends HangulCanvas {

    constructor(props){
        super(props);
        this.HangulClass = Banjjag;
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
            fontSize: Math.random() < 0.8 ? getRandomInt(10, 50) : getRandomInt(80, 150),
            fontFamily: 'Nanum Myeongjo',
            opacity: 0,
            x: getRandomInt(200, window.innerWidth - 200),
            y: getRandomInt(100, window.innerHeight),
            x_acc: getRandomInt(10, 50) / -50,
            life: 300,
            finLife: 60,
            isFadeIn: true,
            isDetect: true,
            crush_acc: 1.5,
            rotate: getRandomInt(-20, 20),
            isBlur: Math.random() > 0.3 ? true : false
        }
    }



}

