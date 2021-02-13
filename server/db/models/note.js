const Sequelize = requre('sequelize')
const db = require('../db')

const Note = db.define('note', {
    name: {
        type: Sequelize.string,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isUrl: true,
        }
    }
})

module.exports = Note