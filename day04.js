const fs = require('fs')

const parse = (input) => {
	const split = input.split(' ')
	let tmp = []
	split.forEach((spl) => tmp.push(...(spl.split('\n'))))
	const out = {}
	tmp.forEach((i) => {
		if (!i) { return }
		const spl = i.split(':')
		out[spl[0]] = spl[1]
	})
	return out
}

let numValid = 0
const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

fs.readFileSync('./input/day04.input').toString().split('\n\n').forEach((passport) => {
	const parsed = parse(passport)

	// cid is optional, so remove anyway
	delete parsed.cid

	// passport must have all keys
	if (Object.keys(parsed).length !== requiredKeys.length)
		return

	// validation for byr, iyr, eyr
	let valid = true
	const lims = [['byr', 1920, 2002], ['iyr', 2010, 2020], ['eyr', 2020, 2030]]
	lims.forEach(([key, lower, upper]) => {
		const val = Number(parsed[key])
		if (!(val >= lower && val <= upper))
			valid = false
	})

	if (!valid) return

	// validation for hgt
	const {hgt} = parsed
	const unit = hgt.includes('cm') ? 'cm' : 'in'
	const num = Number(hgt.replace(unit, ''))
	valid = unit === 'cm' ? (num >= 150 && num <= 193) : (num >= 59 && num <= 76)

	if (!valid) return

	// validation for hcl
	let {hcl} = parsed
	if (hcl[0] !== '#') return
	hcl = hcl.replace('#', '0x')
	try {
		Number(hcl)
	} catch (_) {
		console.log(`NaN`, hcl)
		return
	}

	// validation for ecl
	valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(parsed.ecl)
	if (!valid) return

	// validation for pid
	valid = parsed.pid.length === 9 && !isNaN(parsed.pid)
	if (!valid) return

	// if it makes it this far, it's valid
	numValid++
})

console.log(numValid)
