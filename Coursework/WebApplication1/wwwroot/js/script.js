// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// script.js

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.querySelector(".btn--1");
    const gameContainer = document.getElementById("game-container");
    const ball = document.getElementById("ball");
    const hole = document.getElementById("hole");

    let isShooting = false;
    let isGameStarted = false;

    function startGame() {
        isGameStarted = true;
        startButton.style.display = "none"; // Hide the start button
        gameContainer.style.display = "block"; // Show the game container
    }

    ball.addEventListener("mousedown", function () {
        if (isGameStarted) {
            isShooting = true;
        }
    });

    document.addEventListener("mouseup", function () {
        if (isShooting && isGameStarted) {
            // Rest of the shooting mechanism code...

            isShooting = false;
        }
    });

    function moveBall(velocityX, velocityY) {
        if (isGameStarted) {
            // Implement the ball movement logic...
        }
    }
});


