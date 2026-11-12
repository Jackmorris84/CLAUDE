// usage: node render.js <worker> <workers> [lang] [outDir] [from-to,from-to]   (needs a web server on port 8765 in this folder)
const { chromium } = require('playwright');
(async () => {
  const [k, n] = process.argv.slice(2, 4).map(Number);
  const lang = process.argv[4] || 'de';
  const dir = __dirname + '/' + (process.argv[5] || 'frames') + '/';
  const ranges = (process.argv[6] || '').split(',').filter(Boolean).map(r => r.split('-').map(Number));
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  await p.goto('http://localhost:8765/reel.html?lang=' + lang);
  await p.waitForFunction(() => window.ready, null, { timeout: 30000 });
  const total = await p.evaluate(() => DURATION * FPS);
  for (let i = k; i < total; i += n) {
    if (ranges.length && !ranges.some(([a, z]) => i >= a && i <= z)) continue;
    await p.evaluate(t => seek(t), i / 30);
    await p.screenshot({ path: dir + 'f' + String(i).padStart(4, '0') + '.jpg', type: 'jpeg', quality: 96 });
  }
  await b.close();
})();
