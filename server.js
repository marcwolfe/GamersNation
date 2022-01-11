const express = require('express')
const res = require('express/lib/response')
const app = express()
const methodOverride = require('method-override')
const PORT = 3000

const mongoose = require('mongoose')
const Log = require('./models/game')
const mongoURI = "mongodb://127.0.0.1:27017/game"
const db = mongoose.connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('database connected')
})

db.on('error', () => {console.log('ERROR: ', error)})
db.on('connected', () => {console.log('mongo connected')})
db.on('disconnected', () => {console.log('mongo disconnected')})





//MiddleWare
app.use(express.urlencoded({extended: true}))

//Method Override
app.use(methodOverride('_method'))
app.use(express.static('public'))


//Controllers

//import controllers
const productsController = require('./controllers /gameController')

app.use('/game', gameController)

app.listen(PORT, () => {
    console.log('Listening on port 3k')
})