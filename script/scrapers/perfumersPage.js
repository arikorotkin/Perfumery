const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const {sleep} = require('../utils')

const scrapeFragranticaPerfumePage = require('./perfumePage')

puppeteer.use(StealthPlugin())

async function scrapeFragranticaPerfumerPage(url) {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(url)

        await page.waitForXPath('//*[@id="main-content"]/div[1]/div[1]/div/h1')
        await page.waitForXPath('//*[@id="brands"]/div/div[3]/div/div[1]/div[3]/h3/a')

        // name
        const perfumerName = await page.$eval('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-8.large-9.cell > div > h1', perfumerNameEl => {
            return perfumerNameEl.textContent.trim()
        })

        // perfumes
        const perfumeUrls = await page.$$eval('#brands > div > div > div > div:nth-child(1) > div.flex-child-auto > h3 > a', arrOfPerfumeEls => {
            return arrOfPerfumeEls.map(perfume => 'https://www.fragrantica.com' + perfume.getAttribute('href'))
        })

        await browser.close()

        const perfumes = []

        const scrapePerfumes = async () => {
            for (let i = 0; i < perfumeUrls.length; i++) {
                await sleep(10500)
                const newPerfumeAndBrands = await scrapeFragranticaPerfumePage(perfumeUrls[i])
                perfumes.push(newPerfumeAndBrands)
            }
        }
        
        await scrapePerfumes()

        return [{
            name: perfumerName,
            url
        }, perfumes]
    } catch (err) {
        console.error(err)
    }
}

async function scrapeFragranticaPerfumersPage() {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto('https://www.fragrantica.com/noses/')

        await page.waitForXPath('//*[@id="main-content"]/div[1]/div[1]/div/div[5]/a')

        const perfumerPageUrls = await page.$$eval('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-8.large-9.cell > div > div > a', arrOfPerfumers => {
            return arrOfPerfumers.map(perfumerEl => 'https://www.fragrantica.com' + perfumerEl.getAttribute('href'))
        })

        await browser.close()

        console.log('scraping perfumers, perfumes, and brands...')

        const scrapedPerfumersPerfumesAndBrands = []

        const scrapePerfumers = async () => {
            for (let i = 0; i < perfumerPageUrls.length; i++) {
                await sleep(12500)
                const newPerfumerPerfumesAndBrands = await scrapeFragranticaPerfumerPage(perfumerPageUrls[i])
                scrapedPerfumersPerfumesAndBrands.push(newPerfumerPerfumesAndBrands)
            }
        }

        await scrapePerfumers()

        return scrapedPerfumersPerfumesAndBrands
    } catch (err) {
        console.error(err)
        if (typeof browser !== 'undefined') {
            await browser.close()
        }
    }
}

module.exports = {
    scrapeFragranticaPerfumersPage,
    scrapeFragranticaPerfumerPage
}

// test url 1
// scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Adriana_Medina-Baez.html')

// test url 2
// scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Ashley_Eden_Kessler.html')

// test url 3
// scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Beatrice_Aguilar.html')
