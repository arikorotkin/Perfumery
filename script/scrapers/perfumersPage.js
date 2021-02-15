const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

// test url 1
// scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Adriana_Medina-Baez.html')

// test url 2
// scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Ashley_Eden_Kessler.html')

// test url 3
// scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Beatrice_Aguilar.html')
