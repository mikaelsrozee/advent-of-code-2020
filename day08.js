const fs = require('fs')

const input = fs.readFileSync('./input/day08.input').toString().split('\n').map((line) => line.split(' ')).map(([code, num]) => [code, Number(num)])

function wouldTerminate(instructionSet) {
	let i = 0
	let accumulator = 0
	const ranInstructions = []
	while (true) {
		if (i > instructionSet.length - 1) {
			return {terminates: true, accumulator}
		}

		const [code, num] = instructionSet[i]

		// program will break if an instruction has already been ran
		if (ranInstructions.includes(i)) {
			return {terminates: false, accumulator}
		} else {
			ranInstructions.push(i)
		}

		switch (code) {
			case 'acc':
				accumulator += num
				i++
				break
			case 'jmp':
				i += num
				break
			case 'nop':
				i++
				break
			default:
				console.log(`[ERROR] Unexpected code "${code}`)
				break
		}
	}
}

function main(i) {
	const tmp = input

	console.log(i)

	if (tmp[i][0] === 'jmp') {
		tmp[i][0] = 'nop'
	} else if (tmp[i][0] === 'nop') {
		tmp[i][0] = 'jmp'
	}

	out = wouldTerminate(tmp)
	console.log(out)
	return out
}

let i = input.length - 1
while (true) {
	const {terminates, accumulator} = main(i)

	if (terminates) {
		console.log(accumulator)
		break
	} else {
		i--
	}
}
