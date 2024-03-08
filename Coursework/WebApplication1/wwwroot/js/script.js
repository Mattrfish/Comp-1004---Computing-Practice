document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const startButton = document.getElementById("startButton");
    const menu = document.getElementById("homePage");
    const playButton = document.getElementById("playButton");
    const lboardButton = document.getElementById("lboardButton"); 
    const lboard = document.getElementById("lboard"); 
    const exitButton = document.getElementById("exitButton"); 
    const lboardList = document.getElementById("lboardList"); 
    const playerNameInput = document.getElementById("playerNameInput"); 
    const saveButton = document.getElementById("saveButton"); 
    canvas.style.display = "none";
    lboard.style.display = "none";
    // Set canvas size
    canvas.width = window.innerWidth * 0.8 ; // Adjust as needed
    canvas.height = window.innerHeight * 0.8; // Adjust as needed

    

    // Ball properties
    const ball = {
        x: 50,
        y: 50,
        radius: 10,
        color: "white",
        velocityX: 0, // Initial velocity set to 0
        velocityY: 0
    };

    // Hole properties
    const hole = {
        x: canvas.width - 50,
        y: canvas.height - 50,
        radius: 15,
        color: "black"
    };

    const water = {
        x: 200,
        y: 200,
        radius: 50,
        color: "Blue"

    };

    
    const sand = {
        x: 400,
        y: 400,
        radius: 50,
        color: "yellow"
    };

    // Wall properties
    const wall = {
        x: 200, 
        y: 200, 
        width: 20, 
        height: 100, 
        color: "black" 
    };

    


    // Mouse control variables
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };

    // Score variables
    let score = 0;
    const levScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let i = 0;
    let counter = 8;
    
   

    // Function to start the game
    function startGame() {
        canvas.style.display = "block"; // Show the canvas
        menu.style.display = "none";
        randomizeTerrain(); // Randomize water and sand positions
        gameLoop(); // Start the game loop
    }


    // Update function
    function update() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw hole
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
        ctx.fillStyle = hole.color;
        ctx.fill();
        ctx.closePath();


        // Draw Water
        ctx.beginPath();
        ctx.arc(water.x, water.y, water.radius, 0, Math.PI * 2);
        ctx.fillStyle = water.color;
        ctx.fill();
        ctx.closePath();

        // Draw Sand
        ctx.beginPath();
        ctx.arc(sand.x, sand.y, sand.radius, 0, Math.PI * 2);
        ctx.fillStyle = sand.color;
        ctx.fill();
        ctx.closePath();

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        // Draw wall
        ctx.fillStyle = wall.color;
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);


        // Update ball position
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        var rborder = canvas.width - ball.radius;
        var bborder = canvas.height - ball.radius;
        var lborder = 0 + ball.radius;
        
       

        // Check collision with borders
        if (ball.x + ball.radius > canvas.width) { //creates right border
           // ball.velocityX = -ball.velocityX; //bounces the ball of the wall
            ball.x = rborder; 
        }
        if (ball.y + ball.radius > canvas.height) { //creates bottom border
          //  ball.velocityY = -ball.velocityY; //bounces ball off wall 
            ball.y = bborder;
            
        }
        if (ball.x - ball.radius < 0) { //creates left border
            ball.x = lborder;
        }
        if (ball.y - ball.radius < 0) { //creates upper border
            ball.y = lborder;
        }
       

        // Check collision with hole
        const distance = Math.sqrt((ball.x - hole.x) ** 2 + (ball.y - hole.y) ** 2);
        if (distance < ball.radius + hole.radius) {

            counter++;
            if (counter == 9) {
                endGame();
            }
            score++;
            i += 1;
            levScore[i] = score;
            score = 0; // Reset score
            isDragging = false;
            alert("Level Complete! Press to Continue")
            reset()
            randomizeTerrain(); // Randomize water and sand positions
           
            
        }

        // Check collision with water
        const waterDistance = Math.sqrt((ball.x - water.x) ** 2 + (ball.y - water.y) ** 2);
        if (waterDistance < ball.radius + water.radius) {
            // Ball is in water
            
            alert("Ball has landed in water, Try again!")
            isDragging = false; //stops ball glitching/moving
            score++; //doesnt add score when hits water so added it here
            reset(); //returns ball to start
        }

        //check collision with sand
        const sandDistance = Math.sqrt((ball.x - sand.x) ** 2 + (ball.y - sand.y) ** 2);
        if (sandDistance < ball.radius + sand.radius) {
           
            alert("Ball has landed in sand, oops!")
            isDragging = false;
            score++; //adds 2 to score 
            score++;
            ball.x = sand.x + 50; //spawns ball next to sand
            ball.y = sand.y + 50;
            ball.velocityX = 0;
            ball.velocityY = 0;
            
            
        }

        // Check collision with wall
        if (ball.x + ball.radius > wall.x && ball.x - ball.radius < wall.x + wall.width &&
            ball.y + ball.radius > wall.y && ball.y - ball.radius < wall.y + wall.height) {
            // If collision detected, move the ball back to its previous position
            ball.x -= ball.velocityX;
            ball.y -= ball.velocityY;

            // Reset ball velocity to zero to prevent further movement
            ball.velocityX = 0;
            ball.velocityY = 0;
        }

    }

    function randomizeTerrain() {
        // Update water position after each level
        do {
            water.x = Math.random() * (canvas.width - 2 * water.radius) + water.radius;
            water.y = Math.random() * (canvas.height - 2 * water.radius) + water.radius;
        } while (distanceBetween(water, hole) < (water.radius + hole.radius) * 2 || distanceBetween(water, ball) < (water.radius + ball.radius) * 2);

        // Update sand position after each level
        do {
            sand.x = Math.random() * (canvas.width - 2 * sand.radius) + sand.radius;
            sand.y = Math.random() * (canvas.height - 2 * sand.radius) + sand.radius;
        } while (distanceBetween(sand, hole) < (sand.radius + hole.radius) * 2 || distanceBetween(sand, ball) < (sand.radius + ball.radius) * 2);

        // Update wall position and dimensions after each level
        do {
            wall.x = Math.random() * (canvas.width - 2 * wall.width) + wall.width;
            wall.y = Math.random() * (canvas.height - 2 * wall.height) + wall.height;
        } while (distanceBetween(wall, hole) < (wall.width + hole.radius) * 2 || distanceBetween(wall, ball) < (wall.width + ball.radius) * 2);

        // Randomize wall width and height after each level
        wall.width = Math.random() * (canvas.width / 4) + 20; // Adjust the range and minimum width as needed
        wall.height = Math.random() * (canvas.height / 4) + 20; // Adjust the range and minimum height as needed
    }


    // Function to calculate distance between two objects
    function distanceBetween(obj1, obj2) {
        return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
    }

    
    // Reset ball position
    function reset() {
        ball.x = 50;
        ball.y = 50;
        ball.velocityX = 0;
        ball.velocityY = 0;
        
    }

    // Mouse event listeners
    canvas.addEventListener("mousedown", function (event) {
        isDragging = true;
        dragStart.x = event.clientX;
        dragStart.y = event.clientY;
    });

    canvas.addEventListener("mousemove", function (event) {
        if (isDragging) {
            // Calculate velocity based on drag distance
            ball.velocityX = (event.clientX - dragStart.x) * 0.05; // Adjust this multiplier as needed
            ball.velocityY = (event.clientY - dragStart.y) * 0.05;
        }
    });

    canvas.addEventListener("mouseup", function (event) {
        if (isDragging) {
            isDragging = false;
            // Increment score when releasing mouse button after dragging
            score++;
        }
        // Reset velocity after releasing mouse button
        ball.velocityX = 0;
        ball.velocityY = 0;
    });

    // Function to display score
    function displayScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 20);
        ctx.fillText("Holes", 100, 20);
        ctx.fillText("1- " + levScore[1],160, 20);
        ctx.fillText("2- " + levScore[2], 200, 20);
        ctx.fillText("3- " + levScore[3], 240, 20);
        ctx.fillText("4- " + levScore[4], 280, 20);
        ctx.fillText("5- " + levScore[5], 320, 20);
        ctx.fillText("6- " + levScore[6], 360, 20);
        ctx.fillText("7- " + levScore[7], 400, 20);
        ctx.fillText("8- " + levScore[8], 440, 20);
        ctx.fillText("9- " + levScore[9], 480, 20);
    }

    // Game loop
    function gameLoop() {
        update();
        displayScore(); // Display score on each frame
        requestAnimationFrame(gameLoop);
    }

    // Event listener for the start button
    startButton.addEventListener("click", startGame);

    
    function endGame() {
        canvas.style.display = "none";
        lboard.style.display = "block";
    }

    exitButton.addEventListener("click", function () {
        lboard.style.display = "none";
        menu.style.display = "block";
        const totalScore = calculateTotalScore();
        promptAndUpdateLeaderboard(totalScore);
    });

    let leaderboard = [];

    // Load existing leaderboard data from localStorage, if any
    if (localStorage.getItem("leaderboard")) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }

    function updateLeaderboard(playerName, totalScore) {
        leaderboard.push({ name: playerName, score: totalScore });
        // Sort leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);
        // Save leaderboard to localStorage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }

    // Function to prompt player for name and update leaderboard
    function promptAndUpdateLeaderboard(totalScore) {
        const playerName = prompt("Congratulations! You've completed the game! Please enter your name:");
        if (playerName) {
            updateLeaderboard(playerName, totalScore);
            displayLeaderboard();
        }
    }

    // Function to display leaderboard
    function displayLeaderboard() {
        let leaderboardHTML = "<h2>Leaderboard</h2>";
        leaderboard.forEach((entry, index) => {
            leaderboardHTML += `<p>${index + 1}. ${entry.name}: ${entry.score}</p>`;
        });
        // Display leaderboard in a separate div or alert
        // For example:
        alert(leaderboardHTML);
    }

    // Function to calculate total score from all levels
    function calculateTotalScore() {
        let totalScore = 0;
        for (let i = 1; i <= 9; i++) {
            totalScore += levScore[i];
        }
        return totalScore;
    }
});
