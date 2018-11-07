window.onload = main;


var blank = ["300px", "300px"];
var start = false;
var moves = 0;
var startTime = 0;
var timer;
var total_time = 0;
var best_time = 0;
var best_moves = 0;


function starting() {
    var puzzleArea = document.getElementById("puzzlearea").childNodes;
    var initial_state = [];

    var x = 0,
        y = 0,
        top = 0,
        left = 0,
        piece_counter = 1;

    for (let i = 0; i < puzzleArea.length; i++) {
        if (puzzleArea[i].nodeName == "DIV") {
            initial_state.push([top.toString() + "px", left.toString() + "px"]);
            puzzleArea[i].className += "puzzlepiece";
            puzzleArea[i].setAttribute("style", `background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
            x -= 100;
            left += 100;

            if (piece_counter % 4 == 0) {
                y -= 100;
                top += 100;
                left = 0
            }
            piece_counter += 1;

        }
    }

    return initial_state
}


function movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}


function winCheck(winningState, pieces) {
    if (start) {
        for (var i = 0; i < pieces.length; i++) {
            if ((winningState[i][0] !== pieces[i].style.top) | (winningState[i][1] !== pieces[i].style.left)) {
                return false;
            }
        }
        clearInterval(timer);
        return true;
    }
    return false;
}


function movePiece(piece, animate) {
    blank_top = piece.style.top;
    blank_left = piece.style.left;

    if (animate) {
        var winningState = arguments[2];
        var pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "slow", "linear", function() {
            if (winCheck(winningState, pieces)) {
                if (best_time < total_time) {
                    best_time = total_time;
                }
                if (best_moves < moves) {
                    best_moves = moves
                }
                var win_string = `You Win\nTotal Time: ${time(total_time)} Number of moves: ${moves}\nBest Time: ${time(best_time)} Best Number of Moves: ${best_moves}`;
                $(".explanation")[0].innerText = win_string;
                $(".explanation")[0].style.textAlign = "Center";
            }
        });

    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [blank_top, blank_left];
}


function shuffle(pieces) {
    var pieceLength = pieces.length;
    var piece;
    var rand;

    for (var index = 0; index < pieceLength; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        movePiece(piece[0], false);
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
    var current_date = new Date();
    var current_time = (current_date.getHours() * 60 * 60) + (current_date.getMinutes() * 60) + current_date.getSeconds();
    total_time = current_time - startTime;
    return time(total_time);
}


function updateStatus() {
    $(".explanation")[0].innerHTML = `Time: ${updateTime()} Moves: ${moves}`;
}

function backgroundSeletor() {
    var background_form = "<form align='Center'>\
    <p align='Center'>Welcome to my Game, His name is Hikari, Select shuffle and fix him! <p>\
    </form>";

    $("#overall").before(background_form);

}

function changeBackground(value) {
    var pieces = getPieces();

    for (var i = 0; i < pieces.length; i++){
        pieces[i].style.backgroundImage = `url('background${value}.jpg')`;
    }
}

function shuffleImage(){

    var value = Math.floor(Math.random()*4)
    if(value === 0){
        value = "";
    }
}

function main() {
    var winningState = starting();
    var puzzlePieces = getPieces();
    backgroundSeletor();
    var bg_form_items = $("form")[0].elements;

    for (var i = 0; i < bg_form_items.length; i++) {
        bg_form_items[i].addEventListener("click", function(){
            changeBackground(this.value)
        });
    }

    document.getElementById("shufflebutton").onclick = function() {
        shuffle(puzzlePieces);
        shuffleImage();
        start = true;
        moves = 0;
        puzzlePieces = getPieces();
        var start_date = new Date();
        startTime = (start_date.getHours() * 60 * 60) + (start_date.getMinutes() * 60) + start_date.getSeconds();
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
                movePiece(this, true, winningState, puzzlePieces);
                moves++;
            }
        });
    }

}
