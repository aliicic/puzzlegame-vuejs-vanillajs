const mainBoard = document.createElement("div");
mainBoard.classList.add('main-board')
const body = document.body;
const header = document.getElementsByTagName('header')[0]

// document.appendChild(header)

const controllerBox = document.createElement("div");

controllerBox.innerHTML = `rows : <input type="text" id="rows" value="4"> column: <input id="column" type ="text" value="4">
<button onClick="startGame()" >start</button>
`;

const table = document.createElement("table");
mainBoard.appendChild(table);

body.appendChild(mainBoard);
header.appendChild(controllerBox);


let rows;
let column;
let mainArray = []; //? x*y
let moves =0
init();

function init() {
    // rows = 4;
    // column = 4;
    startGame()

}
function startGame() {
  let uniqueArrayTest = [];
  let  arrayHasNumberBeenUsed=[];
    let randomNumber = 0;
  moves = 0
  rows = document.getElementById("rows").value;
  column = document.getElementById("column").value;
 //debugger
  for (let i = 0; i < rows; i++) {
    mainArray[i] = [];
  }
  for (let i = 0; i < rows * column; i++) {
    arrayHasNumberBeenUsed[i] = 0;
  }

  for (var i = 0; i < rows * column; i++) {
    randomNumber = Math.floor(Math.random() * rows * column);
    // If our random numer is unique, add it to the board.
    if (arrayHasNumberBeenUsed[randomNumber] == 0) {
      arrayHasNumberBeenUsed[randomNumber] = 1;
      uniqueArrayTest.push(randomNumber);
    } // Our number is not unique. Try again.
    else {
      i--;
    }
  }

  let count = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < column; j++) {
      mainArray[i][j] = uniqueArrayTest[count];

      count++;
    }
  }
  showTable();
};

function showTable() {
  var outputString = "";
  for (var i = 0; i < rows; i++) {
    outputString += "<tr>";
    for (var j = 0; j < column; j++) {
      if (mainArray[i][j] == 0) {
        outputString += '<td class="blank">  </td>';
      } else {
        outputString +=
          '<td class="tile" onclick="moveThisTile(' +
          i +
          ", " +
          j +
          ')">' +
          mainArray[i][j] +
          "</td>";
      }
    }
    outputString += "</tr>";
  } 

  table.innerHTML = outputString;
}

function moveThisTile(tableRow, tableColumn) {
  if (
    checkIfMoveable(tableRow, tableColumn, "up") ||
    checkIfMoveable(tableRow, tableColumn, "down") ||
    checkIfMoveable(tableRow, tableColumn, "left") ||
    checkIfMoveable(tableRow, tableColumn, "right")
  ) {
    incrementMoves();
  } else {
    alert("ERROR: Cannot move tile!\nTile must be next to a blank space.");
  }

  if (checkIfWinner()) {
    alert("Congratulations! You solved the puzzle in " + moves + " moves.");
    startNewGame();
  }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction) {
  // The following variables an if else statements
  // make the function work for all directions.
  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up") {
    rowOffset = -1;
  } else if (direction == "down") {
    rowOffset = 1;
  } else if (direction == "left") {
    columnOffset = -1;
  } else if (direction == "right") {
    columnOffset = 1;
  }

  // Check if the tile can be moved to the spot.
  // If it can, move it and return true.
  if (
    rowCoordinate + rowOffset >= 0 &&
    columnCoordinate + columnOffset >= 0 &&
    rowCoordinate + rowOffset < rows &&
    columnCoordinate + columnOffset < column
  ) {
    if (
      mainArray[rowCoordinate + rowOffset][
        columnCoordinate + columnOffset
      ] == 0
    ) {
      mainArray[rowCoordinate + rowOffset][
        columnCoordinate + columnOffset
      ] = mainArray[rowCoordinate][columnCoordinate];
      mainArray[rowCoordinate][columnCoordinate] = 0;
      showTable();
      return true;
    }
  }
  return false;
}

function checkIfWinner() {
  var count = 1;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < column; j++) {
      if (mainArray[i][j] != count) {
        if (!(count === rows * column && mainArray[i][j] === 0)) {
          return false;
        }
      }
      count++;
    }
  }

  return true;
}

function incrementMoves() {
  moves++;
//   if (textMoves) {
//     // This is nessessary.
//     textMoves.innerHTML = moves;
//   }
}


//? styles

// const tiles = document.getElementsByTagName("td");
// console.log([...tiles]);

// [...tiles].map((item) => {
//     item.style.background = "red";
//     item.style.padding = "20px"
// });

// document.getElementById('blank').style.background = 'white'
