import * as cheerio from "cheerio";
import * as fs from "fs"

async function fetch() {
  try {
    const $ = await cheerio.fromURL('https://www.css.cnrs.fr/scrape/nobel_all.html');
    
    // Récupération de toutes les lignes du tableau
    const rows = [];
    $("table tr").each((index, element) => {
      rows.push($(element))
    });

	const prix_nobels = []
	rows.shift()
	rows.forEach(element => {
		const columns = $(element).find("td")

		const annee = $(columns[0]).text().trim()
		const physique = $(columns[1]).text().trim()
		const chimie = $(columns[2]).text().trim()
		const psychologie_medecine = $(columns[3]).text().trim()
		const paix = $(columns[4]).text().trim()
		const economie = $(columns[5]).text().trim()

		prix_nobels.push(
			{
				annee,
				physique,
				chimie,
				psychologie_medecine,
				paix,
				economie
			}
		)
	});

	fs.writeFileSync('prix_nobel.json', JSON.stringify(prix_nobels, null, 2), 'utf-8')
	console.log('Enregistrement réussi !')
  } catch (error) {
    console.error("❌ Erreur :", error.message);
  }
}

fetch();