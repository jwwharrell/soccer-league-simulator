const express = require('express')

const clubApi = require('../../models/Club/club.js')

const playerApi = require('../../models/Player/player.js')

const clubRouter = express.Router()


//Get All
clubRouter.get('/', async (req, res) => {
    try {
        const allClubs = await clubApi.getAllClubs()
        res.json(allClubs)
    } catch (e) {
        console.error(e)
    }
})

//Get One
clubRouter.get('/:clubId', async (req, res) => {
    try {
        console.log('trying to get one club')
        const singleClub = await clubApi.getClubById(req.params.clubId)
        const allPlayers = await playerApi.getAllPlayersByClubId(req.params.clubId)
        res.json({ singleClub, allPlayers })
    } catch (e) {
        console.log(e)
    }
})

//Create One
clubRouter.post('/', async (req, res) => {
    try {
        const newClub = await clubApi.addNewClub(req.body)
        res.json(newClub)
    } catch (e) {
        console.error(e)
    }
})

//Update One
clubRouter.put('/:clubId', async (req, res) => {
    try {
        const oneClub = await clubApi.updateCurrentClub(req.params.clubId, req.body)
        res.json(oneClub)
    } catch (e) {
        console.error(e)
    }
})

//Delete One
clubRouter.delete('/:clubId', async (req, res) => {
    try {
        const deletedClub = await clubApi.deleteCurrentClub(req.params.clubId)
        res.json(deletedClub)
    } catch (e) {
        console.error(e)
    }
})


module.exports = {
    clubRouter
}