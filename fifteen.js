var blank =['300px','300px'];

window.onload = function() {
    setup();
    var puzzlePieces = getPuzzlePieces();
    
    document.getElementById("shufflebutton").onclick = function() {
        shuffle(puzzlePieces);
        puzzlePieces = getPuzzlePieces();
    };

    for (var i = 0; i < puzzlePieces.length; i++) {
        puzzlePieces[i].addEventListener("mouseover", function() {
            if (is_movable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzlePieces[i].addEventListener("mouseleave", function() {
            this.className = "puzzlepiece";
        });

        puzzlePieces[i].addEventListener("click", function() {
            if (this.className.includes("movablepiece")) {
                move(this);
            }
        });
    }

};

function setup(){
    var tile = document.getElementById("puzzlearea").childNodes;
    var inital = [];
    var x = 0, y = 0;
    var top = 0, left = 0,
        count = 1;

    for (let i = 0; i < tile.length; i++) {
        if (tile[i].nodeName === "DIV") {
            tile[i].className += "puzzlepiece";
            inital.push([top.toString() + "px", left.toString() + "px"]);
            tile[i].setAttribute("style", `background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
            x -= 100;
            left += 100;

            if (count % 4 === 0) {
                y -= 100;
                top += 100;
                left = 0;
            }
            count += 1;

        }
    }
    return inital;
}

function is_movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}

function move(piece) {
    var blankTop = piece.style.top,
        blankLeft = piece.style.left;

    piece.style.top = blank[0];
    piece.style.left = blank[1];
    
    blank = [blankTop, blankLeft];
}

function shuffle(pieces) {
    var piece, rand;

    for (var i = 0; i < pieces.length; i++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        move(piece[0]);
    }
}

function getPuzzlePieces() {
    return $('.puzzlepiece');
}