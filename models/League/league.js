const mongoose = require('../connection.js')

const LeagueSchema = mongoose.Schema({
  name: String,
  pyramidPosition: Number,
  proPossible: Boolean,
  relPossible: Boolean,
  numberOfClubs: Number,
  countryId: mongoose.ObjectId
})

const LeagueCollection = mongoose.model('League', LeagueSchema)

const getAllLeagues = () => {
  return LeagueCollection.find({})
}

const getLeagueById = (leagueId) => {
  return LeagueCollection.findById(leagueId)
}

const getAllLeaguesByCountryId = (countryId) => {
  return ClubCollection.find({ countryId: countryId })
}

const addNewLeague = (newLeague) => {
  return LeagueCollection.create(newLeague)
}


const updateCurrentLeague = (leagueId, updatedLeague) => {
  return LeagueCollection.updateOne({ _id: leagueId }, updatedLeague)
}

const deleteCurrentLeague = (leagueId) => {
  return LeagueCollection.deleteOne({ _id: leagueId })
}


module.exports = {
  getAllLeagues,
  getLeagueById,
  getAllLeaguesByCountryId,
  addNewLeague,
  updateCurrentLeague,
  deleteCurrentLeague
}