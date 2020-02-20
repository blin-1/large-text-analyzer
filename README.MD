# Large Text Analyzer

<p>
This ES6 module runs a user-defined function on the async stream of words and returns a map of aggregated results, in this example a word frequency count
</p>
<bold>
IMPORTANT - This uses ES6 Module Loader - You will need a very recent version of node and below v13 run it with --node-experimental-features
</bold>

<p>
<bold>
Example of usage
</bold>
</p>
<pre><code>
import lta from 'large-text-analyzer'

// OPTIONALLY override the word delimiters - this RegEx is the default one:

lta.delimiters = /\s|[^a-zA-Z]|[0-9]/ 

// OPTIONALLY override the processWord(word) function 
// to be executed for each word.
// NOTE "this.map" - this is the result map, 
// that gets returned at the end of the stream.
// It can be used to store all kinds of results
// this here is the default - counts unique 
// word occurences 

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

</code></pre>

<br>
That will produce the map of words and frequency of their use in the input text file

<br>
SAMPLE OUTPUT: 
<br>
Vocabulary consists of 2 words
<br>
Map {
  <br>
  'a' => 2,
  <br>
  'after' => 1
  <br>
  etc...
}
