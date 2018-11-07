window.onload= main;

function CreateGrid(){

let gridcontainer = document.getElementById("puzzlearea").childNodes;
let begininng = [];

let x = 0,
    y = 0,
    top = 0,
    left = 0,
    peices = 1;

for (let i = 0; i < gridcontainer.length; i++) {
  if (gridcontainer[i].childNodes == "DIV") {
    begininng.push([top.toString() + "px", left.toString() + "px"]);
    gridcontainer[i].className += "puzzlepiece";
    gridcontainer[i].setAttribute("style", `background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
    x -= 100;
    left += 100;

    if (peices % 4 == 0) {
      y -= 100;
      top += 100;
      left = 0
       }
        peices += 1;
    }

  }

       return begininng

}


function main() {
    var winning_state = CreateGrid();
    var pieces = $(".puzzlepiece");
    var bg_form_items = $("form")[0].elements;

    for (var i = 0; i < bg_form_items.length; i++) {
        bg_form_items[i].addEventListener("click", function(){
            change_bg(this.value)
        });
    }

    document.getElementById("shufflebutton").onclick = function() {
        random_shuffle(piecess);
        shuffle_image();
        start = true;
        moves = 0;
        piecess = get_pieces();
        var start_date = new Date();
        start_time = (start_date.getHours() * 60 * 60) + (start_date.getMinutes() * 60) + start_date.getSeconds();
        timer = setInterval(update_stats, 1000);
    }

    for (var i = 0; i < piecess.length; i++) {
        piecess[i].addEventListener("mouseover", function() {
            if (is_movable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        piecess[i].addEventListener("mouseleave", function() {
            this.className = "puzzlepiece";
        });

        piecess[i].addEventListener("click", function() {
            if (this.className.includes("movablepiece")) {
                move_piece(this, true, winning_state, piecess);
                moves++;
            }
        });
    }
}
