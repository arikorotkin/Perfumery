const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

async function scrapeFragranticaNotePage(url) {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(url)

        await page.waitForXPath('//*[@id="main-content"]/div[1]/div[1]/div/div[1]/div/div[1]/h1')
        await page.waitForXPath('//*[@id="main-content"]/div[1]/div[1]/div/div[1]/div/div[1]/h3/b')

        // name
        const noteName = await page.$eval('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-8.large-9.cell > div > div:nth-child(1) > div > div:nth-child(1) > h1', noteNameEl => {
            return noteNameEl.textContent
        })

        // category
        const noteCategory = await page.$eval('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-8.large-9.cell > div > div:nth-child(1) > div > div:nth-child(1) > h3 > b', noteCategoryEl => {
            return noteCategoryEl.textContent
        })

        await browser.close()

        console.log(`The name of the note is ${noteName}. It is in the ${noteCategory} category.`)

        return 0
        /* return {
            name,
            category,
            description,
            url
        }
        */
    } catch (err) {
        console.error(err)
        await browser.close()
    }
}

// async function scrapeFragranticaNotesPage() {

// }

// test url 1
scrapeFragranticaNotePage('https://www.fragrantica.com/notes/Bergamot-75.html')

// test url 2
scrapeFragranticaNotePage('https://www.fragrantica.com/notes/Bearberry-344.html')

// test url 3
scrapeFragranticaNotePage('https://www.fragrantica.com/notes/White-Ginger-Lily-739.html')