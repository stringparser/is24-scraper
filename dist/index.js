"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var util_1 = require("./util");
var constants_1 = require("./constants");
function is24ListScraper(listURL, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var res, html, $page, $listItems, nextPageBaseURL, previousPageBaseURL, maxItems, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(listURL)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.text()];
                case 2:
                    html = _a.sent();
                    $page = cheerio_1.default.load(html);
                    $listItems = $page('.result-list__listing');
                    nextPageBaseURL = $page('a[data-nav-next-page]').attr('href');
                    previousPageBaseURL = $page('a[data-nav-previous-page]').attr('href');
                    maxItems = options
                        ? options.itemsPerPage
                        : $listItems.length;
                    return [4 /*yield*/, Promise.all($listItems
                            .toArray()
                            .slice(0, maxItems)
                            .map(function (el) { return __awaiter(_this, void 0, void 0, function () {
                            var $el, url, res, html, $itemPage;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        $el = cheerio_1.default(el).find('a[data-go-to-expose-id]');
                                        url = "" + constants_1.baseURL + $el.attr('href');
                                        return [4 /*yield*/, node_fetch_1.default(url)];
                                    case 1:
                                        res = _a.sent();
                                        return [4 /*yield*/, res.text()];
                                    case 2:
                                        html = _a.sent();
                                        $itemPage = cheerio_1.default.load(html);
                                        return [2 /*return*/, getItemProps(url, $itemPage, html)];
                                }
                            });
                        }); }))];
                case 3:
                    items = _a.sent();
                    return [2 /*return*/, {
                            items: items,
                            paging: {
                                next: nextPageBaseURL
                                    ? "" + constants_1.baseURL + nextPageBaseURL
                                    : '',
                                previous: previousPageBaseURL
                                    ? "" + constants_1.baseURL + previousPageBaseURL
                                    : '',
                                pageSize: $listItems.length,
                                pageNumber: $page('#pageSelection select option[selected]').index(),
                                numberOfPages: $page('#pageSelection select option').length
                            }
                        }];
            }
        });
    });
}
function getItemProps(url, $page, html) {
    return {
        url: url,
        type: util_1.getText($page('.is24qa-typ').first()),
        tags: $page('.criteriagroup.boolean-listing')
            .text()
            .trim()
            .split(/[\/ ]+/),
        title: util_1.getText($page('#expose-title')),
        floor: util_1.getText($page('.is24qa-etage')),
        rooms: util_1.getText($page('.is24qa-zi')),
        images: $page('#is24-main .sp-slide img.sp-image')
            .toArray()
            .map(function (el) { return cheerio_1.default(el).attr('data-src'); }),
        private: /["\s]+privateOffer[":\s]+true/.test(html),
        deposit: util_1.getText($page('.is24qa-kaution-o-genossenschaftsanteile')),
        address: util_1.getText($page('.address-block').first()),
        coldRent: util_1.getText($page('.is24qa-kaltmiete').first()),
        totalRent: util_1.getText($page('.is24qa-gesamtmiete')),
        bathRooms: util_1.getText($page('.is24qa-badezimmer')),
        description: util_1.getText($page('.is24qa-objektbeschreibung')),
        livingSpace: util_1.getText($page('.is24qa-flaeche')),
        heatingType: util_1.getText($page('.is24qa-heizungsart')),
        utilityCosts: util_1.getText($page('.is24qa-nebenkosten')),
        heatingCosts: util_1.getText($page('.is24qa-heizkosten')),
        aparmentState: util_1.getText($page('.is24qa-objektzustand.grid-item')),
        availableFrom: util_1.getText($page('.is24qa-bezugsfrei-ab')),
        amenitiesQuality: util_1.getText($page('.is24qa-qualitaet-der-ausstattung')),
        mainEnergySourceType: util_1.getText($page('.is24qa-wesentliche-energietraeger')),
    };
}
exports.default = is24ListScraper;
//# sourceMappingURL=index.js.map