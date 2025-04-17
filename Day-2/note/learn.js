const cheerio = require('cheerio')
async function fetch() {
    const $ = await cheerio.fromURL(https://www.css.cnrs.fr/scrape/nobel_all.html);
    
    console.log($)
}
fetch ()