import fs from 'fs';

class LargeTextAnalyzer {

	static map = new Map();
	static delimiters = /\s|[^a-zA-Z]|[0-9]/
	static processWord = function (word) {									
			word = word.toLowerCase()
			let count = this.map.get(word)
			count = count? ++count : 1
			this.map.set(word,count)
	} 

	/**
	 * @param {any} delimiters
	 */
	set delimiters (delimiters) {
         this.delimiters = delimiters
	}
	
	/**
	 * The function to be executed for each word
	 * @param {function} processWord
	 */
	set processWord (processWord) {
         this.processWord = processWord
    }

	static processWords (fileName) {
		
		return new Promise((resolve) => {
				let stream = fs.createReadStream(fileName)
				stream.on("readable", () => {
							let character, word = ''	
							while (character = stream.read(1)) {
								if (this.delimiters.test(character)){
									if (word) {
										this.processWord(word)
										word = ''
									}
								}else {
									word += character
								}
							}
				})
				stream.on("end", () => {
					resolve(new Map([...this.map].sort()))
				})
			})
	}
	
}

export default LargeTextAnalyzer;