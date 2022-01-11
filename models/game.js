const mongoose = require('mongoose')
const {Schema, model} = mongoose

const gamesSchema = new Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    discord: String,
    youtube: String
})

const Game = model('Game', gamesSchema)



module.exports = Game