const express = require('express')
const router = express.Router()

const searchMovie = require('./scripts/naverSearch')

const searchRouter = require('./search')

router.get('/', function (req, res, next) {
    res.send(__dirname + '/public/index.html')
})

router.use('/search', searchRouter)

module.exports = router