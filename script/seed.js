'use strict'

const db = require('../server/db')

const scrapeFragranticaNotesPage = require('./scrapers/notesPage')
const {sleep} = require('./utils')

const {
    Brand,
    Category,
    Note,
    Perfume,
    PerfumeNote,
    Perfumer,
    Review
} = require('../server/db/models')

async function seed() {
    try {
        await db.sync({force: true})

        // seed notes and categories
        const notesAndCategories = await scrapeFragranticaNotesPage()

        console.log(`notes and categories scraped: returned ${notesAndCategories.length} items.`)
        console.log('seeding notes and categories...')

        for (let i = 0; i < notesAndCategories.length; i++) {
            console.log(`seeding note ${notesAndCategories[i][0].name} in category ${notesAndCategories[i][1].name}`)
            const newNote = await Note.create(notesAndCategories[i][0])
            const [newCategory, created] = await Category.findOrCreate({where: notesAndCategories[i][1]})
            if (created) {console.log(`created category ${newCategory.name}`)}
            await newCategory.addNote(newNote)
        }

        console.log('seeded successfully')
    } catch(err) {
        console.error(err)
    }
}

async function runSeed() {
    console.log('seeding...')
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