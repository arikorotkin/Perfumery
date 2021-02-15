const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

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

        console.log(`${perfumerName}: There are ${perfumeUrls.length} perfumes on the page. The first is found at ${perfumeUrls[0]}; the last is found at ${perfumeUrls[perfumeUrls.length - 1]}.`)

        await browser.close()

        return {
            name: perfumerName,
            perfumes: perfumeUrls,
            url
        }
    } catch (err) {
        await browser.close()
        console.error(err)
    }
}

// test url 1
scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Adriana_Medina-Baez.html')

// test url 2
scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Ashley_Eden_Kessler.html')

// test url 3
scrapeFragranticaPerfumerPage('https://www.fragrantica.com/noses/Beatrice_Aguilar.html')
