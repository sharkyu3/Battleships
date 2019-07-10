console.log("Ready for war!!!");

var gridSize = 10;
var playerOneName = null;
var playerTwoName = null;
var playerTurn = "One";
var playerOneWinCount = 0;
var playerTwoWinCount = 0;

var boom = new Audio('sounds/explode.mp3');
var splash = new Audio('sounds/splash.mp3');
var cheer = new Audio('sounds/cheers.mp3');
var tada = new Audio('sounds/tada.mp3');

var startButton = document.getElementById("start");
var displayRow = document.getElementById("row2");
var gameBoardRow = document.getElementById("gameboard-row");
var container = document.querySelector(".container");
var body = document.querySelector("body");

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

// var noOfSquaresToPlace = null;
var shipLetter = null;
var shipsToPlace = [];

var carrierCells = 5;
var battleshipCells = 4;
var submarineCells = 3;
var destroyerCells = 3;
var patrolCells = 2;
var totalToDestroy = 17;

var carrierCells2 = 5;
var battleshipCells2 = 4;
var submarineCells2 = 3;
var destroyerCells2 = 3;
var patrolCells2 = 2;
var totalToDestroy2 = 17;

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

var currentX = null;
var currentY = null;
var truthCheck = [];
var isItOk = null;

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
            clearInput("Input Player 2's name");
        }else{
            playerTwoName = this.value.toUpperCase();
            this.remove();
            startCollatePlayerPositions();
        }
    });
}

//Create gameboard
var startCollatePlayerPositions = function(){
    clearDisplay();
    clearGameBoardRow();

    var readyTemp = document.createElement("button");
    if(playerTurn === "One"){
        addParaToDisplay(playerOneName + "! Time to set your board!" + "\n" + "Click on the button below when you have the screen to yourself!");
        readyTemp.textContent = playerOneName + " is ready!"
    }else{
        addParaToDisplay(playerTwoName + "! Time to set your board!" + "\n" + "Click on the button below when you have the screen to yourself!");
        readyTemp.textContent = playerTwoName + " is ready!"
    }
    readyTemp.addEventListener("click", makeBoard);
    readyTemp.addEventListener("click",fixBoats);
    displayRow.appendChild(readyTemp);

    fillShipsArray();
}

//To create displays
var makeBoard = function(){
    body.style.backgroundImage = "url('pics/warroom.jpg')";
    var header = document.querySelector("h1");
    var para = document.getElementById("row2");
    header.style.color = "white";
    para.style.color = "white";

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
    gameBoardRow.appendChild(leftDisplay);
    makeGrid();
    if(playerTurn === "Two"){
        var squaresTemp = document.querySelectorAll(".game-square");
        for (i=0; i<squaresTemp.length; i++){
            squaresTemp[i].style.backgroundColor = "#fbdda5d9";
        };
    }
    addSquaresEvent();
}

