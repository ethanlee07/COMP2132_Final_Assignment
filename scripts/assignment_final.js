// Get HTML documents
const popUp = document.getElementById("popUp")
const playersFirstDiceImage = document.getElementById("playersFirstDice")
const playersSecondDiceImage = document.getElementById("playersSecondDice")
const cpusFirstDiceImage = document.getElementById("cpusFirstDice")
const cpusSecondDiceImage = document.getElementById("cpusSecondDice")

let rollBtn = document.getElementById("rollBtn")
let resetBtn = document.getElementById("resetBtn")
let playAgainBtn = document.getElementById("playAgainBtn")
let btnClose = document.getElementById("btnClose")
let playerScore = document.getElementById("playerScore")
let cpuScore = document.getElementById("cpuScore")


const delay = 2000;

// Counters
let roundCounter = 0;
let playerScoreCounter = 0;
let cpuScoreCounter = 0;
let btnClick = 0;

// Dice output
let diceNum1;
let diceNum2;
let diceNum3;
let diceNum4;

// Image output
let imageNum1 
let imageNum2 
let imageNum3 
let imageNum4 

// Animation Handlers
let playerScoreAnimationHandler
let diceAnimationHandler;
let cpuScoreAnimationHandler
let popUpAnimationHandler;

// Timeout handler
let timeoutHandler;

// Track opacity value
let opacityValue = 0;

rollBtn.addEventListener("click", function(){
    roundCounter++;
    btnClick++;
    if(roundCounter == 3){
        rollBtn.innerHTML = "Calculate Score"
    }

    if(roundCounter > 3){
        calculateScores(playerScoreCounter, cpuScoreCounter)
    } else {
        diceNum1 = Math.floor(Math.random() * 6) + 1
        console.log(diceNum1)
        diceNum2 = Math.floor(Math.random() * 6) + 1
        console.log(diceNum2)
        diceNum3 = Math.floor(Math.random() * 6) + 1
        console.log(diceNum3)
        diceNum4 = Math.floor(Math.random() * 6) + 1
        console.log(diceNum4)

        imageNum1 = diceNum1
        imageNum2 = diceNum2
        imageNum3 = diceNum3
        imageNum4 = diceNum4

        if(diceNum1 == 1 || diceNum2 == 1){
            diceNum1 = 0;
            diceNum2 = 0;
        }

        if(diceNum3 == 1 || diceNum4 == 1){
            diceNum3 = 0;
            diceNum4 = 0;
        }

        if(diceNum1 == diceNum2){
            diceNum1 *= 2
            diceNum2 *= 2
        }

        if(diceNum3 == diceNum4){
            diceNum3 *= 2
            diceNum4 *= 2
        }
        
        playerScoreCounter += (diceNum1 + diceNum2)
        console.log(`player: ${playerScoreCounter}`)
        playerScore.innerHTML = playerScoreCounter
    
        cpuScoreCounter += (diceNum3 + diceNum4)
        console.log(`cpu: ${cpuScoreCounter}`)
        cpuScore.innerHTML = cpuScoreCounter
        console.log(`round ${roundCounter}`)

        diceAnimationHandler = requestAnimationFrame(changeImage(imageNum1, imageNum2, imageNum3, imageNum4));
    }
});

function changeImage(currentImage, currentImage2, currentImage3, currentImage4){
    playersFirstDiceImage.src = `images/dice-${currentImage}.jpg`;
    playersSecondDiceImage.src = `images/dice-${currentImage2}.jpg`;
    cpusFirstDiceImage.src = `images/dice-${currentImage3}.jpg`;
    cpusSecondDiceImage.src = `images/dice-${currentImage4}.jpg`;

    console.log(`image 1 ${currentImage}`)
    console.log(`image 2 ${currentImage2}`)
    console.log(`image 3 ${currentImage3}`)
    console.log(`image 4 ${currentImage4}`)
}

function calculateScores(score1, score2){
    if(score1 > score2){
        popUp.innerText = "Congratulations You Win"
        popUp.style.background = "lightgreen"
        popUpAnimationHandler = requestAnimationFrame(fadeIn);
    } else if (score1 == score2) {
        popUp.innerHTML = "Game Tied"
        popUp.style.background = "lightgray"
        popUpAnimationHandler = requestAnimationFrame(fadeIn);
    } else {
        popUp.innerHTML = "Unfortunate You Lost"
        popUp.style.background = "lightcoral"
        popUpAnimationHandler = requestAnimationFrame(fadeIn);
    }
}

function fadeIn(){
    opacityValue = opacityValue + .04;
    if(opacityValue <= 1){
        popUp.style.opacity = opacityValue;
        requestAnimationFrame( fadeIn );
    }else{
        popUp.style.opacity = 1;
    }  
}

btnClose.addEventListener("click", function(){
    popUp.style.display = "none";
});