import fs from 'fs';

process.on('unhandledRejection', (reason) => {
    console.log('LargeTextAnalyzer ERROR: ' + reason);
});

class LargeTextAnalyzer {

	static getWordMap (fileName) {
		
		let map = new Map()
		return new Promise((resolve) => {
				let stream = fs.createReadStream(fileName)
				stream.on("readable", () => {
							let char, word = '', delimiter = /\s|[^a-zA-Z]/ 	// anything but a letter
							while (char = stream.read(1)) {
								if (delimiter.test(char)){
									if (word){
										word = word.toLowerCase()
										let count = map.get(word)
										if (count){
											count++
										}else{
											count = 1
										}
										map.set(word,count)
										word = ''
									}
								}else {
									word += char
								}
							}
				})
				stream.on("end", () => {
					resolve(new Map([...map].sort()))
				})
			})
	}
	
}

export default LargeTextAnalyzer;