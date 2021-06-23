// Get HTML documents
const popUp = document.getElementById("popUp");
const playersFirstDiceImage = document.getElementById("playersFirstDice");
const playersSecondDiceImage = document.getElementById("playersSecondDice");
const cpusFirstDiceImage = document.getElementById("cpusFirstDice");
const cpusSecondDiceImage = document.getElementById("cpusSecondDice");
let rollBtn = document.getElementById("rollBtn");
let resetBtn = document.getElementById("resetBtn");
let playAgainBtn = document.getElementById("playAgainBtn");
let btnClose = document.getElementById("btnClose");
let playerScore = document.getElementById("playerScore");
let playerRoundScore = document.getElementById("playerRoundScore");
let cpuRoundScore = document.getElementById("cpuRoundScore");
let cpuScore = document.getElementById("cpuScore");
let gameStatus = document.getElementById("gameStatus");

// Counters
let roundCounter = 0;
let playerScoreCounter = 0;
let cpuScoreCounter = 0;

// Dice output
let diceNum1;
let diceNum2;
let diceNum3;
let diceNum4;

// Image output
let imageNum1; 
let imageNum2;
let imageNum3; 
let imageNum4; 

// Animation Handlers
let playerScoreAnimationHandler;
let diceAnimationHandler;
let cpuScoreAnimationHandler;
let popUpAnimationHandler;

// Track opacity value
let opacityValue = 0;

// Close the popup with the x button
btnClose.addEventListener("click", function(){
    popUp.style.display = "none";
    resetBtn.style.display = "initial";
    gameStatus.innerHTML = "";
    opacityValue = 0;
    cancelAnimationFrame(popUpAnimationHandler);
});

// Reset the game stats
resetBtn.addEventListener("click", function(){
    resetStats();
    rollBtn.style.display = "initial";
    rollBtn.innerHTML = "Roll Dice";
    gameStatus.innerHTML = "";
    cancelAnimationFrame(popUpAnimationHandler);
});

// Starts the game over after each play
playAgainBtn.addEventListener("click", function(){
    resetStats();
    popUp.style.display = "none";
    rollBtn.style.display = "initial";
    rollBtn.innerHTML = "Roll Dice";
    gameStatus.innerHTML = "";
    cancelAnimationFrame(popUpAnimationHandler);
});

// Process the images and scores
rollBtn.addEventListener("click", function(){
    roundCounter++;
    if(roundCounter == 3){
        rollBtn.innerHTML = "Calculate Score";
    }

    if(roundCounter > 3){
        calculateScores(playerScoreCounter, cpuScoreCounter);
        popUp.style.pointerEvents = "initial";
        cancelAnimationFrame(diceAnimationHandler);
    } else {
        diceNum1 = Math.floor(Math.random() * 6) + 1;
        console.log(diceNum1);
        diceNum2 = Math.floor(Math.random() * 6) + 1;
        console.log(diceNum2);
        diceNum3 = Math.floor(Math.random() * 6) + 1;
        console.log(diceNum3);
        diceNum4 = Math.floor(Math.random() * 6) + 1;
        console.log(diceNum4);

        imageNum1 = diceNum1;
        imageNum2 = diceNum2;
        imageNum3 = diceNum3;
        imageNum4 = diceNum4;

        if(diceNum1 == 1 || diceNum2 == 1){
            diceNum1 = 0;
            diceNum2 = 0;
        }

        if(diceNum3 == 1 || diceNum4 == 1){
            diceNum3 = 0;
            diceNum4 = 0;
        }

        if(diceNum1 == diceNum2){
            diceNum1 *= 2;
            diceNum2 *= 2;
        }

        if(diceNum3 == diceNum4){
            diceNum3 *= 2;
            diceNum4 *= 2;
        }
        
        playerScoreCounter += (diceNum1 + diceNum2);
        console.log(`player: ${playerScoreCounter}`);
        playerRoundScore.innerHTML = `Round Score: ${diceNum1 + diceNum2}`;
        playerScore.innerHTML = playerScoreCounter;
    
        cpuScoreCounter += (diceNum3 + diceNum4);
        console.log(`cpu: ${cpuScoreCounter}`);
        cpuRoundScore.innerHTML = `Round Score: ${diceNum3 + diceNum4}`;
        cpuScore.innerHTML = cpuScoreCounter;

        console.log(`round ${roundCounter}`);

        diceAnimationHandler = requestAnimationFrame(changeImage);
        console.log(`current dice image ${playersFirstDiceImage}`)
    }
});

// Change the dice images
function changeImage(){
    playersFirstDiceImage.src = `images/dice-${imageNum1}.jpg`;
    playersSecondDiceImage.src = `images/dice-${imageNum2}.jpg`;
    cpusFirstDiceImage.src = `images/dice-${imageNum3}.jpg`;
    cpusSecondDiceImage.src = `images/dice-${imageNum4}.jpg`;

    console.log(`image 1 ${imageNum1}`);
    console.log(`image 2 ${imageNum2}`);
    console.log(`image 3 ${imageNum3}`);
    console.log(`image 4 ${imageNum4}`);
}

// Calculate the score and display the correct popup output
function calculateScores(score1, score2){
    if(score1 > score2){
        gameStatus.innerHTML += "Congratulations You Win";
        popUp.style.background += "lightgreen";
        popUp.style.display = "initial"
        popUpAnimationHandler = requestAnimationFrame(fadeIn);
    } else if (score1 == score2) {
        gameStatus.innerHTML += "Game Tied";
        popUp.style.background = "lightgray";
        popUp.style.display = "initial"
        popUpAnimationHandler = requestAnimationFrame(fadeIn);
    } else {
        gameStatus.innerHTML += "Unfortunate You Lost";
        popUp.style.background = "lightcoral";
        popUp.style.display = "initial"
        popUpAnimationHandler = requestAnimationFrame(fadeIn);
    }
}

// Resets all the stats back to original
function resetStats(){
    roundCounter = 0;
    diceNum1 = 0;
    diceNum2 = 0;
    diceNum3 = 0;
    diceNum4 = 0;
    playerScoreCounter = 0;
    cpuScoreCounter = 0;
    playerRoundScore.innerHTML = `Round Score: 0`
    playerScore.innerHTML = 0;
    cpuScore.innerHTML = 0;
    cpuRoundScore.innerHTML = `Round Score: 0`
    currentImage = 1;
    btnClick = 0;
    gameStatus.innerHTML = "";
    opacityValue = 0;

    playersFirstDiceImage.src = `images/dice-${currentImage}.jpg`;
    playersSecondDiceImage.src = `images/dice-${currentImage}.jpg`;
    cpusFirstDiceImage.src = `images/dice-${currentImage}.jpg`;
    cpusSecondDiceImage.src = `images/dice-${currentImage}.jpg`;
}

// Handles the animation to fade in the popup
function fadeIn(){
    opacityValue = opacityValue + .03;
    if(opacityValue <= 1){
        popUp.style.opacity = opacityValue;
        requestAnimationFrame( fadeIn );
    }else{
        popUp.style.opacity = 1;
    }  
}