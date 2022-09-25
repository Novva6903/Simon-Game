var buttonColours = ["red", "blue", "green", "yellow"];

var userClickPattern = [];
var userChosenColour;

var gamePattern = [];
var level;
var clearStage = 0;
var buttonPressNum = 0;

var stopCurrGame = false;
var buttonHasBeenPressed = false;
var loading = false;

$(".btn").click(function(event) {
    console.log(event);
    if (!loading) {
        userChosenColour = event.target.id;
        
        playSound(userChosenColour, 0.2);
        animatePress(userChosenColour);
    
        // Start Game
        if (!buttonHasBeenPressed) {
            startGame();
            $(".instructionMenu").css("visibility", "hidden");
        }
        else if (!stopCurrGame && buttonHasBeenPressed) {
            buttonPressNum++;
            userClickPattern.push(userChosenColour);
    
            var answerIsTrue = checkAnswer(buttonPressNum);
    
            if (answerIsTrue && buttonPressNum === level) {
                loading = true;
                playSound("correct", 0.5);
                emptyUserClickPattern();
                setTimeout(nextSequence, 1000);
                setTimeout(function() {
                    loading = false;
                }, 1000);
                buttonPressNum = 0;
                level++;
            }
            else if (!answerIsTrue) {
                clearStage = level-1;
                gameOver();
            }
        }
    }
})

function startGame() {
    buttonPressNum = 0;
    level = 1;
    stopCurrGame = false;
    loading = true;
    $("h1").html("Loading.");
    setTimeout(function() {
        $("h1").html("Loading..");
    }, 1000);
    setTimeout(function() {
        $("h1").html("Loading...");
    }, 2000);
    setTimeout(nextSequence, 3000);
    setTimeout(function() {
        loading = false;
    }, 3000);
    buttonHasBeenPressed = true;
}

function checkAnswer(numberOfIndexToCheck) {
    for (let i = 0; i < buttonPressNum; i++) {
        if (userClickPattern[i] == gamePattern[i]) continue;
        else {
            return false;
        }
    }
    return true;
}

function gameOver() {
    $(".instructionMenu").css("visibility", "visible");
    playSound("wrong", 0.2);
    stopCurrGame = true;
    $("h1").html("Game Over!");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    setTimeout(function() {
        alert("Your Highest Level Cleared: " + clearStage);
    }, 600);
    buttonHasBeenPressed = false;
    emptyGamePattern();
    emptyUserClickPattern();
}

function emptyGamePattern() {
    while (gamePattern.length > 0) gamePattern.pop();
}

function emptyUserClickPattern() {
    while (userClickPattern.length > 0) userClickPattern.pop();
}

function nextSequence() {
    if (stopCurrGame) return;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    loading = true;
    showSequences();
    setTimeout(function() {
        loading = false;
    }, 400*gamePattern.length);
}

function showSequences() {
    var timeout = 0;
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i], 0.2);
        }, timeout);
        timeout += 400;
    }
}

function playSound(colour, audioVolume) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.volume = audioVolume;
    audio.play();
}

function animatePress(colour) {
    $("#" + colour).addClass("pressed");

    setTimeout(function() {
        $("#" + colour).removeClass("pressed");
    }, 100)
}