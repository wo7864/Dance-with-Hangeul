
window.onload = () => {

    const canvas = document.querySelector('#c')
    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center"
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const objs = [];

    ctx.globalAlpha = 1
    //ctx.fillStyle = "#000";
    ctx.fillStyle = "#000";
    let removeList
    let cooltime = 0;

    /**** color Params *****/
    const colorSet = [
        ["#ffffff", '#aaaaaa'],
        ["#ffc107", "#80bdff", "#ff9800"],
    ]
    const colorIndex =1


    const step = () => {
        requestAnimationFrame((timestamp) => {
             if(cooltime <= 0){
                 if(objs.length<20){
                    const params = {
                        ctx: ctx,
                        text: '반짝',
                        fontSize: Math.random() < 0.8 ? getRandomInt(10, 50) : getRandomInt(80, 150),
                        fontFamily: 'Nanum Myeongjo',
                        opacity: 0,
                        color: colorSet[colorIndex][getRandomInt(0, colorSet[colorIndex].length)],
                        x: getRandomInt(200, window.innerWidth-200),
                        y: getRandomInt(100, window.innerHeight),
                        x_acc:getRandomInt(10,50)/-50,
                        life: 300,
                        finLife:60,
                        isFadeIn: true,
                        isDetect: true,
                        crush_acc:2,
                        rotate: getRandomInt(-20, 20),
                        isBlur:Math.random() > 0.3 ? true : false 
                    }

                    const k1 = new Banjjag(params)
                    objs.push(k1)
                     cooltime = getRandomInt(5, 20);
                 }
             }else{
                 cooltime -=1;
             }

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
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
            step();
        })
    }
    step();


    // document.addEventListener('click', (e) => {
    //     const acc = 10
    //     const params = {
    //         ctx: ctx,
    //         text: 'ㅋ',
    //         fontSize: getRandomInt(150, 160),
    //         fontFamily: 'Nanum Myeongjo',
    //         opacity: 1,
    //         color: '#fff',
    //         x: e.clientX,
    //         y: e.clientY,
    //         life: 180,
    //         isGravity: false,
    //         isFadeIn: true,
    //         isDetect: false,
    //         isVibe: true,
    //         isWall:false,
    //         isRotateDie: true,
    //         x_acc: acc,
    //         y_acc: -acc,
    //         rotate: getRandomInt(-20, 20),
    //     }
    //     const params2 = {
    //         ...params,
    //         x_acc: 0,
    //         y_acc: -acc * 1.3,
    //         rotate: getRandomInt(-20, 20),
    //     }
    //     const params3 = {
    //         ...params,
    //         x_acc: -acc,
    //         y_acc: -acc,
    //         rotate: getRandomInt(-20, 20),
    //     }
    //     const k1 = new Hangul(params)
    //     const k2 = new Hangul(params2)
    //     const k3 = new Hangul(params3)
    //     objs.push(k1)
    //     objs.push(k2)
    //     objs.push(k3)
    // })

    document.addEventListener('mousemove', (e) => {
        objs.forEach(koong => {
            //koong.detect(e.clientX, e.clientY)
        })
    })
}