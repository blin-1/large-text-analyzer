import lta from './modules/large-text-analyzer.mjs'

// OPTIONALLY override the word delimiters - this RegEx is the default one:

lta.delimiters = /\s|[^a-zA-Z]|[0-9]/ 

// OPTIONALLY override the processWord(word) function to be executed for each word - 
// this here is the default - counts unique word occurences 
// NOTE "this.map" - this is the result map, that gets returned at the end of the stream

lta.processWord = function (word){           		
		word = word.toLowerCase()		
		let count = this.map.get(word)
		count = count? ++count : 1
		this.map.set(word,count)
}

// Define async block:
async function processFile (fileName) {
	let vocabulary = await lta.processWords(fileName);
	console.log(`Vocabulary consists of ${vocabulary.size} words`)
	console.log(vocabulary);
}

// And execute it.
processFile('./test/data/testdata.txt')