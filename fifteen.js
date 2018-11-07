window.onload = main;

function Starting() {
    var puzzleplace = document.getElementById("puzzlearea").childNodes;
    var starter = [];

    var a = 0,
        x = 0,
        t = 0,
        r = 0,
        counter = 1;

    for (let i = 0; i <puzzleplace.length; i++) {
        if (puzzle_area[i].nodeName == "DIV") {
            starter.push([t.toString() + "px", r.toString() + "px"]);
           puzzleplace[i].className += "puzzlepiece";
           puzzleplace[i].setAttribute("style", `background-position: ${a}px ${x}px; t: ${t}px; r: ${r}px;`);
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
