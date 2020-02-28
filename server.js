const express = require('express')
const app = express()

const { countryRouter } = require('./controllers/Country/country.js')
const { leagueRouter } = require('./controllers/League/league.js')
const { clubRouter } = require('./controllers/Club/club.js')
const { playerRouter } = require('./controllers/Player/player.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())


app.use(express.static(`${__dirname}/client/build`))

app.use('/api/country/', countryRouter)
app.use('/api/league/', leagueRouter)
app.use('/api/club/', clubRouter)
app.use('/api/player/', playerRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
