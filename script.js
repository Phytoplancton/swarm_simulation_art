

var canvas = document.body.appendChild(document.createElement("canvas"));
var ctx = canvas.getContext("2d");

canvasColor = 'rgba(30, 30, 30, 0)'
document.body.style.backgroundColor = canvasColor;
canvas.style.position = "relative";
canvas.style.background = canvasColor
canvas.style.border = `1px solid `;
canvas.style.zIndex = -1;
document.body.style.margin = '10 px'
canvasWidth = window.innerWidth - 20
canvasHeight = window.innerHeight - 30

function resize(){
    canvas.width = canvasWidth
    canvas.height = canvasHeight
}
resize()
window.addEventListener('resize',resize()) 

function mod(n, m) {
    return ((n % m) + m) % m;
}


var mousePosX = 0
var mousePosY = 0
var isChaseMouse = false

window.addEventListener('mousemove', function(e){
    mousePosX = parseInt(e.clientX);
    mousePosY = parseInt(e.clientY);
    isChaseMouse = true;
    setTimeout(()=>{
        isChaseMouse = false;
    }, 2000)
})
window.addEventListener('touchmove', function(e){
    var touch = e.touches[0] || e.changedTouches[0];
    x = touch.pageX;
    y = touch.pageY;
    mousePosX = parseInt(touch.pageX);
    mousePosY = parseInt(touch.pageY);
    isChaseMouse = true;
})
window.addEventListener('touchend', ()=>{
    isChaseMouse = false;
})

var scale = 1
var howManyBirds = 300

// stable
var movementSpeed = 6*scale
var repulsionSpeed = 0.2*scale
var repulsionPot = 1*scale
var alignmentSpeed = 0.5*scale
var attracionSpeed = 0.01*scale
var avoidMouseSpeed = 25*scale
var attractionZone = 300*scale
var alignmentZone = attractionZone*0.5
var repulsionZone = attractionZone*0.1
var mouserepulsionzone = attractionZone * 0.1
var viewAngle = 2.5
var one = true


// bird character
function Bird(startAngle, x, y){
    this.randomVal = Math.random()
    this.distanceToOtherBird
    this.angleToOther
    this.coords = [x,y]
    this.movementDirection = startAngle
    this.angeleDiff
    this.changeAngle = function(){
        this.sumDeltaX = 0
        this.sumDeltaY = 0
        birdloop:
        for (j = 0; j<birds.length; j++){
            this.deltaX = birds[j].coords[0]-this.coords[0]
            this.deltaY = birds[j].coords[1]-this.coords[1]
            // this.deltaX = (Math.abs(birds[j].coords[0]-this.coords[0])+canvasWidth/2)%canvasWidth-canvasWidth/2
            // this.deltaY = (Math.abs(birds[j].coords[1]-this.coords[1])+canvasHeight/2)%canvasHeight-canvasHeight/2

            
            this.distanceToOtherBird = ((this.deltaX)**2 + (this.deltaY)**2)**0.5
            


            if (this.distanceToOtherBird == 0){continue birdloop}
            if (this.distanceToOtherBird > attractionZone){continue birdloop}

            this.angleToOther = mod(Math.atan2(this.deltaY, this.deltaX),Math.PI*2)
            this.angeleDiff = mod(this.movementDirection - this.angleToOther,Math.PI*2) - Math.PI
            if (Math.abs(this.angeleDiff)>viewAngle){continue birdloop}
            //attraction

            this.sumDeltaX += this.deltaX
            this.sumDeltaY += this.deltaY

            //alignment
            if (this.distanceToOtherBird > alignmentZone){continue birdloop}
                this.viewAngleDiff = this.movementDirection - birds[j].movementDirection
                if (Math.abs(this.viewAngleDiff)>Math.PI){
                    this.viewAngleDiff -= Math.sign(this.viewAngleDiff)*Math.PI
                }
                this.movementDirection -= this.viewAngleDiff/this.distanceToOtherBird*alignmentSpeed    

            //repulsion
                if (this.distanceToOtherBird > repulsionZone){continue birdloop}
                if (this.angeleDiff>0 ){
                    this.movementDirection -= repulsionSpeed/this.distanceToOtherBird**repulsionPot
                } 
                else {
                    this.movementDirection += repulsionSpeed/this.distanceToOtherBird**repulsionPot
                } 

        }
        // attraction
            this.angleToOther = mod(Math.atan2(this.sumDeltaY, this.sumDeltaY),Math.PI*2)
            this.angeleDiff = mod(this.movementDirection - this.angleToOther,Math.PI*2) - Math.PI
            if (this.angeleDiff>0 ){
                this.movementDirection += attracionSpeed
            } 
            else {
                this.movementDirection -= attracionSpeed
            }


        //avoid the mouse
        if (isChaseMouse){
            this.deltaX = mousePosX-this.coords[0]
            this.deltaY = mousePosY-this.coords[1]
            this.distanceToOtherBird = ((this.deltaX)**2 + (this.deltaY)**2)**0.5
            if (this.distanceToOtherBird < attractionZone){
                this.angleToOther = mod(Math.atan2(this.deltaY, this.deltaX),Math.PI*2)
                this.angeleDiff = mod(this.movementDirection - this.angleToOther,Math.PI*2) - Math.PI
                if (Math.abs(this.angeleDiff)<viewAngle){
                    if (this.angeleDiff>0 ){
                        this.movementDirection -= 
                        avoidMouseSpeed/this.distanceToOtherBird
                    } 
                    else {
                        this.movementDirection += 
                        avoidMouseSpeed/this.distanceToOtherBird
                    } 
                }
            }
        }
        


        this.movementDirection %= Math.PI*2
    }
    this.moveForward = function(){
        this.coords[0] += Math.cos(this.movementDirection)*movementSpeed
        this.coords[1] += Math.sin(this.movementDirection)*movementSpeed
        this.coords[0] = mod(this.coords[0], window.innerWidth)
        this.coords[1] = mod(this.coords[1], window.innerHeight)
    }
    this.drawBird = function(){
        ctx.save()
        ctx.translate(this.coords[0],this.coords[1])
        ctx.rotate(this.movementDirection)
        ctx.fillStyle = this.birdColor
        ctx.fillRect( -this.birdLength/2, -this.birdWidth/2,this.birdLength,this.birdWidth);
        ctx.restore()
    }
}

//create bird characters
birds = []

for (var i = 0; i < howManyBirds; i++ ){
    birds.push(new Bird(
        Math.random()*2*Math.PI, 
        Math.random()*window.innerWidth*0.9+window.innerWidth*0.05, 
        Math.random()*window.innerHeight*0.9+window.innerHeight*0.05
        ))
}

// animate function
let clearCanvasFillstyle;
function animate(){
    // ctx.clearRect(0,0,window.innerWidth, window.innerHeight)

    ctx.fillStyle = clearCanvasFillstyle
    ctx.fillRect(0,0,window.innerWidth, window.innerHeight)

    for (var i = 0; i<birds.length; i++){
        birds[i].drawBird()
    }

    for (var j = 0; j<birds.length; j++){
        birds[j].changeAngle()
        birds[j].moveForward()
    }
    requestAnimationFrame(animate)
}

animate()
