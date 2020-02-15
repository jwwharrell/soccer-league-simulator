const express = require('express')

const playerApi = require('../../models/Player/player.js')

const playerRouter = express.Router()


//Get All
playerRouter.get('/', async (req, res) => {
    try {
        const allPlayers = await playerApi.getAllPlayers()
        res.json(allPlayers)
    } catch (e) {
        console.error(e)
    }
})

//Get One
playerRouter.get('/:playerId', async (req, res) => {
    try {
        const singlePlayer = await playerApi.getPlayerById(req.params.playerId)
        res.json({ singlePlayer })
    } catch (e) {
        console.error(e)
    }
})

//Create One
playerRouter.post('/', async (req, res) => {
    try {
        const newPlayer = await playerApi.addNewPlayer(req.body)
        res.json(newPlayer)
    } catch (e) {
        console.error(e)
    }
})

//Update One
playerRouter.put('/:playerId', async (req, res) => {
    try {
        const onePlayer = await playerApi.updateCurrentPlayer(req.params.playerId, req.body)
        res.json(onePlayer)
    } catch (e) {
        console.error(e)
    }
})

//Delete One
playerRouter.delete('/:playerId', async (req, res) => {
    try {
        const deletedPlayer = await playerApi.deleteCurrentPlayer(req.params.playerId)
        res.json(deletedPlayer)
    } catch (e) {
        console.error(e)
    }
})


module.exports = {
    playerRouter
}