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
    Perfumer,
    Review
} = require('../server/db/models')

async function seed() {
    try {
        await db.sync({force: true})

        // seed notes and categories (ca. 45 min)
        const notesAndCategories = await scrapeFragranticaNotesPage()

        console.log(`notes and categories scraped: returned ${notesAndCategories.length} items`)
        console.log('seeding notes and categories...')

        for (let i = 0; i < notesAndCategories.length; i++) {
            const newNote = await Note.create(notesAndCategories[i][0])
            const [newCategory, created] = await Category.findOrCreate({where: notesAndCategories[i][1]})
            if (created) {console.log(`created category ${newCategory.name}`)}
            await newCategory.addNote(newNote)
        }

        console.log('finished seeding notes and categories')

        // seed perfumers, perfumes, and brands
        const perfumersPerfumesAndBrands =  await scrapeFragranticaPerfumersPage()

        console.log(`perfumers scraped: returned ${perfumersPerfumesAndBrands.length} items`)
        console.log('seeding perfumers, perfumes, and brands...')

        // test

        // const perfumersPerfumesAndBrands = []
        // const testPerfumerUrls = ['https://www.fragrantica.com/noses/Ashley_Eden_Kessler.html']

        // const scrapeTestPerfumerUrls = async () => {
        //     for (let i = 0; i < testPerfumerUrls.length; i++) {
        //         await sleep(1750)
        //         const newPerfumer = await scrapeFragranticaPerfumerPage(testPerfumerUrls[i])
        //         perfumersPerfumesAndBrands.push(newPerfumer)
        //     }
        // }

        // await scrapeTestPerfumerUrls()
        // end test

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
                const perfumeNotes = perfumersPerfumesAndBrands[i][1][j][2]
                if (perfumeNotes.length === perfumeNotes.flat().length) {
                    for (let l = 0; l < perfumeNotes.length; l++) {
                        const [newNote, createdNote] = await Note.findOrCreate({
                            where: perfumeNotes[l]
                        })
                        await newNote.addPerfume(newPerfume)
                        if (createdNote) {console.log(`created new unscraped note ${newNote.name}`)}
                    }
                } else {
                    for (let l = 0; l < perfumeNotes.length; l++) {
                        for (let m = 0; m < perfumeNotes[l].length; m++) {
                            const layer = m === 0 ? 'top' : (m === perfumeNotes.length - 1 ? 'base' : 'middle')
                            const [newNote, createdNote] = await Note.findOrCreate({
                                where: perfumeNotes[l][m]
                            })
                            await newNote.addPerfume(newPerfume, {through: {layer}})
                            if (createdNote) {console.log(`created new unscraped note ${newNote.name}`)}
                        }
                    }
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