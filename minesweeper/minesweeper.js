document.addEventListener('DOMContentLoaded', startGame);

// Global bindings.
////////////////////////////////////////////////////////
var board = {
  cells: []
};





// Build game board.
// INPUT: Takes a number.
// OUTPUT: Builds the game board.
////////////////////////////////////////////////////////
function buildBoard(n) {
  // Create the game board.
  for(let r = 0; r <= n; r ++) {
    for(let c = 0; c <= n; c ++) {
      // Build the cell.
      buildCell(r, c);
    }
  }
}





// Build the game board cells.
// INPUT: NULL.
// OUTPUT: Object.
////////////////////////////////////////////////////////
function buildCell(r, c) {
  let obj = {
    row: r,
    col: c,
    isMine: Math.floor(Math.random() * Math.floor(2)),
    isMarked: false,
    hidden: true
  };
  return board.cells.push(obj);
}




// Start game function.
// INPUT: NULL.
// OUTPUT: Displays the board game.
////////////////////////////////////////////////////////
function startGame() {

  buildBoard(3);

  // Loop through board cells objects.
  for(let i = 0; i < board.cells.length; i ++) {

    // For each cell add a property surroundingMines with the returned value of the countSurroundingMines method.
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  // Clear DOM for reset.
  document.querySelector('.board').innerHTML = "";

  // Remove the reset button.
  document.getElementById("resetBtn").style.display = "none";

  // Don't remove this function call: it makes the game work!
  lib.initBoard();

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
}





// Define this function to look for a win condition:
// INPUT: NULL.
// OUTPUT: Boolean.
////////////////////////////////////////////////////////
function checkForWin () {

  // Check to status of all the cells.
  for(let i = 0; i < board.cells.length; i ++) {
    // Check board status
    checkBoardStatus(i);
  }
}





// Check game board status.
// INPUT: Number.
// OUTPUT: NULL.
////////////////////////////////////////////////////////
function checkBoardStatus(n) {
  // Checks to determine a win:
  // All mines are marked.
  // All non-mine cells are not hidden.

  let b = document.getElementsByClassName('board')[0];
  let cells = b.childNodes;
  let cellsFoundArr = [];
  let notMine = 0;
  let cellsFound = false;

  let mineArr = document.querySelectorAll('.mine');
  let isMarked = false;
  let markCount = 0;

  // Loop through all cells.
  cells.forEach(function(val) {

    // Get all mines
    if(val.classList.contains("mine")) {
      
      // Check if mines are marked. 
      if(val.classList.contains("marked")) markCount ++;
      
    } else {

      // Increament the none mine count.
      notMine ++;

      // Check if cells have been found.
      if(val.classList.contains('hidden')) {

      // Cell remains to be found.

      } else {

        // Cell has been found.
        // Add to cellsFoundArr.
        cellsFoundArr.push(val);

      }

    }
  });

  console.log("Number of non-mines: " + notMine + "\n Number of found cells: " + cellsFoundArr.length);


  
  // Check if all mines are marked.
  // mineArr.forEach(function(val) {
  //   if(val.classList.contains("marked")) markCount ++;
  // })

  // Check if all mines have been marked.
  if(markCount === mineArr.length) isMarked = true;

  // Check if all cells that are not mines is equal to notMine.
  if(notMine === cellsFoundArr.length) cellsFound = true;

  // console.log("Mines: " + mineArr.length + "\n" + "Marked Mines:" + markCount + "\n" + "All mines marked: " + isMarked);

  // Check if all cells the are not mines have been revealed & isMarked is true.
  if(isMarked && cellsFound) {

    // Player has won.
    lib.displayMessage('You win!');

    // Reset board.
    board.cells.length = 0;
    console.log(board.cells);

    // Show reset button.
    document.getElementById("resetBtn").style.display = "block";

  } else {

    // Continue playing.
    return;
  }
}





// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

// INPUT: Object.
// OUTPUT: Number.
////////////////////////////////////////////////////////
function countSurroundingMines (cell) {
  // Get the surrounding cell count for every cell.
  let surrounding = lib.getSurroundingCells(cell.row, cell.col);

  // Counter binding to track mine cells.
  let count = 0;

  // Loop through each surrounding cell counting the number of mines.
  for(let i = 0; i < surrounding.length; i ++) {

    // Check if the current cell is a mine.
    if(surrounding[i].isMine === true | surrounding[i].isMine === 1 ) {

      // Increase the counter.
      count ++;
    } 
  }

  // Return to counter.
  return count;
}