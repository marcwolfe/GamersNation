const express = require('express')
const router = express.Router()

const Game = require('../models/game')

// router.get('/seed', async (req, res) => {
//     const newGames =
//       [
//         {
//           name: 'Beans',
//           description: 'A small pile of beans. Buy more beans for a big pile of beans.',
//           img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
//           price: 5,
//           quantity: 99
//         }, {
//           name: 'Bones',
//           description: 'It\'s just a bag of bones.',
//           img: 'http://bluelips.com/prod_images_large/bones1.jpg',
//           price: 25,
//           quantity: 0
//         }, {
//           name: 'Bins',
//           description: 'A stack of colorful bins for your beans and bones.',
//           img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
//           price: 7000,
//           quantity: 1
//         }
//       ]
  
//     try {
//       const seedItems = await Game.create(newGames)
//       res.send(seedItems)
//     } catch (err) {
//       res.send(err.message)
//     }
//   })



//INDEX ROUTE
router.get('/' , (req, res) => {
    Game.find({}, (error, allGames) => {
        console.log(allGames);
        res.render('index.ejs', {
            games: allGames
        })
    })
})

//NEW ROUTE
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//SHOW ROUTE
router.get('/:id', (req, res) => {
    Game.findById(req.params.id, (error, foundGames) => {
        console.log(foundGames)
        res.render('show.ejs', {games: foundGames})
    })
})



router.post('/', (req, res) => {
    Game.create(req.body, (error, createdGame) => {
            if(error) {
                console.log(error)
                res.send(error)
            }else {
                console.log(createdGame)
                res.redirect('/games')
            }
    })
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, deletedGame) => {
        if(error){
            console.log(error)
            res.send(error)
        }else{
            console.log(deletedGame)
            res.redirect('/games')
        }
    })
})

router.get('/:id/edit', (req, res) => {
    // res.render('edit.ejs')
    Game.findById(req.params.id, (error, foundGames) => {
        if(error){
            console.log(error)
            res.send(error)
        }else {
            res.render('edit.ejs', {games: foundGames})
        }
    })
})

router.put('/:id', (req, res) => {
    console.log(req.body)
    Game.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedGame)=>{
        if(error) {
            console.log(error)
            res.send(error)
        }else {
            console.log(updatedGame)
            res.redirect('/games')
        }
    })

})

router.put('/:id/buy', (req, res) => {
    Game.findByIdAndUpdate(req.params.id, {$inc: {quantity: -1} }, (error, buyGame) => {
        if (error) {
            console.log(error)
            res.send(error)
        }else {
            res.redirect('/games')
        }
    })
})

module.exports = router