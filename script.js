console.log("Ready for war!!!");

var gridSize = 10;
var playerOneName = null;
var playerTwoName = null;

var startButton = document.getElementById("start");
var displayRow = document.getElementById("row2");
var gameBoardRow = document.getElementById("gameboard-row");

var startGame = function(event){
    startButton.remove();
    //create input field to collect player names
    var inputTemp = document.createElement("input");
    inputTemp.setAttribute("id", "inputField");
    inputTemp.setAttribute("placeholder", "Input Player 1's name");
    displayRow.appendChild(inputTemp);
    inputTemp.addEventListener("change", function(event){
        if(playerOneName === null){
            playerOneName = this.value.toUpperCase();
            console.log("recognised player 1's name as " + playerOneName);
            clearInput("Input Player 2's name");
        }else{
            playerTwoName= this.value.toUpperCase();
            console.log("recognised player 2's name as " + playerTwoName);
            this.remove();
            startCollatePlayerPositions();
        }
    });
}

var startCollatePlayerPositions = function(){
    var paraTemp = document.createElement("p");
    paraTemp.textContent = "Time for " + playerOneName + " to set your board!" + "\n" + "Click on the button below when you have the screen to yourself!"
    displayRow.appendChild(paraTemp);

    var readyTemp = document.createElement("button");
    readyTemp.textContent = playerOneName + " is ready!"
    readyTemp.addEventListener("click", makeBoard);
    displayRow.appendChild(readyTemp);
}

var boardTally = [];
var boardTallyCells = [];

var makeBoard = function(event){
    while (displayRow.firstChild){
        displayRow.removeChild(displayRow.firstChild);
    };

    var leftDisplay = document.createElement("div");
    leftDisplay.setAttribute("class", "col-3");
    leftDisplay.setAttribute("id", "left-display");

    for(k=0; k<ships.length; k++){
        var shipRows = document.createElement("div");
        shipRows.setAttribute("class", "row");
        shipRows.setAttribute("id", "shipBox");

        for(m=0; m<1; m++){
            var infoRows = document.createElement("div");
            infoRows.setAttribute ("class", "row");
            infoRows.setAttribute("class", "miniDisplay");
            infoRows.setAttribute("id", "shipTitle");
            infoRows.textContent = ships[k].ShipName;
            shipRows.appendChild(infoRows);
        }
        for(l=0; l<1; l++){
            var nextRows = document.createElement("div");
            nextRows.setAttribute ("class", "row");
            nextRows.setAttribute("class", "miniDisplay");
            nextRows.textContent = "Requires " + ships[k].Squares + " squares";
            shipRows.appendChild(nextRows);
        }
        leftDisplay.appendChild(shipRows);
    }


    //create div id = board
    var boardTemp = document.createElement("div");
    boardTemp.setAttribute("class", "col-9");
    boardTemp.setAttribute("id", "main-board");

    //create div class = game-row x10
    for(i=0; i<gridSize; i++){
        var rowsTemp = document.createElement("div");
        rowsTemp.setAttribute("class","row");
        rowsTemp.setAttribute("class", "game-row")

        //create empty 10 x 10 array
        boardTallyCells.push("null");
        boardTally.push(boardTallyCells);

    //create button class = game-square x10 per row
        for (j=0;j<gridSize; j++){
        var cellTemp = document.createElement("div");
        cellTemp.setAttribute("class","game-square");
        //set additional attributes to mark coordinates of cell
        cellTemp.setAttribute("rowNo", i);
        cellTemp.setAttribute("colNo", j);
        cellTemp.addEventListener("click",gamePlay);

        //append buttons to rows
        rowsTemp.appendChild(cellTemp);
    }
        //append rows to board
        boardTemp.appendChild(rowsTemp);
    }
    //append board to body
    gameBoardRow.appendChild(leftDisplay);
    gameBoardRow.appendChild(boardTemp);

    var paraTemp = document.createElement("p");
    paraTemp.textContent = "You have 5 ships to place.";
    displayRow.appendChild(paraTemp);
}

var ships = [
    {
        ShipName: "Carrier",
        Sign: "C",
        Squares: + +5,
    },
    {
        ShipName: "Battleship",
        Sign: "B",
        Squares: + +4,
    },
    {
        ShipName: "Submarine",
        Sign: "S",
        Squares: + +3,
    },
    {
        ShipName: "Destroyer",
        Sign: "D",
        Squares: + +3,
    },
    {
        ShipName: "Patrol Boat",
        Sign: "P",
        Squares: + +2,
    }
];

var gamePlay = function(event){

    //grab coordinates of cell and fill in array
    var coordinates = [this.getAttribute("rowNo"), this.getAttribute("colNo")];
    console.log("coordinates of square clicked is: " + coordinates);
    var rowIndex = coordinates[0];
    var colIndex = coordinates[1];
    for(i=0; i<boardTally.length; i++){
        if (i === parseInt(rowIndex)) {
            for (j=0; j<boardTally[i].length; j++){
                if (j === parseInt(colIndex)){
                    boardTally[i][j] = ship;
                }
            }
        }
    }

    //turn cell black to indicate that space has been taken
    this.style.backgroundColor = "black";
}

document.addEventListener('DOMContentLoaded', function( event ){
  // now that the dom is ready, set the button click
  startButton.addEventListener('click', startGame);

});