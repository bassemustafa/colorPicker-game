var numSquares = 9;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var level = document.querySelectorAll(".level");
var gameColor = document.querySelector("h1 span");
var panelMessage = document.querySelector(".message");
var header = document.querySelector("h1");
var play = document.querySelector(".play")

game();

play.addEventListener("click", reset);

function game(){
    setLevel();
    setColors();
    reset();
}

function setLevel(){
    for(var i = 0; i < level.length; i++){
        level[i].addEventListener("click", function(){
            level[0].classList.remove("selected");
            level[1].classList.remove("selected");
            level[2].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy") {numSquares = 3;}
            else if(this.textContent === "Medium") {numSquares = 6;}
            else{ numSquares = 9;}
            reset();
        })
    }
}

function setColors(){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                panelMessage.textContent = "Correct";
                changeColors(clickedColor);
                play.textContent = "Play Again";
            }
            else{
                this.style.backgroundColor = "#232323";
                panelMessage.textContent = "Try Again";
            }
        });
    }
}

function changeColors(color){
    for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
    }
    header.style.backgroundColor = color;
}

function  pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function randomColor(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function generateColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function reset(){
    colors = generateColors(numSquares);
    pickedColor = pickColor();
    gameColor.textContent = pickedColor;
    this.textContent = "New Colors";
    panelMessage.textContent = "" ;
    header.style.backgroundColor = "steelblue";
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
        else{
            squares[i].style.display = "none";
        }
    }
}