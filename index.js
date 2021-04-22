
window.onload = () => {

    const canvas = document.querySelector('#c')
    const ctx = canvas.getContext('2d');
    ctx.textAlign="center"
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const objs = [];
    const count = 1;

    let i;
    for (i = 0; i < count; i++) {

    }


    let removeList
    let cooltime = 0;
    const step = () => {
        requestAnimationFrame(() => {
             if(cooltime <= 0){
                 if(objs.length<5){
                     objs.push(new Koong(ctx))
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

                objs.forEach(k => {
                    if(k===koong) return;
                    k.detect(koong.padding.left, koong.padding.top)
                    k.detect(koong.padding.left, koong.padding.bottom)
                    k.detect(koong.padding.right, koong.padding.top)
                    k.detect(koong.padding.right, koong.padding.bottom)

                })
                koong.gravity();
                koong.horizontalMove();
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
    //     koong = new Koong(ctx, e.clientX, e.clientY)
    //     koong.draw()
    //     objs.push(koong)
    // })

    document.addEventListener('mousemove', (e) => {
        objs.forEach(koong => {
            koong.detect(e.clientX, e.clientY)
        })
    })
}