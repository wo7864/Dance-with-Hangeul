class HangulCanvas {

    /*
        선택 인풋 항목
        - 배경색상
        - 글자 색상 ( 단색, 또는 배열 가능)
        - 최대 글자 개수
        - 글자 생성 주기
    */
    constructor(props={}) {
        this.backgroundColor = props.backgroundColor ? props.backgroundColor : '#000';
        this.color = props.color ? props.color : '#fff';

        this.objects = [];
        this.maxObjectCount = props.objectCount ? props.objectCount : 10;
        this.maxCooltime = props.cooltime ? props.cooltime : 60;
        this.cooltime = 0;
    }

    init() {
        this.canvas = document.querySelector('#c')
        this.ctx = this.canvas.getContext('2d');
        this.ctx.save();
    }

    stop() {
        cancelAnimationFrame(this.animation)
    }
    reset() {
        this.ctx.restore();
    }

    getColor() {
        if (Array.isArray(this.color)) {
            const index = getRandomInt(0, this.color.length)
            return this.color(index);
        } else {
            return this.color;
        }
    }
    getParams(){
        return {
            ctx: this.ctx,
            text: 'ㅇ',
            fontSize: 10,
            fontFamily: 'Nanum Myeongjo',
            color: this.getColor(),
            x: 100,
            y: 100,
            x_acc: 0,
            life: 300,
            finLife: 60,
            crush_acc: 1,
        }
    }

    createObject(){
        this.cooltime +=1;
        if(this.cooltime < this.maxCooltime) return;
        if(this.objects.length >= 10) return;
        this.objects.push(new this.HangulClass(this.getParams()))
        this.cooltime = 0;
    }

    createObjects(){
        this.cooltime +=1;
        if(this.cooltime < this.maxCooltime) return;
        if(this.objects.length >= 10) return;
        const params = this.getParams()
        params.forEach(param => {
            this.objects.push(new this.HangulClass(param))
        })
        this.cooltime = 0;
    }

    drawBackground() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    detectObjects() {
        let i = 0, j = 0;
        const length = this.objects.length;
        while (i < length - 1) {

            this.objects[i].detect(this.objects[j])

            j += 1;
            if (j >= length) {
                j = i + 1;
                i = i + 1;
            }
        }

    }

    drawObject() {
        this.objects.forEach((obj) => {
            obj.draw();
        })
    }
    removeObject(){
        this.objects = this.objects.filter(obj => obj.life !== -1)
    }

}
