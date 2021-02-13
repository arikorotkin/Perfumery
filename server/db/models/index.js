const Brand = require('./brand')
const Category = require('./category')
const FragranticaUser = require('./fragranticaUser')
const Note = require('./note')
const Perfume = require('./perfume')
const PerfumeNote = require('./perfumeNote')
const Perfumer = require('./perfumer')
const Review = require('./review')

// Brand associations
Brand.belongsToMany(Perfume, {through: 'perfume_brand'})
Perfume.belongsToMany(Brand, {through: 'perfume_brand'})

// Category associations
Category.hasMany(Note)

// Fragrantica User associations
Perfume.hasMany(FragranticaUser, {as: 'signatureFragrance', foreignKey: 'signatureFragranceId'})
FragranticaUser.belongsToMany(Perfume, {through: Review})
Perfume.belongsToMany(FragranticaUser, {through: Review})
FragranticaUser.belongsToMany(Perfume, {through: 'perfumes_I_want', as: 'perfumeWanter'})
Perfume.belongsToMany(FragranticaUser, {through: 'perfumes_I_want', as: 'perfumeIWant'})
FragranticaUser.belongsToMany(Perfume, {through: 'favorite_fragrances', as: 'fragranceFan'})
Perfume.belongsToMany(FragranticaUser, {through: 'favorite_fragrances', as: 'favoriteFragrance'})

// Note associations
Note.belongsToMany(Perfume, {through: PerfumeNote})
Perfume.belongsToMany(Note, {through: PerfumeNote})

// Perfumer associations
Perfumer.belongsToMany(Perfume, {through: 'perfume_perfumer'})
Perfume.belongsToMany(Perfumer, {through: 'perfume_perfumer'})

module.exports = {
    Brand,
    Category,
    FragranticaUser,
    Note,
    Perfume,
    PerfumeNote,
    Perfumer,
    Review
}