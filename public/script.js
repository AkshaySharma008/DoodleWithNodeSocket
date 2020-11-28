//initialized socket and get context of canvas
var socket = io();
var canvas = document.querySelector(".whiteboard")
var context = canvas.getContext("2d")

//configuration
var isDrawing = false;
var current = {
    color:"black"
}


//remove extra data
function trottle(callback , delay){
    var previousCall = new Date().getTime();
    return function(){
        var time = new Date().getTime();
        if(time - previousCall >= delay){
            previousCall = time;
            callback.apply(null ,arguments);
        }
    }

}

function drawLine(x0,y0,x1,y1 , color , emit){
    context.beginPath();
    context.moveTo(x0,y0);
    context.lineTo(x1,y1);
    context.strokeStyle = color;
    context.lineWidth = 2
    context.stroke();
    context.closePath();

    if(!emit)return;

    var w = canvas.width;
    var h = canvas.height;

    socket.emit("drawing" , {
        x0 : x0/w,
        y0 : y0/h,
        x1 : x1/w,
        y1 : y1/h,
        color
    })
}


//handlers --mouse/touch events (up/out/down/move) (start/ end or cancel /move)

function onMouseDown(e){
    isDrawing = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
}

function onMouseUp(e){
    if(!isDrawing) return;
    isDrawing = false;
    drawLine(current.x ,
        current.y ,
        e.clientX || e.touches[0].clientX , 
        e.clientY || e.touches[0].clientY , 
        current.color , 
        true
         );

}

function onMouseMove(e){
    if(!isDrawing) return;
    drawLine(current.x ,
         current.y ,
         e.clientX || e.touches[0].clientX , 
         e.clientY || e.touches[0].clientY , 
         current.color , 
         true
          );

    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
    
}

