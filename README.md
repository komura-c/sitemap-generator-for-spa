## @komura-c/sitemap-generator-for-spa

this is sample sitemap generator for spa by scraping with puppeteer

compatible node.js version: >=16.13.0

## Usage

1. Clone repo
```bash
git clone https://github.com/komura-c/sitemap-generator-for-spa.git
```

2. Install deps
```bash
npm i
```

3. Please customize `src/index.ts`

```ts
import { generateSitemap } from './script/generateSitemap';

// Please customize targetURL and waitSec(wait page rendering seconds)
const targetURL = 'https://example.com';
const waitSec = 6;

void generateSitemap(targetURL, waitSec);
```

4. Run
```bash
npm run start
```

## LICENSE

[MIT](http://opensource.org/licenses/mit-license.php)
