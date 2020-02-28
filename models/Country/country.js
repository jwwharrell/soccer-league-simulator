const mongoose = require('../connection.js')

const CountrySchema = mongoose.Schema({
  name: String,
  continentId: mongoose.ObjectId
})

const CountryCollection = mongoose.model('Country', CountrySchema)

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