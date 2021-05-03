class Canvas_Warr extends HangulCanvas {

    constructor(props) {
        super(props);
        this.HangulClass = Warr;
        this.maxObjectCount =100;

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
        const acc = 5
        const groupId = new Date();
        const superParams = super.getParams();
        const x = getRandomInt(400, window.innerWidth - 500)
        //const x = 700
        const fontSize = 100
        const params = {
            ...superParams,
            groupId: groupId,
            text: '와',
            fontSize: fontSize,
            fontFamily: 'Nanum Myeongjo',
            opacity: 1,
            x: x,
            y: 0,
            life: 10000,
            x_acc: 0,
            y_acc: acc,
            crush_acc: 10,
            rotate: getRandomInt(-20, 20),
        }
        const params2 = {
            ...params,
            text: '르',
            x: x + fontSize,
            x_acc: 0,
            y_acc: acc,
            rotate: getRandomInt(-20, 20),
        }
        const params3 = {
            ...params,
            text: '르',
            x: x + (fontSize * 2),
            x_acc: 0,
            y_acc: acc,
            rotate: getRandomInt(-20, 20),
        }
        return [params, params2, params3]
    }

    detectObjects() {
        let i, j;
        let hap;
        const length = this.objects.length;
        for (i = length-1; i > 0; i--) {
            if (!this.objects[i].isStop) {
                hap = 0;
                for (j = i-1; j >= 0; j--) {
                    hap += this.objects[i].detect(this.objects[j])
                    if (hap > this.objects[i].fontSize) {
                        this.objects[i].stop();
                    }
                }
            }


        }
    }

}
