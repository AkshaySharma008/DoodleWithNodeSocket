//initialized socket and get context of canvas
var socket = io();
var canvas = document.querySelector(".whiteboard")
var context = canvas.getContext("2d")

//configuration
var isDrawing = false;
var current = {
    color:"black"
}