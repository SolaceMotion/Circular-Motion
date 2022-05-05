const c = document.getElementsByTagName("canvas")[0]

const ctx = c.getContext('2d')

c.width = 600
c.height = 600

const center = 300

const {PI} = Math

let angle = 0
const RADIUS = 200

class Line {
    constructor(x1,x2,y1,y2) {
        this.x1 = x1
        this.x2 = x2
        this.y1 = y1
        this.y2 = y2
    }
    update() {
        this.endX = this.x1 + Math.cos(angle) * RADIUS
        this.endY = this.y1 + Math.sin(angle) * RADIUS
    }
    draw() {
        const pos = {
            sides() {
                const a = Math.abs(this.x1 - this.x2)
                const b = Math.abs(this.y1 - this.y2)
                
                return {a,b}
            }
        }
        
        const a = pos.sides().a
        const b = pos.sides().b
        
        let hyp = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
        ctx.beginPath()
        ctx.moveTo(this.x1,this.y1)
        ctx.lineTo(this.endX,this.endY)
        ctx.closePath()
    }

}


class Stone {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }
    update() {
        this.x = 300 +Math.cos(angle) * RADIUS
        this.y = 300 +Math.sin(angle) * RADIUS
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI)
        ctx.fill()
        ctx.closePath()
        this.that = this
    }
    get getCoordinates(){
        return {x: this.x,y: this.y}
    }
}
function loop() {
    setInterval(init, 1000/60)
}

class Path {
    constructor(x,y,r) {
        this.x = x
        this.y = y
        this.r = r
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI)
        ctx.stroke()
        ctx.closePath()        
    }
    
}

const stone = new Stone(500,300,RADIUS/10)
const line = new Line(300,500,300,300)
const path = new Path(300,300,RADIUS)
const speedSlide = document.getElementById("slider")
speedSlide.max = PI/20
speedSlide.min = -PI/20

let time = (2*Math.PI*RADIUS)/angle
speedSlide.step = .01
function init() {
    draw()
    angle += Number(speedSlide.value)
}

const btn = document.getElementById("btn")

let direction = Math.tan(angle) * RADIUS


btn.onclick = function() 
{
    console.log('loose on ' + stone.getCoordinates.x + " " + stone.getCoordinates.y) 
}

function draw() {
    
    ctx.clearRect(0,0,c.width,c.height)

    //vertical line
    ctx.beginPath()
    ctx.moveTo(stone.getCoordinates.x,stone.getCoordinates.y)
    ctx.lineTo(stone.getCoordinates.x ,stone.getCoordinates.y )
    ctx.stroke()
    ctx.closePath()

    stone.draw()
    stone.update()
    line.update()
    line.draw()
    path.draw()
    
}


loop()