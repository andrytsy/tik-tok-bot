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
            args: ['-wait-for-browser'],
            executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe', // windows
            // executablePath: '/Applications/Firefox.app/Contents/MacOS/firefox-bin', // mac
        });

        const page = await browser.newPage();

        await page.goto('https://www.tiktok.com/login/phone-or-email/email');
        await page.waitForSelector('input[type="text"]');
        await page.focus('input[type="text"]')
        await page.keyboard.type('mail.projects@yandex.ru')
        await page.waitForSelector('input[type="password"]');
        await page.focus('input[type="password"]')
        await page.keyboard.type('1QazxsW@')
        await page.click('button[type="submit"]');

    } catch (e) {

    }
})()
