const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// const cheerio = require('cheerio')
// const axios = require('axios')
// const axiosCookieJarSupport = require('axios-cookiejar-support').default
// const tough = require('tough-cookie')

// axios.defaults.baseUrl = ''

// axiosCookieJarSupport(axios)

// const cookieJar = new tough.CookieJar()

puppeteer.use(StealthPlugin())

async function scrapeFragranticaPerfumePage(url) {
    try {
        const browser = await puppeteer.launch({ headless: true})
        const page = await browser.newPage()
        await page.goto(url)

        // top notes
        await page.waitForXPath('//*[@id="pyramid"]/div[1]/div/div[2]/div[3]/div')

        const topNoteChildren = await page.$$eval('#pyramid > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div > div', arrOfChildren => {
            return arrOfChildren.map(child => child.textContent)
        })

        console.log(`The number of top notes are ${topNoteChildren.reduce((accum, cur, ind, arr) => {
            if (ind === arr.length - 1) {
                return accum + 'and ' + cur
            }
            return accum + cur + ', '
        }, '')}.`)

        await browser.close()
    } catch (err) {
        console.error(err)
        await browser.close()
    }
}

scrapeFragranticaPerfumePage('https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-Zebra-Collector-64627.html')

// scrapeFragranticaPerfumePage('https://www.fragrantica.com/perfume/Xerjoff/Lira-11801.html')

