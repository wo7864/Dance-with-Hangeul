class HangulCanvas {

    init(){
        this.canvas = document.querySelector('#c')
        this.ctx = this.canvas.getContext('2d');
        this.ctx.save();
    }

    stop() {
        cancelAnimationFrame(this.animation)
    }
    reset(){
        this.ctx.restore();
    }

}
