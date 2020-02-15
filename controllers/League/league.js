const express = require('express')

const leagueApi = require('../../models/League/league.js')

const clubApi = require('../../models/Club/club.js')

const leagueRouter = express.Router()


//Get All
leagueRouter.get('/', async (req, res) => {
    try {
        const allLeagues = await leagueApi.getAllLeagues()
        res.json(allLeagues)
    } catch (e) {
        console.error(e)
    }
})

//Get One
leagueRouter.get('/:leagueId', async (req, res) => {
    try {
        const singleLeague = await leagueApi.getLeagueById(req.params.leagueId)
        const allClubs = await clubApi.getAllClubsByLeagueId(req.params.leagueId)
        res.json({ singleLeague, allClubs })
    } catch (e) {
        console.error(e)
    }
})

//Create One
leagueRouter.post('/', async (req, res) => {
    try {
        const newLeague = await leagueApi.addNewLeague(req.body)
        res.json(newLeague)
    } catch (e) {
        console.error(e)
    }
})

//Update One
leagueRouter.put('/:leagueId', async (req, res) => {
    try {
        const oneLeague = await leagueApi.updateCurrentLeague(req.params.leagueId, req.body)
        res.json(oneLeague)
    } catch (e) {
        console.error(e)
    }
})

//Delete One
leagueRouter.delete('/:leagueId', async (req, res) => {
    try {
        const deletedLeague = await leagueApi.deleteCurrentLeague(req.params.leagueId)
        res.json(deletedLeague)
    } catch (e) {
        console.error(e)
    }
})


module.exports = {
    leagueRouter
}