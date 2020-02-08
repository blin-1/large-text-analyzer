import lta from './modules/large-text-analyzer.mjs'

// Optionally set the word delimiters:
// (Default is /\s|[^a-zA-Z]|[0-9]/ but that doesn't begin to touch unicode of course)    
// lta.delimiters = /\s/             

count('./test/data/testdata.txt')

async function count (fileName) {
	let wordMap = await lta.getWordMap(fileName);
	console.log(`Vocabulary consists of ${wordMap.size} words`)
	console.log(wordMap);
}