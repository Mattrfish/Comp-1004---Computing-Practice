
let hole = document.getElementById("hole")
let ball = document.getElementById("ball")
let wall = document.getElementById("wall");

ball = {
    x: 20,
    y: 10,
    width: 10,
    height: 5,
}

hole = {
    x: 280,
    y: 125,
    width: 10,
    height: 5
}


wall = {
    x: 50,
    y: 0,
    width: 50,
    height: 100,
}

function startGame() {
    // alert("Starting Game!");
    let menu = document.getElementById("home-page");
    menu.style.display = 'none';

    let g_menu = document.getElementById("game-page");
    g_menu.style.display = 'block';
    drawScore();
    drawHole();
    drawBall();
    drawWall();
    
}

    function goToOptions() {
       // alert("Going to Options!");
        let menu = document.getElementById("home-page");
        menu.style.display = 'none';

        let o_menu = document.getElementById("options-page");
        o_menu.style.display = 'block';
    }

    function goToLeaderboard() {
       // alert("Viewing Leaderboard!");
        let l_menu = document.getElementById("home-page");
        l_menu.style.display = 'none';
    }


 //draws the score on the page
function drawScore() {
    const canvas = document.getElementById("canvas2");
    const context2 = canvas.getContext("2d");

}

function drawHole() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(hole.x, hole.y, hole.width, hole.height);

}
function drawBall() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

}

function moveBall(dx, dy) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

   
    context.clearRect(ball.x, ball.y, ball.width, ball.height);

    // Update the ball's position by adding dx and dy
    ball.x += dx;
    ball.y += dy;

    if (ball.x < wall.x + wall.width &&
        ball.x + ball.width > wall.x &&
        ball.y < wall.y + wall.height &&
        ball.y + ball.height > wall.y) {
        // Ball collides with the wall, adjust the position or take appropriate action
        // For now, let's just reset the ball position
        ball.x = 20;
        ball.y = 10;
    }

    // Redraw necessary elements
    drawWall(); // Redraw the wall before the ball to ensure it's visible
    drawBall();
    drawHole();
}


function drawWall() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(wall.x, wall.y, wall.width, wall.height);
}



function shootBall() {
    const speedInput = document.getElementById("speedInput1");
    const dirInput = document.getElementById("dirInput1");

    let shotSpeed = parseFloat(speedInput.value); // Get the speed value entered by the player
    let shotDirection = parseFloat(dirInput.value); // Get the direction value entered by the player


    // Convert the direction from degrees to radians
    let radianAngle = (shotDirection * Math.PI) / 180;
  
   
    let newShotx = Math.cos(radianAngle) * shotSpeed;
    let newShoty = Math.sin(radianAngle) * shotSpeed;
    

    moveBall(newShotx, newShoty);

    resetGame();
}











