
window.onload = () => {

    const canvas = document.querySelector('#c')
    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center"
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const objs = [];

    ctx.globalAlpha = 1
    ctx.fillStyle = "#000";

    let removeList
    let cooltime = 0;
    const step = () => {
        requestAnimationFrame((timestamp) => {
             if(cooltime <= 0){
                 if(objs.length<12){
                    const acc = 10
                    const groupId = timestamp
                    const params = {
                        ctx: ctx,
                        groupId:groupId,
                        text: 'ㅋ',
                        fontSize: getRandomInt(150, 160),
                        fontFamily: 'Nanum Myeongjo',
                        opacity: 1,
                        color: '#fff',
                        x: getRandomInt(100, window.innerWidth),
                        y: getRandomInt(100, window.innerHeight),
                        life: 180,
                        isGravity: false,
                        isFadeIn: true,
                        isDetect: true,
                        isVibe: true,
                        isWall:false,
                        isRotateDie: true,
                        x_acc: acc,
                        y_acc: -acc,
                        crush_acc:10,
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
                    const k1 = new Hangul(params)
                    const k2 = new Hangul(params2)
                    const k3 = new Hangul(params3)
                    objs.push(k1)
                    objs.push(k2)
                    objs.push(k3)
                     cooltime = getRandomInt(30, 60);
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
                    console.log(k.groupId != koong.groupId)

                    if (k.isDetect && k.groupId != koong.groupId) detect(koong, k)
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