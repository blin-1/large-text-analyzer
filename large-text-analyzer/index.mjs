import lta from './modules/large-text-analyzer.mjs'

count('./test/data/testdata.txt')

async function count (fileName) {
	let wordMap = await lta.getWordMap(fileName);
	console.log(`Vocabulary consists of ${wordMap.size} words`)
	console.log(wordMap);
}
 
