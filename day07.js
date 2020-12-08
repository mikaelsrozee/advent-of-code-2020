const fs = require('fs')

const adjacencyList = new Map()
const addAdj = (key, val, num) => {
	if (adjacencyList.has(key)) {
		adjacencyList.set(key, new Set([[val, num], ...adjacencyList.get(key)]))
	} else {
		adjacencyList.set(key, new Set([[val, num]]))
	}
}

fs.readFileSync('./input/day07.input').toString().split('\n').map((line) => line.split('contain')).forEach((line) => {
	const key = line[0].replace(/bag(s)?/g, '').replace('  ', '')

	// Safety
	if (!key)
		return

	// parse string
	let str = line[1].replace('.', '').replace(/bag(s)?/g, '')
	str = str.substring(1, str.length - 1).split(' , ').map((val) => {
		if (val === 'no other') return null

		return [Number(val[0]), val.substring(2, val.length)]
	})

	// if contains nothing, ignore
	if (!str[0]) {
		addAdj(key, null)
	} else {
		// convert to adjacency list 
		str.forEach(([num, item]) => addAdj(key, item, num))
	}	
})

// DFS
function search(key) {
	const visited = new Set()
	const dfs = (node) => {
		if (!node) return 0

		visited.add(node)
		let count
		for (let [neighbour, num] of adjacencyList.get(node)) {
			if (!num) num = 0
			if (!visited.has(neighbour)) {
				count = 1 + (num * dfs(neighbour))
			}
		}
		return count || 0
	}
	const count = dfs(key) - 1
	return {found: visited.has('shiny gold'), count}
}
/*
let count = 0
adjacencyList.forEach((_, key) => {
	const {found} = search(key)
	if (found) count++
})
console.log(count - 1)
*/

const {count} = search('shiny gold')
console.log({count})
