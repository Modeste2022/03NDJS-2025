const cheerio = require('cheerio')
async function fetch () {

	const $ = await cheerio.fromURL('https://www.css.cnrs.fr/scrape/nobel_all.html');

    const data = $.extract({
	releases: [
		{
     		 // First, we select individual release sections.
     		 selector: 'tbody',
      		// Then, we extract the release date, name, and notes from each section.
      		 value: {
        	// Selectors are executed within the context of the selected element.
        	 name: 'tr',
      		},
	    }
	]
     });

console.log(data)

}
fetch()
