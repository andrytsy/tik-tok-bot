const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            product: 'firefox',
            headless: false,
        });
        const page = await browser.newPage();
        await page.goto('https://www.tiktok.com');
        await page.waitForSelector('.login-button')
        await page.click('.login-button')
        await page.waitForSelector('.login-frame-container')
        await page.waitForSelector('iframe[src^="https://www.tiktok.com/login/"]')

        const authFrame = await page.$('iframe[src^="https://www.tiktok.com/login/"]')
        const authFrameContent = await authFrame.contentFrame();
        await authFrameContent.waitForSelector('div[class^="channel-item-wrapper"]')
        await authFrameContent.click('div[class^="channel-item-wrapper"]')

        console.log("authFrameContent found! TikTok wins!");

        if (!authFrame) {
            console.log("Auth iFrame not found! TikTok wins!");
            process.exit(0);
        }

        // await browser.close();
    } catch (e) {
        console.error(e)
        await browser.close();
    }
})();