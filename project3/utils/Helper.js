// Async promise to wait for certain amount
const wait = (duration) => new Promise(function (resolve, reject) {
	setTimeout(resolve, duration);
})

// Lerp from start to end using the specified amount
function lerp(start, end, amt){
    return start * (1-amt) + amt * end;
}

// Keep the value within the min-max range
function clamp(val, min, max){
    return val < min ? min : (val > max ? max : val);
}

// AABB collision detection - it compares PIXI.Rectangles
function rectsIntersect(a,b){
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

// Return a random direction vector
function getRandomUnitVector(){
    let x = getRandom(-1,1);
    let y = getRandom(-1,1);
    let length = Math.sqrt(x*x + y*y);
    if(length == 0){ // very unlikely
        x=1; // point right
        y=0;
        length = 1;
    } else{
        x /= length;
        y /= length;
    }

    return {x, y};
}

// Return a random between min and max
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
