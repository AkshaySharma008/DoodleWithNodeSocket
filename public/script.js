//initialized socket and get context of canvas
var socket = io();
var canvas = document.querySelector(".whiteboard")
var context = canvas.getContext("2d")

//configuration
var isDrawing = false;
var current = {
    color:"black"
}


function drawLine(x0,y0,x1,y1 , color , emit){
    context.beginPath();
    context.moveTo(x0,y0);
    context.lineTo(x1,y1);
    context.strokeStyle = color;
    context.lineWidth = 2
    context.stroke();
    context.closePath();
}


//handlers --mouse/touch events (up/out/down/move) (start/ end or cancel /move)

function mouseDown(e){
    isDrawing = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
}

function mouseUp(e){
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

function mouseMove(e){
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