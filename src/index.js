const puppeteer = require('puppeteer-core');

const email = 'mail.projects@yandex.ru';
const pass = '1QazxsW@';

(async () => {
    try {
        const browser = await puppeteer.launch({
            product: 'firefox',
            headless: false,
            args: [
                '-wait-for-browser',
            ],
            // executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe',
        });
        const page = await browser.newPage();
        await page.goto('https://www.tiktok.com');
        await page.waitForSelector('.login-button')
        await page.click('.login-button')
        await page.waitForSelector('.login-frame-container')
        await page.waitForSelector('iframe[src^="https://www.tiktok.com/login/"]')
        await page.evaluate(() => {
            const authFrame = document.querySelector('iframe[src^="https://www.tiktok.com/login/"]').contentWindow

            const authFrameMutationCallback = (mutationsList, observer) => {
                mutationsList.forEach((mutation) => {
                    console.log('mutation', mutation)

                    if (mutation.addedNodes.length) {
                        if (mutation.addedNodes[0].classList.contains('channel-item-wrapper-')) {
                            mutation.addedNodes[0].click()
                        }

                        if (false) {
                            observer.disconnect();
                        }
                    }
                })
            }
            const observer = new MutationObserver(authFrameMutationCallback);

            observer.observe(authFrame.document, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        });

        // await browser.close();
    } catch (e) {
        console.error(e)
        await browser.close();
    }
})();
