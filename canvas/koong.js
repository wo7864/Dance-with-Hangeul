
window.onload = () => {

    const canvas = document.querySelector('#c')
    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center"
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const objs = [];



    let removeList
    let cooltime = 0;
    const step = () => {
        requestAnimationFrame(() => {
             if(cooltime <= 0){
                 if(objs.length<5){

                    const params = {
                        ctx:ctx,
                        text:'ㅋ',
                        fontSize:getRandomInt(MIN_FONT_SIZE, MAX_FONT_SIZE),
                        fontFamily:'Nanum Myeongjo',
                        color:'#fff',
                        x:getRandomInt(this.fontSize/2, window.innerWidth - this.fontSize/2),
                        y:0,
                        life:300,
                    }

                     objs.push(new Hangul(params))
                     cooltime = getRandomInt(30, 120);
                 }
             }else{
                 cooltime -=1;
             }

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            removeList = [];
            objs.forEach((koong, index) => {
                if (koong.life === -1) removeList.push(index);

                objs.forEach((k, idx) => {
                    if (k === koong) return;
                    detect(koong, k)
                })
                
                if(koong.isGravity) koong.gravity();
                koong.move();
                koong.draw();
                koong.destory();
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
    //     const params = {
    //         ctx: ctx,
    //         text: 'ㅋ',
    //         fontSize: getRandomInt(MIN_FONT_SIZE, MAX_FONT_SIZE),
    //         fontFamily: 'Nanum Myeongjo',
    //         color: '#fff',
    //         x: getRandomInt(this.fontSize / 2, window.innerWidth - this.fontSize / 2),
    //         y: 0,
    //         life: 300,
    //         isGravity:false,
    //     }

    //     koong = new Hangul(params)
    //     koong.draw()
    //     objs.push(koong)
    // })

    document.addEventListener('mousemove', (e) => {
        objs.forEach(koong => {
            //koong.detect(e.clientX, e.clientY)
        })
    })
}