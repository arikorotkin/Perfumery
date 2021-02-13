const Sequelize = requre('sequelize')
const db = require('../db')

const PerfumeNote = db.define('perfume_note', {
    layer: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            notEmpty: true
        }
    }
})

module.exports = PerfumeNote