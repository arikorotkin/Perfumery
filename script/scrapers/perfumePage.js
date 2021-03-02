const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

async function scrapeFragranticaPerfumePage(url) {
    try {
        const browser = await puppeteer.launch({ headless: true})
        const page = await browser.newPage()
        await page.goto(url)

        await page.waitForXPath('//*[@id="pyramid"]/div[1]/div/div[2]/div[3]/div')
        await page.waitForXPath('//*[@id="main-content"]/div[1]/div[1]/div/div[3]/div[2]')
        await page.waitForXPath('//*[@id="toptop"]/h1')
        await page.waitForXPath('//*[@id="main-content"]/div[1]/div[1]/div/div[2]/div[1]/div[2]/p/a/span')
        await page.waitForXPath('//*[@id="main-content"]/div[1]/div[1]/div/div[2]/div[5]/div/p[1]')
       
        // brand
        const brandChildren = await page.$$eval('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-12.large-9.cell > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p > a', arrOfBrands => {
            return arrOfBrands.map(child => {
                return {
                    name: child.textContent.trim(),
                    url: child.getAttribute('href')
                }
            })
        })
        
        // name & gender
        const perfumeNameAndGender = await page.$eval('#toptop > h1', nameEl => {
             const titleText = nameEl.textContent.trim().split(' for ')
             if (titleText.length === 2) {
                return titleText
             }
             return titleText.slice(0, -1).concat(titleText[-1])
        })

        // destructure name & gender
        let perfumeName = perfumeNameAndGender[0]
        let perfumeGender = perfumeNameAndGender[1]

        brandChildren.forEach(brand => {
            if (perfumeName.includes(brand) && brand.length !== perfumeName.length) {
                perfumeName = perfumeName.replace(brand, '').trim()
            }
        })

        if (perfumeGender.split(' and ').length === 2) {
            perfumeGender = 'all genders'
        }

        // notes
        const noteChildren = await page.evaluate(() => {
            const topNoteEls = document.querySelectorAll('#pyramid > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > div > div')
            if (!topNoteEls.length) {
                const noteEls = document.querySelectorAll('#pyramid > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(3) > div > div')
                const noteElsArr = []
                noteEls.forEach(noteEl => {
                    const aEl = noteEl.querySelector('a')
                    noteElsArr.push({
                        name: noteEl.textContent.trim(),
                        url: aEl.getAttribute('href')
                    })
                })
                return noteElsArr
            }
            const middleNoteEls = document.querySelectorAll('#pyramid > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(6) > div > div')
            const baseNoteEls = document.querySelectorAll('#pyramid > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(8) > div > div')
            const layeredNotes = [
                [],
                [],
                []
            ]
            topNoteEls.forEach(topNoteEl => {
                const aEl = topNoteEl.querySelector('a')
                layeredNotes[0].push({
                    name: topNoteEl.textContent.trim(),
                    url: aEl.getAttribute('href')
                })
            })
            middleNoteEls.forEach(middleNoteEl => {
                const aEl = middlenoteEl.querySelector('a')
                layeredNotes[1].push({
                    name: middleNoteEl.textContent.trim(),
                    url: aEl.getAttribute('href')
                })
            })
            baseNoteEls.forEach(baseNoteEl => {
                const aEl = basenoteEl.querySelector('a')
                layeredNotes[2].push({
                    name: baseNoteEl.textContent.trim(),
                    url: aEl.getAttribute('href')
                })
            })
            return layeredNotes
        })

        // perfumers
        // const perfumerChildren = await page.$$eval('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-12.large-9.cell > div > div:nth-child(3) > div.grid-x.grid-padding-x.grid-padding-y.small-up-2 > div', arrOfChildren => {
        //     return arrOfChildren.map(child => child.textContent.trim())
        // })

        // year
        const perfumeYear = await page.$eval('#main-content > div.grid-x.grid-margin-x > div.small-12.medium-12.large-9.cell > div > div:nth-child(2) > div:nth-child(5) > div > p:nth-child(1)', yearEl => {
            const description = yearEl.textContent.trim()
            const referenceInd = description.indexOf('launched in ')
            const tempYear = parseInt(description.slice(referenceInd + 12, referenceInd + 16))
            return isNaN(tempYear) ? null : tempYear
        })

        await browser.close()

        return [
            {
                name: perfumeName,
                gender: perfumeGender,
                year: perfumeYear,
                url
            },
            brandChildren,
            // perfumerChildren,
            noteChildren
        ]
    } catch (err) {
        console.error(err)
        if (typeof browser !== 'undefined') {
            await browser.close()
        }
    }
}

// this should eventually export function that calls the above on all perfumes
module.exports = scrapeFragranticaPerfumePage


// test url 1
// scrapeFragranticaPerfumePage('https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-Zebra-Collector-64627.html')

// test url 2
// scrapeFragranticaPerfumePage('https://www.fragrantica.com/perfume/Xerjoff/Lira-11801.html')

// test url 3
// scrapeFragranticaPerfumePage('https://www.fragrantica.com/perfume/Calvin-Klein/CK-One-276.html')

