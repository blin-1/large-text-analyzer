import fs from 'fs';

class LargeTextAnalyzer {

	static delimiters = /\s|[^a-zA-Z]|[0-9]/

	/**
	 * @param {any} delimiters
	 */
	set delimiters (delimiters) {
         this.delimiters = delimiters;
    }

	static getWordMap (fileName) {
		
		let map = new Map()
		return new Promise((resolve) => {
				let stream = fs.createReadStream(fileName)
				stream.on("readable", () => {
							let character, word = ''	
							while (character = stream.read(1)) {
								if (this.delimiters.test(character)){
									if (word){
										word = word.toLowerCase()
										let count = map.get(word)
										count = count? ++count : 1
										map.set(word,count)
										word = ''
									}
								}else {
									word += character
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