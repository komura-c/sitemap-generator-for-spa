import { scrapingURL } from './scrapingURLs';
import { urlsToSitemap } from './urlsToSitemap';

export const generateSitemap = async (
  URL: string,
  waitSec?: number,
): Promise<void> => {
  const allURLs = await scrapingURL(URL, waitSec).catch((error) => {
    console.error(error);
  });
  if (allURLs) return urlsToSitemap(URL, allURLs);
};
