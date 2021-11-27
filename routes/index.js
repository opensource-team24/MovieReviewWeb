const express = require('express')
const router = express.Router()

const searchMovie = require('./scripts/naverSearch')

router.get('/search', function (req, res, next) {
    searchMovie(req.query.movieName, (error, response, body) => {
        if (response.statusCode === 200) {
            res.send(body)
        }
    })
})

module.exports = router
