const mongoose = require('../connection.js')

const ContinentSchema = mongoose.Schema({
  name: String,
})

const ContinentCollection = mongoose.model('Continent', ContinentSchema)

const getAllCountries = () => {
  return ContinentCollection.find({})
}

const getContinentById = (continentId) => {
  return ContinentCollection.findById(continentId)
}

const addNewContinent = (newContinent) => {
  return ContinentCollection.create(newContinent)
}

const updateCurrentContinent = (continentId, updatedContinent) => {
  return ContinentCollection.updateOne({ _id: continentId }, updatedContinent)
}

const deleteCurrentContinent = (continentId) => {
  return ContinentCollection.deleteOne({ _id: continentId })
}


module.exports = {
  getAllCountries,
  getContinentById,
  addNewContinent,
  updateCurrentContinent,
  deleteCurrentContinent
}