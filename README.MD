# Large Text Analyzer

<p>
This ES6 module analyzes the vocabulary of a possibly very large text, that cannot be fit into memory
</p>
<bold>
IMPORTANT - This uses ES6 Module Loader - You will need a very recent version of node and below v13 run it with --node-experimental-features
</bold>

<p>
<bold>
Example Usage
</bold>
</p>
<pre>
import lta from 'large-text-analyzer'

count('./test/data/testdata.txt')

async function count (fileName) {
	let wordMap = await lta.getWordMap(fileName);
	console.log(`Vocabulary consists of ${wordMap.size} words`)
	console.log(wordMap);
}
</pre>

<br>
It produces the map of words and frequency of their use in the input text file

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
}
