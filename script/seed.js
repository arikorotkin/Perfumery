'use strict'

const db = require('../server/db')

const scrapeFragranticaNotesPage = require('./scrapers/notesPage')

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
        const notesAndCategories = scrapeFragranticaNotesPage()
        for (let i = 0; i < notesAndCategories.length; i++) {
            const newNote = await Note.findOrCreate({where: notesAndCategories[i][0]})
            const newCategory = await Category.findOrCreate({where: notesAndCategories[i][1]})
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