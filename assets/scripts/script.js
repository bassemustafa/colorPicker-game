// Initializing variables
var numCircles = 9;
var colors = [];
var pickedColor;

// Selecting elements
var circles = document.querySelectorAll(".circles");
var level = document.querySelectorAll(".level");
var gameColor = document.querySelector("h1 span");
var panelMessage = document.querySelector(".message");
var header = document.querySelector("h1");
var play = document.querySelector(".play")

game();
play.addEventListener("click", reset);

// The main function of the game
function game(){
    setLevel();
    setColors();
    reset();
}

// Function to determine the level of the game
function setLevel(){
    // Loop through the levels
    for(var i = 0; i < level.length; i++){
        level[i].addEventListener("click", function(){
            // Make sure that no level highlighted
            level[0].classList.remove("selected");
            level[1].classList.remove("selected");
            level[2].classList.remove("selected");
            // Highlight the selected level
            this.classList.add("selected");
            // Determine the number of circles depends on the selected level
            if(this.textContent === "Easy") {numCircles = 3;}
            else if(this.textContent === "Medium") {numCircles = 6;}
            else{ numCircles = 9;}
            // Create the game
            reset();
        })
    }
}

// Function for assigning colors to the circles
function setColors(){
    // Loop through the circles
    for(var i = 0; i < circles.length; i++){
        // Assign each color to one circle
        circles[i].style.backgroundColor = colors[i];
        // Player choosing process
        circles[i].addEventListener("click", function(){
            // Determine the color was clicked
            var clickedColor = this.style.backgroundColor;
            // Click on the correct color
            if(clickedColor === pickedColor){
                // Tell the player the answer
                panelMessage.textContent = "Correct";
                // Change the circles and header to the correct color
                changeColors(clickedColor);
                // Give the player the chance to play again
                play.textContent = "Play Again";
            }
            // Click on a wrong color
            else{
                // Fade out the wrong choice
                this.style.backgroundColor = "#232323";
                // Tell the player to try again
                panelMessage.textContent = "Try Again";
            }
        });
    }
}

// Function to change the circles and header to the correct color
function changeColors(color){
    // Loop through circles
    for(var i = 0; i < circles.length; i++){
        // Change the circle color to the correct one
        circles[i].style.backgroundColor = color;
    }
    // Change the header color to the correct one
    header.style.backgroundColor = color;
}

// Choose the game color randomly from the color array
function  pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Create a random RGB color
function randomColor(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Generate an array of random RGB colors
function generateColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

// The core function of the game process
function reset(){
    // Generate color array
    colors = generateColors(numCircles);
    // Choose the game color from the array
    pickedColor = pickColor();
    // Show the game color RGB form to the player
    gameColor.textContent = pickedColor;
    // Give the player the chance to change the colors
    this.textContent = "New Colors";
    // Remove the panel message
    panelMessage.textContent = "" ;
    // Give the header the default color
    header.style.backgroundColor = "steelblue";
    // Loop through circles
    for(var i = 0; i < circles.length; i++){
        // if there's a color generated assign it to the circle and show it
        if(colors[i]){
            circles[i].style.backgroundColor = colors[i];
            circles[i].style.display = "block";
        }
        // if there's no color generated hide the circle
        else{
            circles[i].style.display = "none";
        }
    }
}