'use strict'

const db = require('../server/db')

const scrapeFragranticaNotesPage = require('./scrapers/notesPage')
const {scrapeFragranticaPerfumersPage, scrapeFragranticaPerfumerPage} = require('./scrapers/perfumersPage')
const {sleep} = require('./utils')

const {
    Brand,
    Category,
    FragranticaUser,
    Note,
    Perfume,
    PerfumeNote,
    Perfumer,
    Review
} = require('../server/db/models')

async function seed() {
    try {
        await db.sync({force: true})

        // seed notes and categories (ca. 45 min)
        // const notesAndCategories = await scrapeFragranticaNotesPage()

        // console.log(`notes and categories scraped: returned ${notesAndCategories.length} items`)
        console.log('seeding notes and categories...')

        // for (let i = 0; i < notesAndCategories.length; i++) {
        //     const newNote = await Note.create(notesAndCategories[i][0])
        //     const [newCategory, created] = await Category.findOrCreate({where: notesAndCategories[i][1]})
        //     if (created) {console.log(`created category ${newCategory.name}`)}
        //     await newCategory.addNote(newNote)
        // }

        console.log('finished seeding notes and categories')

        // seed perfumers, perfumes, and brands
        // const perfumersPerfumesAndBrands =  await scrapeFragranticaPerfumersPage()

        // test
        const perfumersPerfumesAndBrands = []

        const perfumerPageUrls = ['https://www.fragrantica.com/noses/Ashley_Eden_Kessler.html', 'https://www.fragrantica.com/noses/Beatrice_Aguilar.html']

        const scrapePerfumers = async () => {
            for (let i = 0; i < perfumerPageUrls.length; i++) {
                await sleep(1750)
                const newPerfumerPerfumesAndBrands = await scrapeFragranticaPerfumerPage(perfumerPageUrls[i])
                perfumersPerfumesAndBrands.push(newPerfumerPerfumesAndBrands)
            }
        }

        await scrapePerfumers()
        // end test

        console.log(`perfumers scraped: returned ${perfumersPerfumesAndBrands.length} items`)
        console.log('seeding perfumers, perfumes, and brands...')

        for (let i = 0; i < perfumersPerfumesAndBrands.length; i++) {
            const newPerfumer = await Perfumer.create(perfumersPerfumesAndBrands[i][0])
            for (let j = 0; j < perfumersPerfumesAndBrands[i][1].length; j++) {
                const [newPerfume, createdPerfume] = await Perfume.findOrCreate({
                    where: perfumersPerfumesAndBrands[i][1][j][0]
                })
                for (let k = 0; k < perfumersPerfumesAndBrands[i][1][j][1].length; k++) {
                    const [newBrand, createdBrand] = await Brand.findOrCreate({
                        where: perfumersPerfumesAndBrands[i][1][j][1][k]
                    })
                    await newBrand.addPerfume(newPerfume)
                    if (createdBrand) {console.log(`created new brand ${newBrand.name}`)}
                }
                await newPerfume.addPerfumer(newPerfumer)
            }
        }

        console.log('finished seeding perfumers, perfumes, and brands')

        console.log('seeded successfully')
    } catch(err) {
        console.error(err)
    }
}

async function runSeed() {
    console.log('running seed function...')
    try {
      await seed()
    } catch (err) {
      console.error(err)
      process.exitCode = 1
    } finally {
      console.log('closing db connection')
      await db.close()
      console.log('db connection closed')
    }
  }

  if (module === require.main) {
    runSeed()
  }

  module.exports = seed