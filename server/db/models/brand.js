const Sequelize = require('sequelize')
const db = require('../db')

const Brand = db.define('brand', {
    name: {
        type: Sequelize.STRING,
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

module.exports = Brand