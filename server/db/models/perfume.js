const Sequelize = requre('sequelize')
const db = require('../db')

const Perfume = db.define('perfume', {
    name: {
        type: Sequelize.STRING,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    year: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true,
            notNull: false
        }
    },
    gender: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            notEmpty: true
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

module.exports = Perfume