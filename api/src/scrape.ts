import cheerio from 'cheerio';

export function scrapeData(html: String, selector: String) {
  const $ = cheerio.load(html);

  return $(selector).map(function(){
    return $(this).text()
  }).toArray()
}