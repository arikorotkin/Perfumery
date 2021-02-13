const Sequelize = requre('sequelize')
const db = require('../db')

const Perfumer = db.define('perfumer', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            isEmpty: false
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

module.exports = Perfumer