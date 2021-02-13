const Sequelize = requre('sequelize')
const db = require('../db')

const Brand = db.define('brand', {
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

module.exports = Brand