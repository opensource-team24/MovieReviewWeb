const express = require('express')
const path = require('path')
const logger = require('morgan')

const indexRouter = require('./routes/index')

const app = express()

const port = 3000;

app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.listen(port, () => {
    console.log(`server is listening at localhost:${ port }`)
})

module.exports = app