var makeGrid = function(){
    //create div id = board
    var boardTemp = document.createElement("div");
    boardTemp.setAttribute("class", "col-9");
    boardTemp.setAttribute("title", "main-board");
    //create div class = game-row x10
    for(i=0; i<gridSize; i++){
        var rowsTemp = document.createElement("div");
        rowsTemp.setAttribute("class","row");
        rowsTemp.setAttribute("class", "game-row")
    //create button class = game-square x10 per row
        for (j=0;j<gridSize; j++){
        var cellTemp = document.createElement("div");
        cellTemp.classList.add("game-square","unset");
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
    gameBoardRow.appendChild(boardTemp);
}

var showBoth = function(){
    body.style.backgroundImage = "url('pics/storm.jpg')";

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
    makeGrid();
    makeGrid();
    var board = document.querySelectorAll(".col-9");
    for(k=0; k<board.length; k++){
        board[k].setAttribute("id", "mainboard" + k);
        board[k].setAttribute("class", "col-12");
    }
    var board1 = document.getElementById("mainboard0");
    var box3 = document.getElementById("displayRow01");
    box3.appendChild(board1);
    var board2 = document.getElementById("mainboard1");
    var box4 = document.getElementById("displayRow11");
    box4.appendChild(board2);

    var squares2 = document.querySelectorAll("#mainboard1 .game-square");
    for (l=0;l<squares2.length; l++){
        squares2[l].style.backgroundColor = "#fbdda5d9";
    }
}

//phantom spaces on mouse over to show cells that player can place ships
var phantom = function(event){
    this.classList.add("consider");

    if(playerTurn === "One"){
        if(boardTallyOne[currentX][currentY] === null){
            this.style.backgroundColor = "#636161f5";
    }else if (playerTurn === "Two"){
        if(boardTallyTwo[currentX][currentY] === null){
            this.style.backgroundColor = "#636161f5";
        }
    }
}
    var squaresTemp = document.querySelectorAll(".game-square");
    for(i=0; i<squaresTemp.length; i++){
    var cdn2 = [squaresTemp[i].getAttribute("rowNo"), squaresTemp[i].getAttribute("colNo")];
    var firstIndexInner = parseInt(cdn2[0]);
    var secondIndexInner = parseInt(cdn2[1]);
        if(shipsToPlace[0]==="Carrier"){
            if((firstIndexInner === currentX && secondIndexInner === currentY+1) || (firstIndexInner === currentX && secondIndexInner === currentY+2) || (firstIndexInner === currentX && secondIndexInner === currentY-1) || (firstIndexInner === currentX && secondIndexInner === currentY-2)){
                squaresTemp[i].classList.add("consider");
            }
        }else if(shipsToPlace[0]==="Battleship"){
            if((firstIndexInner === currentX && secondIndexInner === currentY+1) || (firstIndexInner === currentX && secondIndexInner === currentY+2) || (firstIndexInner === currentX && secondIndexInner === currentY-1)){
                squaresTemp[i].classList.add("consider");
            }
        }else if (shipsToPlace[0]==="Submarine" || shipsToPlace[0]==="Destroyer"){
            if((firstIndexInner === currentX && secondIndexInner === currentY+1) || (firstIndexInner === currentX && secondIndexInner === currentY-1)){
                squaresTemp[i].classList.add("consider");
            }
        }else if (shipsToPlace[0]==="Patrol Boat"){
            if(firstIndexInner === currentX && secondIndexInner === currentY+1){
                squaresTemp[i].classList.add("consider");
            }
        }
    }
    checkConsiders();
    var cellsBeingConsidered = document.querySelectorAll(".consider");
    for(i=0; i<cellsBeingConsidered.length; i++){
        if (isItOk === "Yes"){
            cellsBeingConsidered[i].style.backgroundColor = "#636161f5";
        }else{
            cellsBeingConsidered[i].style.backgroundColor = "red";
            this.style.backgroundColor = "red";
            this.removeEventListener("click", logSquares);
        }
    }
}


var phantomOut = function(event){
    var cellsBeingConsidered = document.querySelectorAll(".consider");
        for(i=0; i<cellsBeingConsidered.length; i++){
            cellsBeingConsidered[i].classList.remove("consider");
            var cdn = [cellsBeingConsidered[i].getAttribute("rowNo"), cellsBeingConsidered[i].getAttribute("colNo")];
            var rowIndex = parseInt(cdn[0]);
            var colIndex = parseInt(cdn[1]);
            if(playerTurn === "One"){
                for(j=0; j<boardTallyOne.length; j++){
                    if(j === rowIndex){
                        for (k=0; k<boardTallyOne[j].length; k++){
                            if(k === colIndex){
                                if (boardTallyOne[j][k] !== null){
                                    cellsBeingConsidered[i].style.backgroundColor = "#ffeb3b"
                                }else{
                                    cellsBeingConsidered[i].style.backgroundColor = "#b4ebf5c2";
                                }
                            }
                        }
                    }
                }
            }else if (playerTurn === "Two"){
                for(j=0; j<boardTallyTwo.length; j++){
                    if(j === rowIndex){
                        for (k=0; k<boardTallyTwo[j].length; k++){
                            if(k === colIndex){
                                if (boardTallyTwo[j][k] !== null){
                                    cellsBeingConsidered[i].style.backgroundColor = "#ffeb3b"
                                }else{
                                    cellsBeingConsidered[i].style.backgroundColor = "#fbdda5d9";
                                }
                            }
                        }
                    }
                }
            }
        }
        clearTruthCheck();
    }

var fillShipsArray = function(){
    //fill shipsToPlace array with the ship names
    for(i=0; i<ships.length; i++){
        shipsToPlace.push(ships[i].ShipName);
    };
};


//Positioning of boats per player
var fixBoats = function(){
    if(shipsToPlace.length === 0){
        if(playerTurn === "One"){
            playerTurn = "Two";
            console.log("player turn is now " + playerTurn);
            clearGameBoardRow();
            startCollatePlayerPositions();
        }else{
            playerTurn = "One";
            clearDisplay();
            clearGameBoardRow();
            addParaToDisplay("MAN YOUR STATIONS!!!!!");
            showBoth();
            gamePlay();
        };
    }else{
        for(j=0; j<ships.length; j++){
        if (shipsToPlace[0] === ships[j].ShipName){
            clearDisplay();
            shipLetter = ships[j].Sign;
            var shipTemp = document.querySelector(".ship"+j);
            shipTemp.style.border = "5px solid red";
            addParaToDisplay("Let's place your " + ships[j].ShipName);

            var cellsUnset = document.querySelectorAll(".unset");
            for(i=0; i<cellsUnset.length; i++){
                cellsUnset[i].addEventListener("click", logSquares);
                cellsUnset[i].addEventListener("mouseover", phantom);
                cellsUnset[i].addEventListener("mouseout", phantomOut);
            }
        }
    }
}
}

var logSquares = function(event){
    clearDisplay();
    var cellsBeingConsidered = document.querySelectorAll(".consider");
        for(i=0; i<cellsBeingConsidered.length; i++){
            cellsBeingConsidered[i].classList.remove("consider", "unset");
            cellsBeingConsidered[i].classList.add("set");
            cellsBeingConsidered[i].style.backgroundColor = "#ffeb3b";
            var cdn = [cellsBeingConsidered[i].getAttribute("rowNo"), cellsBeingConsidered[i].getAttribute("colNo")];
            var rowIndex = parseInt(cdn[0]);
            var colIndex = parseInt(cdn[1]);

            if (playerTurn === "One"){
                for (j=0; j<boardTallyOne.length; j++){
                    if(j === rowIndex){
                        for(k=0; k<boardTallyOne[i].length; k++){
                            if (k === colIndex){
                                for(l=0; l<ships.length; l++){
                                    if (shipsToPlace[0] === ships[l].ShipName){
                                        boardTallyOne[j][k] = ships[l].Sign;
                                    }
                                }
                            }
                        }
                    }
                }
            }else if (playerTurn === "Two"){
                for (j=0; j<boardTallyTwo.length; j++){
                    if(j === rowIndex){
                        for(k=0; k<boardTallyTwo[i].length; k++){
                            if (k === colIndex){
                                for(l=0; l<ships.length; l++){
                                    if (shipsToPlace[0] === ships[l].ShipName){
                                        boardTallyTwo[j][k] = ships[l].Sign;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        shipsToPlace.shift();
        fixBoats();
    }

//Player 1 VS Player 2
var gamePlay = function(){
    if (playerTurn === "One"){
        clearDisplay();
        addParaToDisplay(playerOneName + "'s turn! Click on a cell on your opponent's grid.");
        var squares = document.querySelectorAll("#mainboard0 .game-square");
        for (i=0;i<squares.length; i++){
            squares[i].removeEventListener("click", checkClick);
        }
        var squares1 = document.querySelectorAll("#mainboard1 .game-square");
        for (i=0; i<squares1.length; i++){
            var cdn = [squares1[i].getAttribute("rowNo"), squares1[i].getAttribute("colNo")];
            var firstIndex = cdn[0];
            var secondIndex = cdn[1];

            for (j=0;j<boardTallyTwo.length; j++){
            if (j === parseInt(firstIndex)) {
                for (k=0; k<boardTallyTwo[j].length; k++) {
                    if (k === parseInt(secondIndex)) {
                        if(boardTallyTwo[j][k] === "C" || boardTallyTwo[j][k] === "B" || boardTallyTwo[j][k] === "S" || boardTallyTwo[j][k] === "D" || boardTallyTwo[j][k] === "P" || boardTallyTwo[j][k] === null){
                            squares1[i].addEventListener("click", checkClick);
                        }
                    }
                }
            }
        }
    }
    }else if(playerTurn === "Two"){
        clearDisplay();
        addParaToDisplay(playerTwoName + "'s turn! Click on a cell on your opponent's grid.");
        var squares = document.querySelectorAll("#mainboard1 .game-square");
        for (i=0;i<squares.length; i++){
            squares[i].removeEventListener("click", checkClick);
        }
        var squares1 = document.querySelectorAll("#mainboard0 .game-square");
        for (i=0; i<squares1.length; i++){
            var cdn = [squares1[i].getAttribute("rowNo"), squares1[i].getAttribute("colNo")];
            var firstIndex = cdn[0];
            var secondIndex = cdn[1];
            for (j=0;j<boardTallyOne.length; j++){
            if (j === parseInt(firstIndex)) {
                for (k=0; k<boardTallyOne[j].length; k++) {
                    if (k === parseInt(secondIndex)) {
                        if(boardTallyOne[j][k] === "C" || boardTallyOne[j][k] === "B" || boardTallyOne[j][k] === "S" || boardTallyOne[j][k] === "D" || boardTallyOne[j][k] === "P" || boardTallyOne[j][k] === null){
                            squares1[i].addEventListener("click", checkClick);
                        }
                        }
                    }
                }
            }
        }
    }
}

var checkClick = function(){
    var cdn = [this.getAttribute("rowNo"), this.getAttribute("colNo")];
    var firstIndex = cdn[0];
    var secondIndex = cdn[1];
    if(playerTurn === "One"){
        for (i=0; i<boardTallyTwo.length; i++) {
            if (i === parseInt(firstIndex)) {
                for (j=0; j<boardTallyTwo[i].length; j++) {
                    if (j === parseInt(secondIndex)) {
                        if(boardTallyTwo[i][j] === "X" || boardTallyTwo[i][j] === "H"){
                            this.removeEventListener("click", checkClick);
                        }else if (boardTallyTwo[i][j] === "C" || boardTallyTwo[i][j] === "B" || boardTallyTwo[i][j] === "S" || boardTallyTwo[i][j] === "D" || boardTallyTwo[i][j] === "P"){
                            this.style.backgroundImage = "url('pics/boom.png')";
                            this.style.backgroundColor = "red";
                            boom.play();
                            totalToDestroy2--;
                            if(boardTallyTwo[i][j] === "C"){
                                carrierCells2--;
                                boardTallyTwo[i][j] = "H";
                            }else if(boardTallyTwo[i][j] === "B"){
                                battleshipCells2--;
                                boardTallyTwo[i][j] = "H";
                            }else if(boardTallyTwo[i][j] === "S"){
                                submarineCells2--;
                                boardTallyTwo[i][j] = "H";
                            }else if(boardTallyTwo[i][j] === "D"){
                                destroyerCells2--;
                                boardTallyTwo[i][j] = "H";
                            }else if(boardTallyTwo[i][j] === "P"){
                                patrolCells2--;
                                boardTallyTwo[i][j] = "H";
                            }
                        }else if (boardTallyTwo[i][j] === null){
                            boardTallyTwo[i][j] = "X";
                            this.style.backgroundImage = "url('pics/splash.png')";
                            splash.play();
                    }
                }
            }
        }
    }
    }else if(playerTurn === "Two"){
        for (i=0; i<boardTallyOne.length; i++) {
            if (i === parseInt(firstIndex)) {
                for (j=0; j<boardTallyOne[i].length; j++) {
                    if (j === parseInt(secondIndex)) {
                        if(boardTallyOne[i][j] === "X" || boardTallyOne[i][j] === "H"){
                            this.removeEventListener("click", checkClick);
                        }else if (boardTallyOne[i][j] === "C" || boardTallyOne[i][j] === "B" || boardTallyOne[i][j] === "S" || boardTallyOne[i][j] === "D" || boardTallyOne[i][j] === "P"){
                            this.style.backgroundImage = "url('pics/boom.png')";
                            this.style.backgroundColor = "red";
                            boom.play();
                            totalToDestroy--;
                            if(boardTallyOne[i][j] === "C"){
                                carrierCells--;
                                boardTallyOne[i][j] = "H";
                            }else if(boardTallyOne[i][j] === "B"){
                                battleshipCells--;
                                boardTallyOne[i][j] = "H";
                            }else if(boardTallyOne[i][j] === "S"){
                                submarineCells--;
                                boardTallyOne[i][j] = "H";
                            }else if(boardTallyOne[i][j] === "D"){
                                destroyerCells--;
                                boardTallyOne[i][j] = "H";
                            }else if(boardTallyOne[i][j] === "P"){
                                patrolCells--;
                                boardTallyOne[i][j] = "H";
                            }
                        }else if (boardTallyOne[i][j] === null){
                            boardTallyOne[i][j] = "X";
                            this.style.backgroundImage = "url('pics/splash.png')";
                            splash.play();
                    }
                }
            }
        }
    }
}
    checkForSink();
}

var checkForSink = function(){
    if(playerTurn === "One"){
        playerTurn = "Two";
        if(totalToDestroy2 === 0){
            alert("VICTORY FOR " + playerOneName + "!!!");
            cheer.play();
            playerOneWinCount++;
            clearDisplay();
            body.style.backgroundImage = "url('pics/sea.JPG')";
            replayGame();
        }else if(totalToDestroy2 > 0){
            if(carrierCells2 === 0){
                alert("You have sunk Admiral " + playerTwoName + "'s CARRIER!");
                carrierCells2 = "Sunk";
            }else if(battleshipCells2 === 0){
                alert("You have sunk Admiral " + playerTwoName + "'s BATTLESHIP!");
                battleshipCells2 = "Sunk";
            }else if(submarineCells2 === 0){
                alert("You have sunk Admiral " + playerTwoName + "'s SUBMARINE!");
                submarineCells2 = "Sunk";
            }else if(destroyerCells2 === 0){
                alert("You have sunk Admiral " + playerTwoName + "'s DESTROYER!");
                destroyerCells2 = "Sunk";
            }else if(patrolCells2 === 0){
                alert("You have sunk Admiral " + playerTwoName + "'s PATROL BOAT!");
                patrolCells2 = "Sunk";
            }
            gamePlay();
        }
    }else if (playerTurn === "Two"){
        playerTurn = "One";
        if(totalToDestroy === 0){
            alert("VICTORY FOR " + playerTwoName + "!!!");
            cheer.play();
            playerTwoWinCount++;
            clearDisplay();
            body.style.backgroundImage = "url('pics/sea.JPG')";
            replayGame();
        }else if (totalToDestroy > 0){
            if(carrierCells === 0){
                alert("You have sunk Admiral " + playerOneName + "'s CARRIER!");
                carrierCells = "Sunk";
            }else if(battleshipCells === 0){
                alert("You have sunk Admiral " + playerOneName + "'s BATTLESHIP!");
                battleshipCells = "Sunk";
            }else if(submarineCells === 0){
                alert("You have sunk Admiral " + playerOneName + "'s SUBMARINE!");
                submarineCells = "Sunk";
            }else if(destroyerCells === 0){
                alert("You have sunk Admiral " + playerOneName + "'s DESTROYER!");
                destroyerCells = "Sunk";
            }else if(patrolCells === 0){
                alert("You have sunk Admiral " + playerOneName + "'s PATROL BOAT!");
                patrolCells = "Sunk";
            }
            gamePlay();
        }
    }
}

//global functions to use elsewhere
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
            squaresTemp[i].addEventListener("mouseover", getCellCoordinates);
            squaresTemp[i].addEventListener("click", getCellCoordinates);
            squaresTemp[i].addEventListener("click",logSquares);
            squaresTemp[i].addEventListener("mouseover", phantom);
            squaresTemp[i].addEventListener("mouseout", phantomOut);
        };
};

var removeSquaresEvent = function() {
    var squaresTemp = document.querySelectorAll(".game-square");
        for (i=0; i<squaresTemp.length; i++){
            squaresTemp[i].removeEventListener("click",legality);
        };
};

var clearGameBoardRow = function(){
    while (gameBoardRow.firstChild){
        gameBoardRow.removeChild(gameBoardRow.firstChild);
    };
};

var getCellCoordinates = function(event){
    var cdn = [this.getAttribute("rowNo"), this.getAttribute("colNo")];
    var firstIndex = parseInt(cdn[0]);
    var secondIndex = parseInt(cdn[1]);
    currentX = firstIndex;
    currentY = secondIndex;
}

var checkConsiders = function(){
    var cellsBeingConsidered = document.querySelectorAll(".consider");

    for (j=0; j<ships.length; j++){
        if(shipsToPlace[0] === ships[j].ShipName && parseInt(cellsBeingConsidered.length) === ships[j].Squares){
            for(i=0; i<cellsBeingConsidered.length; i++){
                var cdn = [cellsBeingConsidered[i].getAttribute("rowNo"), cellsBeingConsidered[i].getAttribute("colNo")];
                var rowIndex = parseInt(cdn[0]);
                var colIndex = parseInt(cdn[1]);

                if (playerTurn === "One"){
                    if(boardTallyOne[rowIndex][colIndex] === null){
                        truthCheck.push("true");
                    }else{
                        truthCheck.push("false");
                    }
                }else if (playerTurn === "Two"){
                    if(boardTallyTwo[rowIndex][colIndex] === null){
                        truthCheck.push("true");
                    }else{
                        truthCheck.push("false");
                    }
                }
            }
            if(truthCheck.includes("false")){
                isItOk = "No";
            }else{
                isItOk = "Yes";
            }
        }else if (shipsToPlace[0] === ships[j].ShipName && parseInt(cellsBeingConsidered.length) !== ships[j].Squares){
            isItOk = "No";
        }
    }
}

var clearTruthCheck = function(){
    truthCheck = [];
    isItOk = null;
}

var replayGame = function(){
    playerTurn = "One";
    clearGameBoardRow();
    clearDisplay();
    addParaToDisplay("Would you like to play another round?");

    boardTallyOne = [
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

    boardTallyTwo = [
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

    var buttonRepeat = document.createElement("button");
    buttonRepeat.setAttribute("id", "start2");
    buttonRepeat.textContent = "Let's go again!"
    buttonRepeat.addEventListener("click", startCollatePlayerPositions);
    gameBoardRow.appendChild(buttonRepeat);
}

document.addEventListener('DOMContentLoaded', function( event ){
  // now that the dom is ready, set the button click
  startButton.addEventListener('click', startGame);
});