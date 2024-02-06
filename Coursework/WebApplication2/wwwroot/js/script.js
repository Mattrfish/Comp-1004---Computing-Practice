let ballHeight = 5;
let ballWidth = 10;
let ballX = 20;
let ballY = 10;

let holeHeight = 5;
let holeWidth = 10;
let holeX = 280;
let holeY = 125;

let spacePressed = false;


let hole = document.getElementById("hole")
let ball = document.getElementById("ball")
let bar = document.getElementById("powerBar");



ball = {
    x: ballX,
    y: ballY,
    width: ballWidth,
    height: ballHeight
}

hole = {
    x: holeX,
    y: holeY,
    width: holeWidth,
    height: holeHeight

}


const powerBarHeight = 100;
let powerBarPostition = 0;
function startGame() {
    // alert("Starting Game!");
    let menu = document.getElementById("home-page");
    menu.style.display = 'none';

    let g_menu = document.getElementById("game-page");
    g_menu.style.display = 'block';
    drawScore();
    drawHole();
    drawBall();

    
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

    context2.font = "20px Arial";
    context2.fillText("Level", 20, 70);
    context2.fillText("1", 90, 70);
    context2.fillText("2", 115, 70);
    context2.fillText("3", 140, 70);
    context2.fillText("4", 165, 70);
    context2.fillText("5", 190, 70);
    context2.fillText("6", 215, 70);
    context2.fillText("7", 240, 70);
    context2.fillText("8", 265, 70);
    context2.fillText("9", 290, 70);
    context2.fillText("Total", 320, 70);
    context2.fillText("Score", 20, 100);
    context2.fillText("-", 90, 100);
    context2.fillText("-", 115, 100);
    context2.fillText("-", 140, 100);
    context2.fillText("-", 165, 100);
    context2.fillText("-", 190, 100); 
    context2.fillText("-", 215, 100);
    context2.fillText("-", 240, 100);
    context2.fillText("-", 265, 100);
    context2.fillText("-", 290, 100);
    
    
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
    /*Draws Ball on Canvas*/
    context.fillStyle = "white";
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

}

function moveBall(dx, dy) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(ball.x, ball.y, ball.width, ball.height);

    // Update the ball's position by adding dx and dy
    ball.x += dx;
    ball.y += dy;

    // Redraw ball position
    drawBall();
}










