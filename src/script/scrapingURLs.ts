import { launch, Page } from 'puppeteer';

export const scrapingURL = async (
  URL: string,
  waitSec?: number
): Promise<string[]> => {
  const browser = await launch();
  const page = await browser.newPage();

  console.info('Start Scraping: ' + URL);

  const allPageURLs = await getAllPageURLs(page, URL, waitSec ? waitSec : 3);
  await browser.close();
  return allPageURLs;
};

const getAllPageURLs = async (
  page: Page,
  URL: string,
  waitSec: number
): Promise<string[]> => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(waitSec * 1000);
  const currentPageURLs = await getCurrentPageURLs(page);
  const currentURLs = currentPageURLs.map((path) => {
    return /^(https|http):\/\//.test(path) ? URL + '/' : URL + path;
  });
  const uniqueURLs = Array.from(new Set(currentURLs));

  console.info('Found URLs: ' + uniqueURLs.toString());

  const allPageURLs = await getCurrentPageURLsRecursive(
    page,
    URL,
    uniqueURLs,
    waitSec,
    []
  );
  return Array.from(new Set(allPageURLs));
};

const getCurrentPageURLsRecursive = async (
  page: Page,
  URL: string,
  obtainedURLs: string[],
  waitSec: number,
  allPageURLs: string[],
  count?: number
): Promise<string[]> => {
  const currentCount = count ? count : 0;
  if (obtainedURLs.length === currentCount) {
    return allPageURLs?.length ? allPageURLs : obtainedURLs;
  }

  console.info('Scraping: ' + obtainedURLs[currentCount]);

  await page.goto(obtainedURLs[currentCount], {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForTimeout(waitSec * 1000);
  const currentPageURLs = await getCurrentPageURLs(page);
  const currentURLs = currentPageURLs.map((path) => {
    return /^(https|http):\/\//.test(path) ? URL : URL + path;
  });
  const uniqueURLs = Array.from(new Set(currentURLs));
  allPageURLs.concat(uniqueURLs);
  return await getCurrentPageURLsRecursive(
    page,
    URL,
    obtainedURLs,
    waitSec,
    allPageURLs,
    currentCount + 1
  );
};

const getCurrentPageURLs = async (page: Page): Promise<string[]> => {
  return await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('a'));
    return elements
      .map((element: Element) => {
        return element?.getAttribute('href');
      })
      .filter((url) => url) as string[];
  });
};
