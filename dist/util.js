"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getText($el) {
    return $el.text().trim().replace(/^[+ ]+/, '');
}
exports.getText = getText;
function getNumber($el) {
    return parseFloat(getText($el).trim()
        .replace(/([€+]|^inkl\.?|m²)/g, '')
        .replace(/\s+/g, '')
        .replace(/[.]+/g, '')
        .replace(/,/g, '.')) || 0;
}
exports.getNumber = getNumber;
function getQuarter(html) {
    try {
        var jsonString = (/{"zipCode"[^}]+}/m.exec(html) || [''])[0];
        return JSON.parse(jsonString).quarter.match(/\(([^))]+)/).pop();
    }
    catch (_a) {
        return {};
    }
}
exports.getQuarter = getQuarter;
//# sourceMappingURL=util.js.map