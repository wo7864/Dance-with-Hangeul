
class Canvas__Koong extends HangulCanvas {

    init() {
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
                if (objs.length < 5) {

                    const params = {
                        ctx: this.ctx,
                        text: 'ㅋ',
                        fontSize: getRandomInt(MIN_FONT_SIZE, MAX_FONT_SIZE),
                        fontFamily: 'Nanum Myeongjo',
                        color: '#fff',
                        x: getRandomInt(this.fontSize / 2, window.innerWidth - this.fontSize / 2),
                        y: 0,
                        y_acc:10,
                        crush_acc:30,
                        life: 300,
                    }

                    objs.push(new Koong(params))
                    cooltime = getRandomInt(30, 60);
                }
            } else {
                cooltime -= 1;
            }

            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.ctx.fillStyle = "#000";
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            removeList = [];
            objs.forEach((koong, index) => {
                if (koong.life === -1) removeList.push(index);

                objs.forEach((k, idx) => {
                    if (k === koong) return;
                    k.detect(koong, k)
                })

                if (koong.isGravity) koong.gravity();
                koong.move();
                koong.draw();
                koong.destory();
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


