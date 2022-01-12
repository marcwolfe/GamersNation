const express = require('express')
const res = require('express/lib/response')
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')


//setup .env access
require('dotenv').config()

const PORT = process.env.PORT



//import model 
const Game = require('./models/game')

//setup database here
const mongoose = require('mongoose')

//create mongoURI uniform resource identifier
const mongoURI = process.env.MONGODB_URI

//Sessions
const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here is the SESSION_SECRET')
console.log(SESSION_SECRET)
//now we can setup session with secret
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next()
})



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

//MIDDLEWARE
app.use(express.urlencoded({extended: true }))

//method override middleware
app.use(methodOverride('_method'))
app.use(express.static('public'))



//Controllers

//import in controllers
const gameController = require('./controllers /gameController')

//use controllers
app.use('/games', gameController)
//here we are telling our app when you see a url with /example use this router


const userController = require('./controllers /userController')
app.use('/users', userController)




app.listen(PORT, () => {
    console.log('Listening on port 3k')
})