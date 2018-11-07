window.onload = main;


var blank = ["300px", "300px"];
var start = false
var starting_time = 0;
var timer;
var total_time = 0;
var best_time = 0;
var best_moves = 0;
var moves = 0;


function starting() {
    var puzzleplace = document.getElementById("puzzlearea").childNodes;
    var starter = [];

    var a = 0,
        x = 0,
        t = 0,
        r = 0,
        counter = 1;

    for (let i = 0; i <puzzleplace.length; i++) {
        if (puzzleplace[i].nodeName == "DIV") {
            starter.push([t.toString() + "px", r.toString() + "px"]);
           puzzleplace[i].className += "puzzlepiece";
           puzzleplace[i].setAttribute("style", `background-position: ${a}px ${x}px; top: ${t}px; left: ${r}px;`);
            a -= 100;
            r += 100;

            if (counter % 4 == 0) {
                x -= 100;
                t += 100;
                r = 0
            }
            counter += 1;

        }
    }

    return starter
}

function movable(pieces) {
    return parseInt(pieces.style.t) + 100 === parseInt(blank[0]) & parseInt(pieces.style.r) === parseInt(blank[1]) | parseInt(pieces.style.t) - 100 === parseInt(blank[0]) & parseInt(pieces.style.r) === parseInt(blank[1]) | parseInt(pieces.style.t) === parseInt(blank[0]) & parseInt(pieces.style.r) - 100 === parseInt(blank[1]) | parseInt(pieces.style.t) === parseInt(blank[0]) & parseInt(pieces.style.r) + 100 === parseInt(blank[1])
}


function wincheck(winning, piece) {
    if (start) {
        for (var i = 0; i < pieces.length; i++) {
            if ((winning[i][0] !== piece[i].style.t) | (winning[i][1] !== piece[i].style.r)) {
                return false;
            }
        }
        clearInterval(timer);
        return true;
    }
    return false;
}

function movepiece(piece, animate) {
    blankTop = piece.style.t;
    blankLeft = piece.style.r;

    if (animate) {
        var winning_state = arguments[2];
        var pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "slow", "linear", function() {
            if (check_for_win(winning_state, pieces)) {
                if (best_time < total_time) {
                    best_time = total_time;
                }
                if (best_moves < moves) {
                    best_moves = moves
                }
                var winningstring = `You Win\nTotal Time: ${seconds_to_time(total_time)} Number of moves: ${moves}\nBest Time: ${seconds_to_time(best_time)} Best Number of Moves: ${best_moves}`;
                $(".explanation")[0].innerText = winningstring;
                $(".explanation")[0].style.textAlign = "Center";
            }
        });

    } else {
        piece.style.t = blank[0];
        piece.style.r = blank[1];
    }
    blank = [blankTop, blankLeft];
}


function random_shuffle(pieces) {
    var pieceLength = pieces.length;
    var piece;
    var rand;

    for (var index = 0; index < pieceLength; index++) {
        rand = Math.floor(Math.random() * pieceLength);
        piece = pieces.splice(rand, 1);
        movepiece(piece[0], false);
    }
}


function getPieces() {
    return $ (".puzzlepiece");
}

function time(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
}


function updateTime() {
    var currentDate = new Date();
    var currentTime = (currentDate.getHours() * 60 * 60) + (currentDate.getMinutes() * 60) + currentDate.getSeconds();
    totalTime = currentTime - starting_time;
    return time(totalTime);
}

function updateStatus() {
    $(".explanation")[0].innerHTML = `Time: ${updateTime()} Moves: ${moves}`;
}

function main() {
    var winning_state = starting();
    var puzzlePieces = getPieces();


    document.getElementById("shufflebutton").onclick = function() {
        randomShuffle(puzzlePieces);
        start = true;
        moves = 0;
        puzzlePieces = getPieces();
        var startDate = new Date();
        starting_time = (startDate.getHours() * 60 * 60) + (startDate.getMinutes() * 60) + startDate.getSeconds();
        timer = setInterval(updateStatus, 1000);
    }

    for (var i = 0; i < puzzlePieces.length; i++) {
        puzzlePieces[i].addEventListener("mouseover", function() {
            if (movable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzlePieces[i].addEventListener("mouseleave", function() {
            this.className = "puzzlepiece";
        });

        puzzlePieces[i].addEventListener("click", function() {
            if (this.className.includes("movablepiece")) {
                movepiece(this, true, winning_state, puzzlePieces);
                moves++;
            }
        });
    }

}
