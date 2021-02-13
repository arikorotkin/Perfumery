const Sequelize = requre('sequelize')
const db = require('../db')

const Note = db.define('note', {
    name: {
        type: Sequelize.string,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    url: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true,
            notNull: false
        }
    }
})

module.exports = Note