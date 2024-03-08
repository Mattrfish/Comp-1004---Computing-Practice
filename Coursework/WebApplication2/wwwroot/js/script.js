document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas element
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const homePage = document.getElementById("homePage");
    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", startGame);

    // Set up canvas size
    const canvasWidth = canvas.width = window.innerWidth; //sets canvas width
    const canvasHeight = canvas.height = window.innerHeight; //sets canvas height

    
    let ballRadius = Math.min(canvasWidth, canvasHeight) * 0.02; // sets ball radius

    let ballX = 50; //ball values will change
    let ballY = 50;

    const holeX = 700; //const used as hole will remain the same
    const holeY = 700;
    const holeRadius = 20;

    let power = 0;
    const maxPower = 500;

    let score = 0;

    const wall = {
        x: 100,
        y: 100,
        width: 20,
        height: 200
    };

    const water = {
        x: 200,
        y: 200,
        width: 200,
        height: 50
    };

    const sand = {
        x: 400,
        y: 400,
        radius: 100
    };

    // Function to update power based on how long the key or mouse button is held
    function updatePower() {
        power += 20; // Increase power gradually 
        if (power > maxPower) {
            power = maxPower; // Limit power to maximum value
        }
    }

    function checkCollisionWithHole() {
        const distance = Math.sqrt((ballX - holeX) ** 2 + (ballY - holeY) ** 2);
        return distance < ballRadius + holeRadius;
    }

    function resetBallPosition() {
        ballX = 50; // Reset ball to initial position (top-left corner)
        ballY = 50;
    }

    // Function to update game state and render
    function update() {
        // Check for collision with the hole
        if (checkCollisionWithHole()) {
            resetBallPosition();
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw hole
        ctx.beginPath();
        ctx.arc(holeX, holeY, holeRadius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.closePath();
        // Draw ball
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "gray"; // Set wall color
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height); // Draw wall rectangle

        ctx.fillStyle = "blue"; // Set water color
        ctx.fillRect(water.x, water.y, water.width, water.height); // Draw water rectangle

        ctx.beginPath();
        ctx.arc(sand.x, sand.y, sand.radius, 0, Math.PI * 2); // Draw sand circle
        ctx.fillStyle = "yellow"; // Set sand color
        ctx.fill();
        ctx.closePath();
    }


    function startGame() {
        homePage.style.display = "none";
        canvas.style.display = "block";
        scoreDisplay.style.display = "block";

        // Game loop
        function gameLoop() {
            update();
            requestAnimationFrame(gameLoop);
        }

        // Start the game loop
        gameLoop();
    }

    // Event listener for mouse down event (or key down event if you prefer)
    canvas.addEventListener("mousedown", function () {
        // Reset power when mouse button is pressed
        power = 0;
        // Continuously update power as long as the mouse button is held down
        const intervalId = setInterval(updatePower, 50); // Adjust the interval as needed
        canvas.addEventListener("mouseup", function () {
            score++;
            // Stop updating power when mouse button is released
            clearInterval(intervalId);
            // Shoot the ball with the current power level
            shootBall();
        }, { once: true }); // Use { once: true } to ensure this event listener is triggered only once
    });


    // Function to handle mouse click (shooting)
    function shootBall() {
        canvas.addEventListener("click", function (event) {
           
            // Get mouse position relative to canvas
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Calculate direction from ball to mouse
            let directionX = mouseX - ballX;
            let directionY = mouseY - ballY;

            // Normalize direction
            let length = Math.sqrt(directionX * directionX + directionY * directionY);
            directionX /= length;
            directionY /= length;

            // Move the ball with the current power level
            ballX += directionX * power;
            ballY += directionY * power;

            // Reset power
            power = 0;

            updateScore();
        });
    }

    // Function to update the score
    function updateScore() {
         // Increment score by 1

        const scoreDisplay = document.getElementById("scoreDisplay");
        if (scoreDisplay) {
            scoreDisplay.innerText = "Score: " + score;
        } else {
            console.error("Element with id 'scoreDisplay' not found.");
        }
    }


});