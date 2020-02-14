const mongoose = require('../connection.js')

const PlayerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  position: String,
  player: ObjectId
})

const PlayerCollection = mongoose.model('Player', PlayerSchema)

const getAllPlayers = () => {
  return PlayerCollection.find({})
}

const getPlayerById = (playerId) => {
  return PlayerCollection.findById(playerId)
}

const addNewPlayer = (newPlayer) => {
  return PlayerCollection.create(newPlayer)
}


const updateCurrentPlayer = (playerId, updatedPlayer) => {
  return PlayerCollection.updateOne({ _id: playerId }, updatedPlayer)
}

const deleteCurrentPlayer = (playerId) => {
  return PlayerCollection.deleteOne({ _id: playerId })
}


module.exports = {
  getAllPlayers,
  getPlayerById,
  addNewPlayer,
  updateCurrentPlayer,
  deleteCurrentPlayer
}