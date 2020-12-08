const fs = require('fs')

const file = fs.readFileSync('./input/day03.input').toString().split('\n')

const getNumTrees = (slope) => {
	let numTrees = 0

	// Start in top left (0, 0)
	const currentPos = {x: 0, y: 0}

	while (currentPos.y < file.length - 1) {
		// Fix out of bounds
		if (currentPos.x > file[0].length - 1) {
			currentPos.x -= file[0].length
		}

		// Check if tree
		if (file[currentPos.y][currentPos.x] === '#') {
			numTrees++
		}

		// Increment pos
		currentPos.x += slope.x
		currentPos.y += slope.y
	}

	return numTrees
}

// Output is the product of the number of trees found on each slope
const out = [
	{x: 1, y: 1},
	{x: 3, y: 1},
	{x: 5, y: 1},
	{x: 7, y: 1},
	{x: 1, y: 2},
]
.map((slope) => getNumTrees(slope))
.reduce((acc, currentVal) => acc * currentVal, 1) 

console.log(out)

