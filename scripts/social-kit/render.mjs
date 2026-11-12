// Renders the Tristian Walker social kit from kit.html in Chromium.
//
//   node scripts/social-kit/render.mjs            writes the finished files
//   node scripts/social-kit/render.mjs --guides   writes *-guides.png review copies
//                                                 with the platform safe areas drawn
//
// Fonts: Merriweather and Lato are fetched from Google Fonts with curl (curl
// honours the session proxy and CA bundle; Chromium does not), cached under
// .fonts/, and inlined as base64 woff2 so the render cannot silently fall back.
// Before any file is written, every face the kit uses is measured against a
// monospace baseline; if any width matches the fallback, the run refuses to bake.
// document.fonts.check() is not used because it returns true for fonts that
// never loaded.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// Playwright is installed globally in these sessions, not as a project
// dependency, so resolve it with require() (which honours NODE_PATH).
const { chromium } = createRequire(import.meta.url)('playwright');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const GUIDES = process.argv.includes('--guides');
// --only=<id> renders one format and leaves every other file untouched.
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').slice(7);
const FONT_DIR = path.join(HERE, '.fonts');
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lato:wght@400;700;900&display=block';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

function curl(url, out) {
  const args = ['-sSfL', '--max-time', '60', '-A', UA, url];
  if (out) args.push('-o', out);
  return execFileSync('curl', args, { encoding: out ? undefined : 'utf8' });
}

function fontFaces() {
  fs.mkdirSync(FONT_DIR, { recursive: true });
  const css = curl(CSS_URL);
  // Keep only the latin subset blocks; the kit's copy is plain ASCII.
  const blocks = css.split('/* ').filter(b => b.startsWith('latin */') && /url\(https:[^)]+\.woff2\)/.test(b));
  if (!blocks.length) throw new Error('No latin @font-face blocks came back from Google Fonts.');
  return blocks.map(b => {
    const url = b.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const file = path.join(FONT_DIR, path.basename(url));
    if (!fs.existsSync(file) || fs.statSync(file).size < 1000) curl(url, file);
    const b64 = fs.readFileSync(file).toString('base64');
    return '@font-face' + b.slice(b.indexOf('{')).replace(/url\([^)]+\)/, `url(data:font/woff2;base64,${b64})`);
  }).join('\n');
}

// [family, weight, style] for every face the kit actually renders.
const FACES = [
  ['Merriweather', 900, 'normal'], ['Merriweather', 700, 'normal'], ['Merriweather', 700, 'italic'],
  ['Lato', 400, 'normal'], ['Lato', 700, 'normal'],
];

