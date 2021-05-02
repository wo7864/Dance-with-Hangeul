let currentAnimation = null;
function initCanvas(){
    const canvas = document.querySelector('#c')
    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center"
    ctx.textBaseline = 'middle';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function setButtonEvent(animationList){
    const buttons = document.querySelectorAll('.canvas-select-menu > button');
    
    buttons.forEach((button,idx) => {
        button.addEventListener('click', () => {
            if(currentAnimation) currentAnimation.reset();
            animationList[idx].init();
            animationList[idx].start();
            currentAnimation = animationList[idx];
        })
    })

}

window.onload = () => {
    initCanvas();
    const animationList = [
        new Canvas__Koong(), 
        new Canvas__kkk(),
        new Canvas__Banjjag(),
    ]

    setButtonEvent(animationList)
}