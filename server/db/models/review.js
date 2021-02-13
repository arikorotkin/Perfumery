const Sequelize = requre('sequelize')
const db = require('../db')

const Review = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        validate: {
            notNull: true,
            isInt: true
        }
    },
    text: {
        type: Sequelize.TEXT,
        validate: {
            notNull: false,
            notEmpty: false
        }
    }
})

module.exports = Review