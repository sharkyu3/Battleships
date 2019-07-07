console.log("Ready for war!!!");

var gridSize = 10;
var playerOneName = null;
var playerTwoName = null;
var playerTurn = "One";

var startButton = document.getElementById("start");
var displayRow = document.getElementById("row2");
var gameBoardRow = document.getElementById("gameboard-row");

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
    var readyTemp = document.createElement("button");
    if(playerTurn === "One"){
        addParaToDisplay("Time for " + playerOneName + " to set your board!" + "\n" + "Click on the button below when you have the screen to yourself!");
        readyTemp.textContent = playerOneName + " is ready!"
    }else{
        addParaToDisplay("Time for " + playerTwoName + " to set your board!" + "\n" + "Click on the button below when you have the screen to yourself!");
        readyTemp.textContent = playerTwoName + " is ready!"
    }
    readyTemp.addEventListener("click", makeBoard);
    readyTemp.addEventListener("click",fixBoats);
    displayRow.appendChild(readyTemp);

    fillShipsArray();
}

var compileTurnAndBoard = "boardTally" + playerTurn;

var boardTallyOne = [
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
];

var boardTallyTwo = [
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null,null,null],
];

var makeBoard = function(event){
    clearDisplay();
    gameBoardRow.style.backgroundImage = 'none';

    //create left display to show ships available for placement
    var leftDisplay = document.createElement("div");
    leftDisplay.setAttribute("class", "col-3");
    leftDisplay.setAttribute("id", "left-display");
    //create rows for each type of ship
    for(k=0; k<ships.length; k++){
        var shipRows = document.createElement("div");
        shipRows.setAttribute("class", "row");
        shipRows.setAttribute("id", "shipBox");
        shipRows.setAttribute("class", "ship"+k);
        //create two row to display ship names and how many squares required
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
    //create button class = game-square x10 per row
        for (j=0;j<gridSize; j++){
        var cellTemp = document.createElement("div");
        cellTemp.setAttribute("class","game-square");
        //set additional attributes to mark coordinates of cell
        cellTemp.setAttribute("rowNo", i);
        cellTemp.setAttribute("colNo", j);
        //append cells to rows
        rowsTemp.appendChild(cellTemp);
    }
        //append rows to board
        boardTemp.appendChild(rowsTemp);
    }
    //append board to body
    gameBoardRow.appendChild(leftDisplay);
    gameBoardRow.appendChild(boardTemp);

    if(playerTurn === "Two"){
        var squaresTemp = document.querySelectorAll(".game-square");
        for (i=0; i<squaresTemp.length; i++){
            squaresTemp[i].style.backgroundColor = "#fbdda57a";
        };
    }
}

var noOfSquaresToPlace = null;
var shipLetter = null;

var shipsToPlace = [];

var fillShipsArray = function(){
    //fill shipsToPlace array with the ship names
    for(i=0; i<ships.length; i++){
        shipsToPlace.push(ships[i].ShipName);
    };
};

var fixBoats = function(){
    if(shipsToPlace.length === 0){
        if(playerTurn === "One"){
            playerTurn = "Two";
            clearGameBoardRow();
            startCollatePlayerPositions();
        }else{
            clearDisplay();
            clearGameBoardRow();
            addParaToDisplay("MAN YOUR STATIONS!!!!!");
            showBoth();
            //***gameplay function***
        };
    }else{
        for(j=0; j<ships.length; j++){
        if (shipsToPlace[0] === ships[j].ShipName){
            clearDisplay();
            noOfSquaresToPlace = parseInt(ships[j].Squares);
            shipLetter = ships[j].Sign;
            var shipTemp = document.querySelector(".ship"+j);
            shipTemp.style.border = "5px solid red";
            addParaToDisplay("Let's place your " + ships[j].ShipName + " which requires " + noOfSquaresToPlace + " squares");
            addSquaresEvent();
            }
        }
    }
}

