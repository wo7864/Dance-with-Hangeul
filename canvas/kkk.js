class Canvas__kkk extends HangulCanvas{

    init(){
        super.init();
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = "#fff";
    }

    start() {
        const objs = [];
        let removeList
        let cooltime = 0;
        const colors = ["#ffc107", "#80bdff", "#ff9800"]
        const step = (timestamp) => {

            if (cooltime <= 0) {
                if (objs.length < 12) {
                    const acc = 10
                    const groupId = timestamp
                    const params = {
                        ctx: this.ctx,
                        groupId: groupId,
                        text: 'ㅋ',
                        fontSize: getRandomInt(150, 160),
                        fontFamily: 'Nanum Myeongjo',
                        opacity: 1,
                        color: colors[getRandomInt(0, 3)],
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
                    const k1 = new kkk(params)
                    const k2 = new kkk(params2)
                    const k3 = new kkk(params3)
                    objs.push(k1)
                    objs.push(k2)
                    objs.push(k3)
                    cooltime = getRandomInt(30, 60);
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

                    if (k.isDetect && k.groupId != koong.groupId) detect(koong, k)
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
