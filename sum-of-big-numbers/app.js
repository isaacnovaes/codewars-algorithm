"use strict";

/**
 *
 * @param {Object} addend - the smallest string, transformed into an object to reduce the time complexity. It is the addend
 * @param {string[]} augend - the biggest string, transformed into an array. It is the augend
 * @returns {string} result of the sum
 */

const produceResult = (addend, augend) => {
	const sumArray = augend.reduce((sum, number, index) => {
		if (!addend[index]) {
			// for the case when there is no addend
			if (index === augend.length - 1) {
				sum.push(number);
				return sum;
			}

			if (+number > 9) {
				sum.push(number[1]);
				augend[index + 1] = (+augend[index + 1] + +number[0]).toString();
				return sum;
			}

			sum.push(number);
			return sum;
		}

		let result = (+number + +addend[index]).toString();

		if (index === augend.length - 1) {
			sum.push(result);
			return sum;
		}

		if (+result > 9) {
			sum.push(result[1]);
			augend[index + 1] = (+augend[index + 1] + +result[0]).toString();
			return sum;
		}

		sum.push(result);

		return sum;
	}, []);

	return sumArray.reverse().join("");
};

/**
 *
 * @param {string[]} firstNumberArray - the smallest array of digits
 * @param {string[]} secondNumberArray - the biggest array of digits
 * @returns {(Object.<string, string> & string[])} object from the smallest array and reversed array from the biggest array
 */
const getNumbers = (firstNumberArray, secondNumberArray) => {
	let firstNumber = {};
	let secondNumber;

	const firstNumberLength = firstNumberArray.length;
	for (
		let index = firstNumberLength - 1, iterator = 0;
		index >= 0;
		index--, iterator++
	) {
		firstNumber[iterator] = firstNumberArray[index];
	}

	secondNumber = secondNumberArray.reverse();

	return [firstNumber, secondNumber];
};

/**
 *
 * @param {string} num1 -string of digits
 * @param {string} num2 -string of digits
 * @returns {string} a string of the addition of the inputs
 */
function add(num1, num2) {
	const firstNumberContainer = num1.split("");
	const secondNumberContainer = num2.split("");

	let firstNumber;
	let secondNumber;

	if (secondNumberContainer.length >= firstNumberContainer.length) {
		[firstNumber, secondNumber] = getNumbers(
			firstNumberContainer,
			secondNumberContainer
		);
	} else {
		[firstNumber, secondNumber] = getNumbers(
			secondNumberContainer,
			firstNumberContainer
		);
	}

	return produceResult(firstNumber, secondNumber);
}
