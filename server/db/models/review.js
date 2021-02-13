const Sequelize = requre('sequelize')
const db = require('../db')

const Review = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            isInt: true
        }
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false
        }
    }
})

module.exports = Review