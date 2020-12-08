const fs = require('fs')

const set = new Set()
set.values()

const sum = (set) => {
	let ret = 0
	for (const val of set.values()) {
		ret += val
	}
	return ret
}

const sets = []
const previous = []
fs.readFileSync('./input/day09.input').toString().split('\n').forEach((line) => {
	// if array is too small, populate
	if (previous.length < 25) {
		previous.push(Number(line))
		return
	}

	sets.forEach((set) => {
		set.add(Number(line))

		if (sum(set) === 1639024365) {
			const arr = Array.from(set).sort((a, b) => a - b)
			const min = arr[0]
			const max = arr[arr.length - 1]
			console.log(min + max)
		}
	})

	sets.push(new Set([Number(line)]))

	/* // part 1
	// sum all numbers, print val if it's not in those sums
	const sums = []
	previous.forEach((a) => {
		previous.forEach((b) => {
			sums.push(a + b)
		})
	})

	if (!sums.includes(Number(line))) {
		console.log(Number(line))
	}*/

	// Remove first element, push new element on the end
	previous.shift()
	previous.push(Number(line))
})
