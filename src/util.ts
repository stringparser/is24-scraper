
export function getText($el: Cheerio) {
  return $el.text().trim().replace(/^[+ ]+/, '');
}
