import cheerio from 'cheerio';

export function scrapeData(html: String, selector: String) {
  const $ = cheerio.load(html);

  return $(selector).map(function(){
    return $(this).text()
  }).toArray()
}

console.log(scrapeData(`<ul id="fruits">
<li class="apple">Apple</li>
<li class="orange">Orange</li>
<li class="pear">Pear</li>
</ul>`, 'li'));
