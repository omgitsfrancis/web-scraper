import cheerio from "cheerio";

export function scrape(
  html: String,
  selector: String,
  attribute: String = ""
) {
  const $ = cheerio.load(html);

  return $(selector)
    .map(function () {
      if (attribute.length > 0) {
        return $(this).attr(attribute);
      } else {
        return $(this).text();
      }
    })
    .toArray();
}
