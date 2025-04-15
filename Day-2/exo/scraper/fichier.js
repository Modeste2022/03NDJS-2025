const https = require('https');
const cheerio = require('cheerio');

const url = 'https://fr.wikipedia.org/wiki/Prix_Nobel_de_physique';

https.get(url, (res) => {
  let html = '';

  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    try {
      const $ = cheerio.load(html);

      const table = $('table.wikitable').first(); // Prend le premier tableau wikitable

      if (!table.length) {
        throw new Error('Tableau non trouvé');
      }

      const headers = [];
      $('th', table).each((i, el) => {
        headers.push($(el).text().trim());
      });

      const results = [];
      $('tbody tr', table).each((i, row) => {
        const rowData = {};
        $(row).find('td').each((j, cell) => {
          const header = headers[j] || `Colonne_${j}`;
          rowData[header] = $(cell).text().trim();
        });
        if (Object.keys(rowData).length > 0) {
          results.push(rowData);
        }
      });

      console.log(results); // Affiche les données extraites

    } catch (err) {
      console.error('Erreur:', err.message);
    }
  });
}).on('error', err => {
  console.error('Erreur HTTP:', err);
});
