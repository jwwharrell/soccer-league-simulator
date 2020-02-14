const express = require('express')

const leagueApi = require('../../models/League/league.js')

const clubApi = require('../../models/Club/club.js')

const playerApi = require('../../models/Player/player.js')

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
        res.json({singleLeague, allClubs})
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

customerRouter.put('/:customerId', (req, res) => {
  customerApi.updateCurrentCustomer(req.params.customerId, req.body)
    .then((oneCustomer) => {
      res.json(oneCustomer)
    }) 
})

//Delete One
customerRouter.delete('/:customerId', (req, res) => {
  customerApi.deleteCurrentCustomer(req.params.customerId)
    .then((deletedCustomer) => {
      res.json(deletedCustomer)
    })
})


module.exports = {
  customerRouter
}