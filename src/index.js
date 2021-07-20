const puppeteer = require('puppeteer-core');
const {
    delay,
} = require('./helpers');

const email = 'mail.projects@yandex.ru';
const pass = '1QazxsW@';
// https://www.tiktok.com/login/phone-or-email/email

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
        await page.waitForSelector('.cookie-banner');
        await page.waitForSelector('.button-wrapper button');
        await page.click('.button-wrapper button');
        await page.waitForSelector('.login-button');
        await page.click('.login-button');
        await page.waitForSelector('.login-frame-container');
        await page.waitForSelector('iframe[src^="https://www.tiktok.com/login/"]');
        await page.evaluate(async () => {
            const authFrame = document.querySelector('iframe[src^="https://www.tiktok.com/login/"]').contentWindow;

            authFrame.onload = () => {
                const observer = new MutationObserver((mutationsList, observer) => {
                    mutationsList.forEach((mutation) => {
                        if (mutation.addedNodes.length) {
                            const isTiktokApp = mutation.addedNodes[0].className.includes('tiktok-app-container-');
                            const isEmailAuth = mutation.addedNodes[0].className.includes('tiktok-web-body-');
                            const isFormContainer = mutation.addedNodes[0].className.includes('form-container-');

                            // console.log('mutation.addedNodes', mutation.addedNodes);

                            if (isTiktokApp) {
                                const authMethods = authFrame.document.querySelectorAll('div[class^="channel-item-wrapper-"]');

                                authMethods[1].click();
                            } else if (isEmailAuth) {
                                const isEmailAuthButton = authFrame.document.querySelectorAll('div[class^="title-wrapper-"] a');

                                isEmailAuthButton[0].click();
                            } else if (isFormContainer) {
                                const isPasswordInput = mutation.addedNodes[0].firstChild.className.includes('move-warning-');
                                const inputWrapper = mutation.addedNodes[0].firstChild;

                                setTimeout(() => {
                                    if (isPasswordInput) {
                                        inputWrapper.lastChild.value = '1QazxsW@';
                                    } else {
                                        inputWrapper.lastChild.value = 'mail.projects@yandex.ru';
                                    }

                                    inputWrapper.lastChild.dispatchEvent(new Event('input'));
                                    console.log('inputWrapper.lastChild', inputWrapper.lastChild);
                                }, 1000);
                            }

                            // observer.disconnect();
                        }
                    });
                });

                observer.observe(authFrame.document.body, {
                    characterData: true,
                    attributes: true,
                    childList: true,
                    subtree: true,
                });
            };
        });

        // await browser.close();
    } catch (e) {
        console.error(e);
        await browser.close();
    }
})();
