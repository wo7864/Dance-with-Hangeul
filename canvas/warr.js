class Canvas_Warr extends HangulCanvas {

    constructor(props) {
        super(props);
        this.HangulClass = Warr;
        this.maxObjectCount = 35;
        this.maxCooltime = 120;

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
        const lineCount = 7
        const hangulCount = 7
        const paramsArray = [];
        const fontSize = 100
        const x = (window.innerWidth/2) - ((fontSize-10)*(hangulCount-1)/2)
        const superParams = super.getParams();
        const params = {
            ...superParams,
            groupId: groupId,
            fontSize: fontSize,
            fontFamily: 'Nanum Myeongjo',
            opacity: 1,
            x: x,
            y: 0,
            life: 800,
            x_acc: 0,
            y_acc: 20,
            crush_acc: 10,
            isGravity: false,
        }
        let i, j, finLife;
        for (j = 0; j < lineCount; j++) {
            for (i = 0; i < hangulCount; i++) {
                if(j<2){
                    finLife = 500 - (100 * j )- getRandomInt(0, 100)
                }else{
                    finLife = 300
                }
                paramsArray.push({
                    ...params,
                    text: Math.random() < 0.33 ? '와' : '르',
                    x: x + (fontSize-10) * i,
                    y: 0-(fontSize-10)*j,
                    line:j,
                    finLife:finLife,
                    rotate:getRandomInt(-20, 20),
                    rotate_acc:getRandomInt(-4, 4)
                })
            }

        }

        return paramsArray
    }

    detectObjects() {
        let i, j;
        let hap;
        const length = this.objects.length;
        for (i = length - 1; i > 0; i--) {
            if (!this.objects[i].isStop) {
                hap = 0;
                for (j = i - 1; j >= 0; j--) {
                    hap += this.objects[i].detect(this.objects[j])
                    if (hap > this.objects[i].fontSize) {
                        this.objects[i].stop();
                    }
                }
            }


        }
    }

}
