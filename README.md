## @komura-c/sitemap-generator-for-spa

this is sample sitemap generator for spa by scraping with puppeteer

## Usage

```bash
git clone https://github.com/komura-c/sitemap-generator-for-spa.git
```

In src/index.ts

```js
import generateSitemap from './script/generateSitemap';
void generateSitemap('https://example.com', 6); // two args are targetURL, and time(seconds) for wait page rendering
```

```bash
npm run start
```

## LICENSE

[MIT](http://opensource.org/licenses/mit-license.php)
