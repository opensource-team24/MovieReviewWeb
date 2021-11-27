const fs = require('fs')
const request = require('request')

const secretJsonFile = fs.readFileSync('./secret.json', 'utf8')
const secretJson = JSON.parse(secretJsonFile)

const clientId = secretJson.clientId
const clientSecret = secretJson.clientSecret

const naverApiUrl = 'https://openapi.naver.com/v1/search/movie'

searchMovie = (movieName, responseCallback) => {
    const options = {
        url: naverApiUrl,
        method: 'GET',
        headers: {
            'X-Naver-Client-Id': clientId,
            'X-Naver-Client-Secret': clientSecret
        },
        qs: {
            'query': movieName
        }
    }
    
    request(options, responseCallback)
}

module.exports = searchMovie