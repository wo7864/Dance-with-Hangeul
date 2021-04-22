
window.onload = () => {

    const canvas = document.querySelector('#c')
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const objs = [];
    const count = 1;

    let i, koong;
    for (i = 0; i < count; i++) {
        koong = new Koong(ctx)
        koong.draw()
        objs.push(koong)
    }


    let removeList
    const step = () => {
        requestAnimationFrame(() => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            removeList = [];
            objs.forEach((koong, index) => {
                if (koong.life === -1) removeList.push(index);

                objs.forEach(k => {
                    k.detect(koong.padding.left, koong.padding.top)
                    k.detect(koong.padding.right, koong.padding.bottom)
                })
                koong.gravity();
                koong.horizontalMove();
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


    document.addEventListener('click', (e) => {
        koong = new Koong(ctx, e.clientX, e.clientY)
        koong.draw()
        objs.push(koong)
    })

    document.addEventListener('mousemove', (e) => {
        objs.forEach(koong => {
            koong.detect(e.clientX, e.clientY)
        })
    })
}