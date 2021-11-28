const express = require('express')
const router = express.Router()

const searchMovie = require('./scripts/naverSearch')

const searchRouter = require('./search')

router.get('/', function (req, res, next) {
    res.render('movieSearch.html')
})

router.get('/result', function (req, res, next) {
    console.log(req.query.movieName)
    
    res.render('movieDetail.html')
})

router.use('/search', searchRouter)

module.exports = router