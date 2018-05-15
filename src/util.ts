
export function getText($el: Cheerio) {
  return $el.text().trim().replace(/^[+ ]+/, '');
}

export function getNumber($el: Cheerio) {
  return parseFloat(getText($el).trim()
    .replace(/([€+]|^inkl\.?|m²)/g, '')
    .replace(/\s+/g, '')
    .replace(/[.]+/g, '')
    .replace(/,/g, '.')
  ) || 0;
}

export function getQuarter(html: string) {
  try {
    const jsonString = (/{"zipCode"[^}]+}/m.exec(html) || [''])[0];
    return JSON.parse(jsonString).quarter.match(/\(([^))]+)/).pop();
  } catch {
    return {};
  }
}
