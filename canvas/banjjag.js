class Canvas__Banjjag extends HangulCanvas {


    start() {
        /**** color Params *****/
        const colorSet = [
            ["#ffffff", '#aaaaaa'],
            ["#ffc107", "#80bdff", "#ff9800"],
        ]
        const colorIndex = 1
        const objs = [];
        let removeList
        let cooltime = 0;
        const step = () => {
            if (cooltime <= 0) {
                if (objs.length < 10) {
                    const params = {
                        ctx: this.ctx,
                        text: '반짝',
                        fontSize: Math.random() < 0.8 ? getRandomInt(10, 50) : getRandomInt(80, 150),
                        fontFamily: 'Nanum Myeongjo',
                        opacity: 0,
                        color: colorSet[colorIndex][getRandomInt(0, colorSet[colorIndex].length)],
                        x: getRandomInt(200, window.innerWidth - 200),
                        y: getRandomInt(100, window.innerHeight),
                        x_acc: getRandomInt(10, 50) / -50,
                        life: 300,
                        finLife: 60,
                        isFadeIn: true,
                        isDetect: true,
                        crush_acc: 2,
                        rotate: getRandomInt(-20, 20),
                        isBlur: Math.random() > 0.3 ? true : false
                    }

                    const k1 = new Banjjag(params)
                    objs.push(k1)
                    cooltime = getRandomInt(5, 20);
                }
            } else {
                cooltime -= 1;
            }

            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            removeList = [];
            objs.forEach((koong, index) => {
                if (koong.life === -1) removeList.push(index);

                objs.forEach((k, idx) => {
                    if (k === koong) return;

                    if (k.isDetect) k.detect(koong, k)
                })


                koong.draw();
            })
            removeList = removeList.reverse()
            removeList.forEach(index => {
                objs.splice(index, 1);
            })
            this.animation = requestAnimationFrame(step);
        }
        this.animation = requestAnimationFrame(step);
    }



}

