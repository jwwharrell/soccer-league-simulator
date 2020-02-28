const mongoose = require('../connection.js')

const Countrieschema = mongoose.Schema({
  name: String,
  pyramidPosition: Number,
  proPossible: Boolean,
  relPossible: Boolean,
  numberOfClubs: Number,
  continentId: mongoose.ObjectId
})

const CountryCollection = mongoose.model('Country', Countrieschema)

const getAllCountries = () => {
  return CountryCollection.find({})
}

const getCountryById = (countryId) => {
  return CountryCollection.findById(countryId)
}

const getAllCountriesByContinentId = (continentId) => {
  return ClubCollection.find({ continentId: continentId })
}

const addNewCountry = (newCountry) => {
  return CountryCollection.create(newCountry)
}


const updateCurrentCountry = (countryId, updatedCountry) => {
  return CountryCollection.updateOne({ _id: countryId }, updatedCountry)
}

const deleteCurrentCountry = (countryId) => {
  return CountryCollection.deleteOne({ _id: countryId })
}


module.exports = {
  getAllCountries,
  getCountryById,
  getAllCountriesByContinentId,
  addNewCountry,
  updateCurrentCountry,
  deleteCurrentCountry
}