const puppeteer = require('puppeteer-core');
const {
    delay,
} = require('./helpers');

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
            // executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe', // windows
            executablePath: '/Applications/Firefox.app/Contents/MacOS/firefox-bin', // mac
        });
        const page = await browser.newPage();
        await page.goto('https://www.tiktok.com');
        await page.waitForSelector('.cookie-banner')
        await page.waitForSelector('.button-wrapper button')
        await delay(1204)
        await page.click('.button-wrapper button')
        await page.waitForSelector('.login-button')
        await delay(1204)
        await page.click('.login-button')
        await page.waitForSelector('.login-frame-container')
        await page.waitForSelector('iframe[src^="https://www.tiktok.com/login/"]')
        await page.evaluate(async () => {
            const authFrame = document.querySelector('iframe[src^="https://www.tiktok.com/login/"]').onload(() => {
                const authFrame = document.querySelector('iframe[src^="https://www.tiktok.com/login/"]').contentWindow
                const authMethods = authFrame.document.querySelectorAll('div[class^="channel-item-wrapper-"]')

                console.log('authMethods', authMethods)

                if (authMethods.length) {
                    authMethods[1].click();
                } else  {
                    const authFrameMutationCallback = (mutationsList, observer) => {
                        mutationsList.forEach((mutation) => {
                            if (mutation.addedNodes.length) {
                                console.log('mutation.addedNodes[0]', mutation.addedNodes[0])

                                if (mutation.addedNodes[0].classList?.contains('channel-item-wrapper-')) {
                                    mutation.addedNodes[0].click();
                                    observer.disconnect();
                                }
                            }
                        })
                    }
                    const observer = new MutationObserver(authFrameMutationCallback);

                    observer.observe(authFrame.document.body, {
                        characterData: true,
                        attributes: true,
                        childList: true,
                        subtree: true,
                    });
                }
            })
        })

        // await browser.close();
    } catch (e) {
        console.error(e)
        await browser.close();
    }
})();
