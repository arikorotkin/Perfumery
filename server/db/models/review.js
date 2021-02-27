const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Review