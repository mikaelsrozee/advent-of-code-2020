const fs = require('fs')

const input = fs.readFileSync('./input/day02.input').toString()

const parse = (line) => {
	// split line
	let [lims, char, password] = line.split(' ')

	// get char
	char = char.replace(':', '')
	
	// get lims
	const [min, max] = lims.split('-')
	lims = {min, max}

	return {password, char, lims}
}

const countOccurences = async () => {
	const spl = input.split('\n')
	let out = 0
	spl.forEach((line) => {
		// safety
		if (!line) return

		// parse
		const {password, char, lims: {min, max}} = parse(line)

		// count occurences 
		const regex = new RegExp(char, 'g')
		const match = password.match(regex) || []
		const numOccurences = match.length

		if (numOccurences >= min && numOccurences <= max) {
			out++
		}
	})
	console.log(out)
}


const newPassPolicy = async () => {
	const spl = input.split('\n')
	let out = 0
	spl.forEach((line) => {
		// safety
		if (!line) return

		// parse
		let {password, char, lims: {min, max}} = parse(line)

		min = Number(min) - 1
		max = Number(max) - 1

		const firstChar = password[min] || null
		const secondChar = password[max] || null

		const firstMatch = firstChar === char
		const secondMatch = secondChar === char


		// count occurences 
		const isValid = (firstChar, secondChar) => {
			if (firstChar && secondChar) {
				if (firstMatch && !secondMatch) {
					return true
				} else if (!firstMatch && secondMatch) {
					return true
				} else {
					return false
				}
			}
		}

		const valid = isValid(firstChar, secondChar)

		if (valid) out++

	})
	console.log(out)
}

newPassPolicy()