var logSquares = function(event){
    clearDisplay();
    noOfSquaresToPlace--;

    if(noOfSquaresToPlace === -1){
        removeSquaresEvent();
        shipsToPlace.shift();
        fixBoats();
    }else if(noOfSquaresToPlace >= 0){
    clearDisplay();
    addParaToDisplay("You need to place " + noOfSquaresToPlace + " more squares for this vessel.")
    //turn cell black to indicate that space has been taken and remove click event for that cell
    this.style.backgroundColor = "black";
    this.removeEventListener("click", logSquares);

    //grab coordinates of cell and fill in array
    var cdn = [this.getAttribute("rowNo"), this.getAttribute("colNo")];
    var firstIndex = cdn[0];
    var secondIndex = cdn[1];
    for (i=0; i<boardTallyOne.length; i++) {
        if (i === parseInt(firstIndex)) {
            for (j=0; j<boardTallyOne[i].length; j++) {
                if (j === parseInt(secondIndex)) {
                    if (playerTurn === "One"){
                        boardTallyOne[i][j] = shipLetter;
                    }else{
                        boardTallyTwo[i][j] = shipLetter;
                    }

                }
            }
        }
    }
}
};

var tinyGrid = function(){
    for(i=0; i<2; i++){
        //create div id = board
        var boardTemp = document.createElement("div");
        boardTemp.setAttribute("class", "col-9");
        boardTemp.setAttribute("id", "main-board"+i);
        //create div class = game-row x10
        for(i=j=0; j<gridSize; j++){
            var rowsTemp = document.createElement("div");
            rowsTemp.setAttribute("class","row");
            rowsTemp.setAttribute("class", "game-row")
        //create button class = game-square x10 per row
            for (k=0;k<gridSize; k++){
            var cellTemp = document.createElement("div");
            cellTemp.setAttribute("class","game-square");
            //set additional attributes to mark coordinates of cell
            cellTemp.setAttribute("rowNo", i);
            cellTemp.setAttribute("colNo", j);
            //append buttons to rows
            rowsTemp.appendChild(cellTemp);
        }
            //append rows to board
            boardTemp.appendChild(rowsTemp);
        }
    }
}

var showBoth = function(){
    for(i=0; i<2; i++){
        var tempRow = document.createElement("div");
        tempRow.setAttribute("class", "col-6");
        tempRow.setAttribute("id", "displayCol"+[i])
        for (j=0; j<2; j++){
            var tempCol = document.createElement('div');
            tempCol.setAttribute("class", "row");
            tempCol.setAttribute("id", "displayRow" + [i]+[j]);
            tempRow.appendChild(tempCol);
        }
        gameBoardRow.appendChild(tempRow);
    }
    var box1 = document.getElementById("displayRow00");
    box1.textContent = "Admiral " + playerOneName + "'s grid";
    var box2 = document.getElementById("displayRow10");
    box2.textContent = "Admiral " + playerTwoName + "'s grid";
    tinyGrid();
}

var clearDisplay = function(){
    while (displayRow.firstChild){
        displayRow.removeChild(displayRow.firstChild);
    };
};

var addParaToDisplay = function(msg){
    var paraTemp = document.createElement("p");
    paraTemp.textContent = msg;
    displayRow.appendChild(paraTemp);
};

var addSquaresEvent = function() {
    var squaresTemp = document.querySelectorAll(".game-square");
        for (i=0; i<squaresTemp.length; i++){
            squaresTemp[i].addEventListener("click",logSquares);
        };
};

var removeSquaresEvent = function() {
    var squaresTemp = document.querySelectorAll(".game-square");
        for (i=0; i<squaresTemp.length; i++){
            squaresTemp[i].removeEventListener("click",logSquares);
        };
};

var clearGameBoardRow = function(){
    while (gameBoardRow.firstChild){
        gameBoardRow.removeChild(gameBoardRow.firstChild);
    };
};

document.addEventListener('DOMContentLoaded', function( event ){
  // now that the dom is ready, set the button click
  startButton.addEventListener('click', startGame);
});