const P = 'public/brand/social';
const FORMATS = [
  { id: 'share-card', out: 'public/brand/share-card.jpg', kind: 'card', w: 1200, h: 630, u: 1,
    portraitW: 520, safe: { x: 80, y: 60, w: 580, h: 510 },
    orbs: [[-340, -300, 620], [360, 360, 520], [-220, 380, 460]] },
  // The /guest page: same card, written for a podcast host deciding on a booking.
  { id: 'share-card-guest', out: 'public/brand/share-card-guest.jpg', kind: 'card', w: 1200, h: 630, u: 1,
    portraitW: 520, safe: { x: 80, y: 60, w: 580, h: 510 },
    orbs: [[-340, -300, 620], [360, 360, 520], [-220, 380, 460]],
    eyebrow: 'Podcast guest sheet', line: 'Bio, topics and booking<br>for your show.' },
  // LinkedIn personal: the round photo sits over the lower left, so the copy
  // lives right of x=560 and inside the vertical middle.
  { id: 'linkedin', out: `${P}/linkedin-banner-1584x396.jpg`, kind: 'banner', align: 'left', w: 1584, h: 396, u: 0.9, linePx: 44,
    safe: { x: 600, y: 30, w: 940, h: 336 },
    guideBoxes: [{ x: 20, y: 180, w: 280, h: 216 }],
    orbs: [[-120, -200, 640], [900, -160, 700], [1150, 120, 520]] },
  // YouTube: TV shows all 2560x1440, phones show only the 1546x423 centre.
  { id: 'youtube', out: `${P}/youtube-channel-art-2560x1440.jpg`, kind: 'banner', align: 'center', w: 2560, h: 1440, u: 1.5, linePx: 52,
    safe: { x: 507, y: 508, w: 1546, h: 423 },
    guideBoxes: [{ x: 507, y: 508, w: 1546, h: 423 }],
    orbs: [[200, 100, 1300], [1300, 500, 1400], [700, 800, 1000]] },
  // X: the avatar covers the lower left and some views trim top and bottom.
  { id: 'x', out: `${P}/x-header-1500x500.jpg`, kind: 'banner', align: 'left', w: 1500, h: 500, u: 0.95, linePx: 46,
    safe: { x: 520, y: 70, w: 900, h: 360 },
    guideBoxes: [{ x: 20, y: 300, w: 360, h: 200 }],
    orbs: [[-150, -200, 700], [800, -100, 720], [1050, 220, 520]] },
  // Facebook: phones crop the sides to roughly the centre 1110px; desktop puts
  // the profile photo low on the left. Copy stays centred inside x 300 to 1340.
  { id: 'facebook', out: `${P}/facebook-cover-1640x624.jpg`, kind: 'banner', align: 'center', w: 1640, h: 624, u: 1.1, linePx: 50,
    safe: { x: 300, y: 80, w: 1040, h: 464 },
    guideBoxes: [{ x: 265, y: 0, w: 1110, h: 624 }],
    orbs: [[-100, -220, 760], [900, -120, 760], [520, 300, 620]] },
];

