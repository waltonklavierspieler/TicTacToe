
const createPlayer = (botOrNot, marker) => {
  return { botOrNot, marker };
};

function gameBoard(gridSize = 3) {
  let totalGrids = gridSize * gridSize;
  let board = [];
  const newBoard = () => {
	  board = [];
	  for (let i = 0; i < totalGrids; i++) {
	  board.push(undefined);
	}
  }

  /*vv for DOM interaction vv
  let gridParent = document.querySelector('.container');
  gridParent.innerHTML = '';
  for (let i = 0; i < totalGrids; i++) {
    let newSquare = document.createElement('div');
    newSquare.setAttribute('class', 'gridSquare');
    newSquare.setAttribute('id', i);
    gridParent.appendChild(newSquare);
  }*/

  const getBoard = () => board;

  const chooseSquare = (square, player) => {
	if (isNaN(parseInt(square))) {
		alert('Must input an integer 0-8');
		let nextAttempt = prompt('Pick an APPROPRIATE square.');
		chooseSquare(nextAttempt, player);
	}
    if (square < 0 || square > 8) {
		alert('Choose a square number between 0 and 8!');
		let nextAttempt = prompt('Pick an APPROPRIATE square.');
		chooseSquare(nextAttempt, player);
    } else {
    if (board[square] === undefined) {
		board[square] = player.marker;
    } else {
		alert('Pick an open square!');
		let nextAttempt = prompt('Pick an APPROPRIATE square.');
		chooseSquare(nextAttempt, player);
    }}
  };
  const getLength = () => totalGrids;
  const printBoard = () => {
    console.log('Current board:' + board);
  };

  return { newBoard, getBoard, chooseSquare, printBoard, getLength };
}

function gameController() {
  const board = gameBoard();
  const playerOneName = prompt('Player One, what is your name?');
  const playerTwoName = prompt('Player Two, what is your name?');
  const players = [createPlayer(playerOneName, 'X'), createPlayer(playerTwoName, 'O')];
  let turns = 0;
  let _gameOver = false;
  let currentPlayer = players[0];
  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const winCheck = () => {
	let boardData = board.getBoard();
	let topRow = [boardData[0], boardData[1], boardData[2]];
	let midRow = [boardData[3], boardData[4], boardData[5]];
	let bottomRow = [boardData[6], boardData[7], boardData[8]];
	let leftColumn = [boardData[0], boardData[3], boardData[6]];
	let midColumn = [boardData[1], boardData[4], boardData[7]];
	let rightColumn = [boardData[2], boardData[5], boardData[8]];
	let diagOne = [boardData[0], boardData[4], boardData[8]];
	let diagTwo = [boardData[6], boardData[4], boardData[2]];
    let allPossibilities = [
		topRow, midRow, bottomRow,
		leftColumn, midColumn, rightColumn,
		diagOne, diagTwo
    ];
	//something happening with the logic below here; fix
	allPossibilities.forEach(test => {
		if (test.every((square) => square === 'X')) {
			console.log('We have a winner!: ' + currentPlayer.marker);
			gameOver = true;
		}
		if (test.every((square) => square === 'O')) {
			console.log('We have a winner!: ' + currentPlayer.marker);
			_gameOver = true;
		}
    });
  }

  const resetGame = () => {
	_gameOver = false;
    console.log('Game over!');
    // Add code to reset the board and other game-related data here
	let newGameCheck = confirm("Want to play again?");
	console.log(newGameCheck);
	if(newGameCheck) {
		board.newBoard();
		turns = 0;
		currentPlayer = players[0];
		console.log('New game!');
	} else {
		console.log('Ok, goodbye!');
	}
  }

  // play a round;
  const playRound = () => {
    let square = prompt(currentPlayer.botOrNot + ' is up! Choose a square number to place a ' + currentPlayer.marker);
    // place marker
    board.chooseSquare(square, currentPlayer);
    // check for win-state
    winCheck();
    // change player
	if (_gameOver) {
		resetGame();
		return;
	}
    switchPlayer();
	//display board
	board.printBoard();
	//increase turn counter
	turns++;
	if(turns === board.getLength()) {
		console.log('Draw!');
		resetGame();
	}
  };

  return {
    playRound,
    getCurrentPlayer,
    resetGame,
	turns
  };
}
