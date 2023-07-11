import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { writeFile, existsSync, mkdirSync } from 'fs';

export const urlsToSitemap = async (
  URL: string,
  allURLs: string[],
): Promise<void> => {
  const links = allURLs.map((url) => {
    return { url, changefreq: 'monthly', priority: 0.5 };
  });
  const stream = new SitemapStream({ hostname: URL });
  const data = await streamToPromise(Readable.from(links).pipe(stream));
  return saveFile(data.toString());
};

const saveFile = (
  sitemapString: string,
  dirPath = 'sitemap/',
  filePath = 'sitemap.xml',
): void => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }
  return writeFile(dirPath + filePath, sitemapString, (err) => {
    if (err) throw err;

    console.info(
      'Success🎉: Saved the sitemap in ' +
        dirPath +
        filePath +
        ', please check it✅',
    );
  });
};
