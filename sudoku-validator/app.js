// checkDigits function receives an array
// it checks whether or not the array contains strictly the sequency from 0 to 9
const checkDigits = arr => {
	const length = arr.length;
	if (length !== 9) return false;

	if (arr.includes(0)) return false;

	for (let index = 1; index < 10; index++) {
		if (!arr.includes(index)) return false;
	}

	return true;
};

// checkDigits function receives 2 integers and a 9 by 9, 2-D array
// the column intervals used in the validSolution function are: 0-2, 3-5, 6-8
// if all 3 by 3 boxes are valid, according to the checkDigits function, the output is true, otherwise it is false
const checkBoxes = (columnStart, columnEnd, board) => {
	let result = [];
	let box = [];
	for (let i = 0; i < 9; i++) {
		for (let j = columnStart; j < columnEnd + 1; j++) {
			box.push(board[i][j]); // fix the board
		}
		if (i == 2 || i == 5 || i == 8) {
			result.push(checkDigits(box));
			box = [];
		}
	}

	return result.every(item => item === true);
};

function validSolution(board) {
	const boardLength = board.length;

	// check horizontally
	board.forEach(row => {
		if (!checkDigits(row)) return false;
	});

	// check vertically
	for (let index = 0; index < boardLength; index++) {
		const column = board.reduce((verticalArray, row) => {
			verticalArray.push(row[index]);
			return verticalArray;
		}, []);
		if (!checkDigits(column)) return false;
	}

	// check 3 by 3 boxes
	for (let index = 0; index < 7; index += 3) {
		if (!checkBoxes(index, index + 2, board)) return false;
	}

	return true;
}

const arrTrue = [
	[5, 3, 4, 6, 7, 8, 9, 1, 2],
	[6, 7, 2, 1, 9, 5, 3, 4, 8],
	[1, 9, 8, 3, 4, 2, 5, 6, 7],
	[8, 5, 9, 7, 6, 1, 4, 2, 3],
	[4, 2, 6, 8, 5, 3, 7, 9, 1],
	[7, 1, 3, 9, 2, 4, 8, 5, 6],
	[9, 6, 1, 5, 3, 7, 2, 8, 4],
	[2, 8, 7, 4, 1, 9, 6, 3, 5],
	[3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const arrFalse = [
	[5, 3, 4, 6, 7, 8, 9, 1, 2],
	[6, 7, 2, 1, 9, 0, 3, 4, 8],
	[1, 0, 0, 3, 4, 2, 5, 6, 0],
	[8, 5, 9, 7, 6, 1, 0, 2, 0],
	[4, 2, 6, 8, 5, 3, 7, 9, 1],
	[7, 1, 3, 9, 2, 4, 8, 5, 6],
	[9, 0, 1, 5, 3, 7, 2, 1, 4],
	[2, 8, 7, 4, 1, 9, 6, 3, 5],
	[3, 0, 0, 4, 8, 1, 1, 7, 9],
];

validSolution(arrFalse) // => false
validSolution(arrTrue) // => true
