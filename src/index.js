const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            product: 'firefox',
            headless: true,
        });
        const page = await browser.newPage();
        await page.goto('https://tiktok.com');
        await page.waitForSelector('.login-button')
        await page.click('.login-button')
        await page.waitForSelector('.iframe-container')
        const authFrame = await page.frames().find(frame => frame.url().includes('login'))

        if (authFrame) {
            authFrame.evaluate(() => {

            })
        }

        page.on('console', (msg) => {
            console.log('PAGE LOG:', page.frames().find(frame => frame.url().includes('login')))
        });

        // await browser.close();
    } catch (e) {
        console.error(e)
        await browser.close();
    }
})();