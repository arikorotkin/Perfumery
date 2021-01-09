const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

async function scrapeFragrantica(url) {
    try {
        const browser = await puppeteer.launch({ headless: true})
        const page = await browser.newPage()
        await page.goto(url)

        // await page.waitForXPath('//*[@id="pyramid"]/div[1]/div/div[2]/div[3]/div/div[1]/div[2]/text()')

        // const firstTopNote = await page.$x('//*[@id="pyramid"]/div[1]/div/div[2]/div[3]/div/div[1]/div[2]/text()')

        // let nameOfTopNote = await page.evaluate(topNote => topNote.textContent, firstTopNote[0])

        await page.waitForXPath('//*[@id="pyramid"]/div[1]/div/div[2]/div[3]/div')

        const topNoteParent = await page.$$('#pyramid > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div')

        console.log(`The length of the parent is ${topNoteParent.length}.`)

        const topNotes = []

        for (let i = 0; i < topNoteParent.length; i++) {
            const currentTopNote = await topNoteParent[i].$eval('div:nth-child(2)', el => el.textContent)
            topNotes.push(currentTopNote)
        }

        console.log(`The number of top notes is ${topNotes.length}.`)

        const printableTopNotes = topNotes.reduce((accum, currVal) => {
            if (!accum) {
                return currVal
            }
            return accum + ', ' + currVal
        }, '')

        console.log(`The top notes are ${printableTopNotes}.`)
    } catch (err) {
        console.error(err)
    }
}

scrapeFragrantica('https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-Zebra-Collector-64627.html')