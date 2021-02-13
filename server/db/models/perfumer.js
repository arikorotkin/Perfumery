const Sequelize = requre('sequelize')
const db = require('../db')

const Perfumer = db.define('perfumer', {
    name: {
        type: Sequelize.STRING,
        validate: {
            notNull: true,
            isEmpty: false
        }
    },
    url: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            isUrl: true
        }
    }
})

module.exports = Perfumer