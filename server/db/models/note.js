const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    odorProfile: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false
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