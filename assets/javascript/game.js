var $ = function (id) {
    return document.getElementById(id)
}
const words = ["code", "html", "css", "javascript", "jquery", "developer", "game", "web", "computer"];
const images = ["assets/images/code.jpg", "assets/images/html.jpg", "assets/images/css.png", "assets/images/javascript.jpg", "assets/images/jquery.jpg", "assets/images/developer.jpg", "assets/images/game.jpg", "assets/images/web.jpg", "assets/images/computer.jpg"];
var word;
const img = document.createElement("img")
const parent = $("img")
var answerArray = [];
var userGuess;
var rightGuess = false;
var userRightGuess = 0;
var left = 12;
var wins = 0;
var losses = 0;

function random() {
    var random = Math.floor(Math.random() * words.length);
    word = words[random]
    img.src = images[random]
}

function showBlank() {
    for (i = 0; i < word.length; i++) {
        answerArray[i] = "_"
    }
    $("guess").innerHTML = answerArray.join(" ")
}

function guessesLeft() {
    $("left").innerHTML = left
}

function winsScore() {
    $("wins").innerHTML = wins
}

function lossesScore() {
    $("losses").innerHTML = losses
}

function wrongGuess(char) {
    $("wrong").innerHTML += char + ", "
}

function initialGame() {
    if ($("winImage")) {
        $("winImage").remove()
    }

    left = 12;
    answerArray = [];
    $("wrong").innerHTML = "";
    userRightGuess = 0
    rightGuess = false;
    guessesLeft()
    random()
    showBlank()
}

initialGame()
winsScore()
lossesScore()

function showLetter(char, str) {
    for (var j = 0; j < str.length; j++) {
        if (char === str[j]) {
            rightGuess = true
            answerArray.splice(j,1,char)
            userRightGuess++
        }
    }
    $("guess").innerHTML = answerArray.join(" ")
}

var matchLength = function() {
    if (word.length === userRightGuess) return true
    else return false
}

document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
    showLetter(userGuess, word)
    if (rightGuess) {
        rightGuess = false
        if (matchLength()) {
            var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3');
            audio.play()
            img.setAttribute("id","winImage")
            parent.appendChild(img)
            wins++
            winsScore()
            setTimeout(initialGame, 2000)
        } else {
            var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3');
            audio.play()
        }
    } else {
        left--
        if (left < 1) {
            var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3');
            audio.play()
            initialGame()
            losses++
            lossesScore()
        } else {
            var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3');
            audio.play()
            wrongGuess(userGuess)
            guessesLeft()
        }
    }
}