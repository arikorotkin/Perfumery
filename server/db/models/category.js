const Sequelize = requre('sequelize')
const db = require('../db')

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
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

module.exports = Category