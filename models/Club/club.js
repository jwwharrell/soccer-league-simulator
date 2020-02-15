const mongoose = require('../connection.js')

const ClubSchema = mongoose.Schema({
  name: String,
  leagueId: mongoose.ObjectId,
  players: [{ type : mongoose.ObjectId, ref: 'Player' }]
})

const ClubCollection = mongoose.model('Club', ClubSchema)

const getAllClubs = () => {
  return ClubCollection.find({})
}

const getClubById = (clubId) => {
  return ClubCollection.findById(clubId)
}

const getAllClubsByLeagueId = (leagueId) => {
    return ClubCollection.find({ leagueId: leagueId })
}

const addNewClub = (newClub) => {
  return ClubCollection.create(newClub)
}


const updateCurrentClub = (clubId, updatedClub) => {
  return ClubCollection.updateOne({ _id: clubId }, updatedClub)
}

const deleteCurrentClub = (clubId) => {
  return ClubCollection.deleteOne({ _id: clubId })
}


module.exports = {
  getAllClubs,
  getClubById,
  getAllClubsByLeagueId,
  addNewClub,
  updateCurrentClub,
  deleteCurrentClub
}