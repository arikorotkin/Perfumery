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





// let errData = {}

// async function scrapeFragranticaPerfumePage(url) {
//     try {
//         const {data} = await axios.get(url, {
//             jar: cookieJar,
//             withCredentials: true
//         })
//         console.log(`The page return type is ${typeof data}.`)
//         // const $ = cheerio.load(pageReturn)
//         // const perfumerOne = $('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-12.large-9.cell > div > div:nth-child(3) > div.grid-x.grid-padding-x.grid-padding-y.small-up-2.medium-up-4 > div:nth-child(1) > a').text();
//         // console.log(`The first perfumer is ${perfumerOne}.`)
//     } catch (err) {
//         console.error(err)
//     }
// }

// function scrapeFragranticaError() {
//     try {
//         const $ = cheerio.load(errData)
//         const perfumerOne = $('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-12.large-9.cell > div > div:nth-child(3) > div.grid-x.grid-padding-x.grid-padding-y.small-up-2.medium-up-4 > div:nth-child(1) > a').text()
//         console.log(`The first perfumer is ${perfumerOne}.`)
//     } catch (err) {
//         console.error(err)
//     }
// }

// scrapeFragranticaPerfumePage('https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-Zebra-Collector-64627.html');

