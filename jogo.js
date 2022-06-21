let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let started = false
let level = 0

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
    }
})

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)


    
})

function nextSequence(){
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)

    //2. Call checkAnswer() ‎após um usuário clicar e escolher sua resposta, passando no ‎‎índice da última resposta‎‎ na sequência do usuário.‎
    checkAnswer(userClickedPattern.length-1)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100)

}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("sucess")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    
    } else {
        
        let wrong = new Audio("sounds/wrong.mp3")
        wrong.play()
        $("body").addClass("game-over")
        $("h1").text("Game Over! Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over")


        }, 200)
        //2. Call startOver() if the user gets the sequence wrong.
        startOver()
        
    }
}

//1. Create a new function called startOver().
function startOver(){
    level = 0
    gamePattern = []
    started = false

}
