const Sequelize = requre('sequelize')
const db = require('../db')

const FragranticaUser = db.define('fragranticaUser', {
    name: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
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

module.exports = FragranticaUser