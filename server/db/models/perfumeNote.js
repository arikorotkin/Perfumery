const Sequelize = requre('sequelize')
const db = require('../db')

const PerfumeNote = db.define('perfume_note', {
    layer: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = PerfumeNote