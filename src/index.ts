
import $ from 'cheerio';
import fetch from 'node-fetch';

import { getText } from './util';
import { baseURL } from './constants';
import { ResultList } from './types';

async function is24ListScraper(
  listURL: string,
  options?: {
    itemsPerPage: number;
  },
): Promise<ResultList> {

  const res = await fetch(listURL);
  const html = await res.text();
  const $page = $.load(html);
  const $listItems = $page('.result-list__listing');
  const nextPageBaseURL = $page('a[data-nav-next-page]').attr('href');
  const previousPageBaseURL = $page('a[data-nav-previous-page]').attr('href');

  const maxItems = options
    ? options.itemsPerPage
    : $listItems.length
  ;

  const items = await Promise.all(
    $listItems
      .toArray()
      .slice(0, maxItems)
      .map(async (el) => {
        const $el = $(el).find('a[data-go-to-expose-id]');
        const url = `${baseURL}${$el.attr('href')}`;
        const res = await fetch(url);
        const html = await res.text();
        const $itemPage = $.load(html);
        return getItemProps(url, $itemPage, html);
      })
  );

  return {
    items,
    paging: {
      next: nextPageBaseURL
        ? `${baseURL}${nextPageBaseURL}`
        : ''
      ,
      previous: previousPageBaseURL
        ? `${baseURL}${previousPageBaseURL}`
        : ''
      ,
    }
  };
}

function getItemProps(url: string, $page: CheerioStatic, html: string) {
  return {
    url,
    type: getText($page('.is24qa-typ').first()),
    tags: $page('.criteriagroup.boolean-listing')
      .text()
      .trim()
      .split(/[\/ ]+/)
    ,
    title: getText($page('#expose-title')),
    floor: getText($page('.is24qa-etage')),
    rooms: getText($page('.is24qa-zi')),
    images: $page('#is24-main .sp-slide img.sp-image')
      .toArray()
      .map(el => $(el).attr('data-src'))
    ,
    private: /[" ]+privateOffer[": ]+true/.test(html),
    deposit: getText($page('.is24qa-kaution-o-genossenschaftsanteile-label').next()),
    address: getText($page('.address-block').first()),
    coldRent: getText($page('.is24qa-kaltmiete').first()),
    totalRent: getText($page('.is24qa-gesamtmiete')),
    bathRooms: getText($page('.is24qa-badezimmer')),
    description: getText($page('.is24qa-objektbeschreibung')),
    livingSpace: getText($page('.is24qa-flaeche')),
    heatingType: getText($page('.is24qa-heizungsart')),
    utilityCosts: getText($page('.is24qa-nebenkosten')),
    heatingCosts: getText($page('.is24qa-heizkosten')),
    aparmentState: getText($page('.is24qa-objektzustand.grid-item')),
    availableFrom: getText($page('.is24qa-bezugsfrei-ab')),
    amenitiesQuality: getText($page('.is24qa-qualitaet-der-ausstattung')),
    mainEnergySourceType: getText($page('.is24qa-wesentliche-energietraeger')),
  };
}

export default is24ListScraper;
