const Sequelize = requre('sequelize')
const db = require('../db')

const Category = db.define('category', {
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

module.exports = Category