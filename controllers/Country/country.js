const express = require('express')

const countryApi = require('../../models/Country/country.js')

const leagueApi = require('../../models/League/league.js')

const countryRouter = express.Router()


//Get All
countryRouter.get('/', async (req, res) => {
    try {
        const allCountries = await countryApi.getAllCountries()
        res.json(allCountries)
    } catch (e) {
        console.error(e)
    }
})

//Get One
countryRouter.get('/:countryId', async (req, res) => {
    try {
        const singleCountry = await countryApi.getCountryById(req.params.countryId)
        const allLeagues = await leagueApi.getAllLeaguesByCountryId(req.params.countryId)
        res.json({ singleCountry, allLeagues })
    } catch (e) {
        console.error(e)
    }
})

//Create One
countryRouter.post('/', async (req, res) => {
    try {
        const newCountry = await countryApi.addNewCountry(req.body)
        res.json(newCountry)
    } catch (e) {
        console.error(e)
    }
})

//Update One
countryRouter.put('/:countryId', async (req, res) => {
    try {
        const oneCountry = await countryApi.updateCurrentCountry(req.params.countryId, req.body)
        res.json(oneLeague)
    } catch (e) {
        console.log(e)
    }
})

//Delete One
countryRouter.delete('/:countryId', async (req, res) => {
    try {
        const deletedCountry = await countryApi.deleteCurrentCountry(req.params.countryId)
        res.json(deletedCountry)
    } catch (e) {
        console.error(e)
    }
})


module.exports = {
    countryRouter
}