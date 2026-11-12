import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Link previews (iMessage, Slack, LinkedIn) read the HTML and never run the
// app, so every page would show the home page's card. For each page that
// needs its own card, this writes a copy of the built index.html at
// dist/<route>/index.html with that page's title, description and image.
// Netlify and Vercel both serve a real file before the catch-all rewrite to
// /index.html, and the copy boots the same app, so the page itself is unchanged.
const SITE = 'https://tristianwalker.com';
const PAGES = [
  {
    route: 'guest',
    title: 'Tristian Walker, Podcast Guest Sheet',
    description: 'Bio, topics and booking for your show. Tristian Walker teaches small business owners to hand everyday chores to AI.',
    image: '/brand/share-card-guest.jpg',
  },
];

function routeShareCards() {
  let outDir = 'dist';
  return {
    name: 'route-share-cards',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const base = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      for (const p of PAGES) {
        const url = `${SITE}/${p.route}`;
        const set = (html, re, value, label) => {
          if (!re.test(html)) throw new Error(`route-share-cards: ${label} not found in index.html`);
          return html.replace(re, value);
        };
        let html = base;
        html = set(html, /<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`, '<title>');
        for (const [attr, key, value] of [
          ['name', 'description', p.description],
          ['property', 'og:url', url],
          ['property', 'og:title', p.title],
          ['property', 'og:description', p.description],
          ['property', 'og:image', SITE + p.image],
          ['name', 'twitter:title', p.title],
          ['name', 'twitter:description', p.description],
          ['name', 'twitter:image', SITE + p.image],
        ]) {
          const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*" \\/>`);
          html = set(html, re, `<meta ${attr}="${key}" content="${esc(value)}" />`, key);
        }
        const dir = path.join(outDir, p.route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), routeShareCards()],
  server: {
    port: 5173,
    open: false,
  },
});
