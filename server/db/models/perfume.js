const Sequelize = require('sequelize')
const db = require('../db')

const Perfume = db.define('perfume', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        validate: {
            isInt: true,
        }
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isUrl: true
        }
    }
})

module.exports = Perfume