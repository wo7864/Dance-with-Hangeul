function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  
function detect(obj1, obj2) {
    const x = obj1.x - obj2.x
    const y = obj1.y - obj2.y
    const distance = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))*1.2
    if (distance < (obj1.size / 2) + (obj2.size / 2)) {
        const radian = Math.atan2(y, x);
        obj1.horizontal_acc = Math.sin(radian + Math.PI/2)*30
        obj1.acc = Math.cos(radian - Math.PI/2)*20
    }
}
