const Sequelize = require('sequelize')
const db = require('../db')

const FragranticaUser = db.define('fragranticaUser', {
    name: {
        type: Sequelize.STRING,
        allowNull: true,
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

module.exports = FragranticaUser