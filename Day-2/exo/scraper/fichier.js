const cheerio = require('cheerio')
async function fetch () {

	const $ = await cheerio.fromURL('https://www.css.cnrs.fr/scrape/nobel_all.html');

   const rows = $("tbody tr")
   const datas = []
   rows.map((i , row)=>{

	const data = {
		year: row[0].text,
		physique: row[1].text,
		chimie: row[2].text,
		physiologie_medecine: row[3].text,
		Litterature: row[4].text,
		Paix: row[5].text,
		Economie: row[6].text,
	}
   })

}
fetch()
