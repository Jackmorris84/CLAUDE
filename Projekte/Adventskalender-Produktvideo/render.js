const { chromium } = require('playwright');
(async () => {
  const [k, n] = process.argv.slice(2).map(Number);
  const dir = __dirname + '/frames/';
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  await p.goto('http://localhost:8765/reel.html');
  await p.waitForFunction(() => window.ready, null, { timeout: 30000 });
  const total = await p.evaluate(() => DURATION * FPS);
  for (let i = k; i < total; i += n) {
    await p.evaluate(t => seek(t), i / 30);
    await p.screenshot({ path: dir + 'f' + String(i).padStart(4, '0') + '.jpg', type: 'jpeg', quality: 96 });
  }
  await b.close();
})();