// Fallback when Google Fonts is unreachable (some sessions get a 403): point
// FONTSOURCE_DIR at a folder where `npm i @fontsource/merriweather @fontsource/lato`
// ran. Same families, same weights; the fallback-width check below still runs.
function fontsourceFaces(dir) {
  const face = (pkg, fam, wt, st) => {
    const file = path.join(dir, 'node_modules/@fontsource', pkg, 'files', `${pkg}-latin-${wt}-${st}.woff2`);
    const b64 = fs.readFileSync(file).toString('base64');
    return `@font-face{font-family:'${fam}';font-style:${st};font-weight:${wt};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
  };
  return [
    face('merriweather', 'Merriweather', 400, 'normal'), face('merriweather', 'Merriweather', 700, 'normal'),
    face('merriweather', 'Merriweather', 900, 'normal'), face('merriweather', 'Merriweather', 400, 'italic'),
    face('merriweather', 'Merriweather', 700, 'italic'),
    face('lato', 'Lato', 400, 'normal'), face('lato', 'Lato', 700, 'normal'),
  ].join('\n');
}

let fontsCss;
try {
  fontsCss = fontFaces();
} catch (err) {
  if (!process.env.FONTSOURCE_DIR) throw err;
  console.log('Google Fonts unreachable, using @fontsource files from', process.env.FONTSOURCE_DIR);
  fontsCss = fontsourceFaces(process.env.FONTSOURCE_DIR);
}
const portrait = 'data:image/jpeg;base64,' +
  fs.readFileSync(path.join(ROOT, 'public/brand/tristian-portrait-new.jpg')).toString('base64');
const template = fs.readFileSync(path.join(HERE, 'kit.html'), 'utf8');

const browser = await chromium.launch();
try {
  for (const f of FORMATS.filter(x => !ONLY || x.id === ONLY)) {
    const html = template
      .replace('%%FONTS%%', () => fontsCss)
      .replace('%%PORTRAIT%%', () => portrait)
      .replace('%%FORMAT%%', () => JSON.stringify({ ...f, guides: GUIDES }));
    const page = await browser.newPage({ viewport: { width: f.w, height: f.h }, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    // Load every face explicitly, then measure it against the fallback.
    const report = await page.evaluate(async faces => {
      const sample = 'Tristian Walker teaches AI in Plain English 0123';
      const out = [];
      for (const [fam, wt, st] of faces) {
        await document.fonts.load(`${st} ${wt} 40px '${fam}'`, sample).catch(() => {});
        const m = font => { const s = document.createElement('span');
          s.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font:${st} ${wt} 40px ${font}`;
          s.textContent = sample; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w; };
        const real = m(`'${fam}', monospace`), fb = m('monospace');
        out.push({ face: `${fam} ${wt} ${st}`, real: Math.round(real), fallback: Math.round(fb), ok: Math.abs(real - fb) > 4 });
      }
      return out;
    }, FACES);
    const bad = report.filter(r => !r.ok);
    if (bad.length) throw new Error(`Refusing to bake ${f.id}: fonts did not load: ${bad.map(b => b.face).join(', ')}`);
    console.log('fonts verified:', report.map(r => `${r.face} ${r.real}px vs fallback ${r.fallback}px`).join('; '));
    // Contrast, measured on the rendered background (orbs, grain and all):
    // hide each text element, screenshot the box it occupies, and grade its
    // colour against the darkest background pixel in that box. Text under 24px
    // must reach 4.5:1; larger display text must reach 3:1.
    const targets = await page.evaluate(() => [...document.querySelectorAll('.eyebrow, .name, .line, .show, .show em')].map(el => {
      const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { sel: el.className || el.tagName.toLowerCase(), text: el.textContent.trim().slice(0, 40), color: cs.color,
        px: parseFloat(cs.fontSize), box: { x: Math.max(0, b.x), y: Math.max(0, b.y), width: b.width, height: b.height } };
    }));
    await page.addStyleTag({ content: '.eyebrow,.name,.line,.show,.show em{color:transparent!important}' });
    const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const contrast = [];
    for (const t of targets) {
      const png = (await page.screenshot({ clip: t.box })).toString('base64');
      const darkest = await page.evaluate(async b64 => {
        const img = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob());
        const cv = new OffscreenCanvas(img.width, img.height); const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0);
        const d = cx.getImageData(0, 0, img.width, img.height).data; let best = null, bs = Infinity;
        for (let i = 0; i < d.length; i += 4) { const sum = d[i] + d[i + 1] + d[i + 2]; if (sum < bs) { bs = sum; best = [d[i], d[i + 1], d[i + 2]]; } }
        return best;
      }, png);
      const fg = t.color.match(/\d+/g).slice(0, 3).map(Number);
      const ratio = (lum(darkest) + 0.05) / (lum(fg) + 0.05);
      const need = t.px < 24 ? 4.5 : 3;
      contrast.push({ ...t, ratio: Math.round(ratio * 100) / 100, need, ok: ratio >= need, bg: darkest });
    }
    await page.evaluate(() => document.querySelectorAll('style').forEach(s => { if (s.textContent.includes('transparent!important')) s.remove(); }));
    for (const c of contrast) console.log(`  ${f.id} ${c.sel} "${c.text}" ${c.px}px ${c.color} on darkest rgb(${c.bg}) = ${c.ratio}:1 (needs ${c.need})`);
    const low = contrast.filter(c => !c.ok);
    if (low.length) throw new Error(`Refusing to bake ${f.id}: contrast below bar on ${low.map(c => c.sel).join(', ')}`);
    const out = GUIDES ? path.join(HERE, '.fonts', `${f.id}-guides.png`) : path.join(ROOT, f.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await page.screenshot({ path: out, type: GUIDES ? 'png' : 'jpeg', quality: GUIDES ? undefined : 90 });
    console.log(`${f.id}: ${out} ${f.w}x${f.h} ${fs.statSync(out).size} bytes`);
    await page.close();
  }
} finally {
  await browser.close();
}
