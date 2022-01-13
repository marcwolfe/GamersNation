const express = require('express')
const router = express.Router()

const Game = require('../models/game')

router.get('/seed', async (req, res) => {
    const newGames =
      [
        {
          name: 'Halo Infinite',
          description: 'Halo Infinite is a first-person shooter game developed by 343 Industries and published by Xbox Game Studios. ... The campaign follows the human super soldier Master Chief and his fight against the enemy Banished on the Forerunner ringworld Zeta Halo, also known as Installation 07.',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1X9B1rRmckhs1NNm6Q8gqQPZ9Gm5fXuepF4vxPPoCr5-IFu6tXG6QJktgtV6ei6JziJE&usqp=CAU',
          price: 60,
          discord: "https://discord.com/invite/halo" ,
          trailer: "https://www.youtube.com/watch?v=PyMlV5_HRWk&t=10s" , 
          review: "This is the best fps we have had in awhile from the halo franchise. The competitive scene has been a breath of fresh air to watch unfold. Definitely out performing its main competitor call of duty", 
        }, {
          name: 'Call of Duty Vanguard',
          description: 'Call of Duty: Vanguard is a 2021 first-person shooter game developed by Sledgehammer Games and published by Activision. ... Vanguard establishes a storyline featuring the birth of the special forces to face an emerging threat at the end of the war during various theatres of World War II.',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmKR4Lc5i_GjGYkzvUx--r7uIXbT8L49MW-fzrJQ8eouxjEjn06rt8wZpdrq40NvDlMjw&usqp=CAU',
          price: 60,
          discord: "https://discord.com/invite/tkvanguardcoldwar" ,
          trailer: "https://www.youtube.com/watch?v=OQ1CwPhE8KQ&t=1s" ,
          review: "This is a decent Call of Duty title in terms of gameplay. There are some flaws with this game that seems to be every year. They never release the game with a league play mode to cater to the competitive players which can be frustrating for a lot of players. They also realease the game with multiple game breaking glitches and bugs which destroys the integrity of the gameplay. Most importantly though HACKERS, they have to do something effective to stop the hackers! "
             
        }, {
          name: 'Animal Crossing New Horizons',
          description: 'The series was conceptualized and created by Katsuya Eguchi and Hisashi Nogami. In Animal Crossing, the player character is a human who lives in a village inhabited by various anthropomorphic animals and can do various activities like fishing, bug catching, and fossil hunting.',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgKMGqgW9poJzVAIxpCv3qk48JpDv43alH4vOK1e1-3hjT-4izsFh9i20OyR1V2zYvUWs&usqp=CAU',
          price: 40,
          quantity: 1
        },
        {
            name: 'Sims 4',
            description: 'The Sims 4 is a 2014 life simulation video game developed by Maxis and The Sims Studio and published by Electronic Arts. The game has the same concept as its predecessor, The Sims 3. Players control their Sims in various activities and form relationships.',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeAhCp25INPlSXjvQnRFxsI2Hd2x9c0m6aOwOlQefRphNc7Vwo23PcL3ckbiWvvHNEw1o&usqp=CAU',
            price: 40,
            discord: "https://discord.com/invite/fNas7yQ",
            trailer: "https://www.youtube.com/watch?v=z00mK3Pxc8w",
            review: 'This game is the best I got tons of mods in it worth the money and cc makes your person look way much better also one of the best things is that you can be A CHILD I love going to my Lil stuff I have a big family over 10 Jens I started off with a small child soon she was an adult and then ended up having twins and triplets! the twins were my favorite a boy and a girl they both ended up dating their same-sex! I loved that so much then the boy adopted 2 kids and the girl adopted 11! soon after the kids grew and then they got married and after 4 gens they died with this being said this game is amazing and lets me make a family I never had! with this being said I am confident that this should be one of the top games'
          },
          {
            name: 'Life Is Strange 2',
            description: 'Life Is Strange 2 is a graphic adventure game played from a third-person view. The player takes control of a teenager named Sean Diaz (Gonzalo Martin), who is on the run with his younger brother, Daniel (Roman Dean George), following a tragic incident.',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiL1Inz6thwDRgyu6eXlAWHap1GU1nfZEGWRlOXdmR7x6iuzxg71vqFuNyykQlq2MS9Ek&usqp=CAU',
            price: 32,
            discord: "https://discord.com/invite/lifeisstrange",
            trailer: "https://www.youtube.com/watch?v=1xYpXzqmk8Y",
            review: 'This is an amazing game! The story is really captivating and doesnt shy away from cultural issues in our world. Playing through each episode things just  get better and "Stranger". I definitely recommend playing the entire series.'
          },
          {
            name: 'Apex Legends',
            description: "Apex Legends is an online multiplayer battle royale game featuring squads of three players using pre-made characters with distinctive abilities, called 'Legends', similar to those of hero shooters. Alternate modes have been introduced allowing for single and for two-player squads since the game's release.",
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRtIlztSPvLAA3npWXx0Y6aIeEgI4aV9vO8RJYnu7SlXrDp9BV92O_fC9KZhI3eCJXgtA&usqp=CAU',
            price: 0,
            discord: "https://discord.com/invite/apexlegends",
            trailer: "https://www.youtube.com/watch?v=1R559DWBYbU", 
            review: "Apex Legends is the best Battle Royale game out right now period! The ranking system is God Tier and the gameplay/gunplay is amazing. The abilities on each character are diverse and can be used to outplay your enemies if you have the skill to do so. Not to mention this game is FREE! You cant beat that! "
          },
          {
            name: 'Escape From Tarkov',
            description: "Escape from Tarkov is a hardcore and realistic online first-person action RPG/Simulator with MMO features and a story-driven walkthrough. ... The players will have to experience living in the skin of one of the mercenaries who survived the initial stage of the Tarkov conflict.",
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLjdZYYjmXZciNQLAXHGYVcjdXAhUKlEdKwAaXCOfExUJlvJQ5xMks4LFgSQlvp11fIpA&usqp=CAU',
            price: 70,
            discord: "https://discord.com/invite/escapefromtarkovofficial",
            trailer: "https://www.youtube.com/watch?v=8R5t3a2jT4A", 
            review: "This game is the closest you can get to a realistic style looter/shooter game. The gunplay is 10/10 and the gameplay experience is unlike anything I ever experienced on any other game. This game is really intense and I would not recommend for the weak hearted or easily scared individual"
          },
          {
            name: 'Hollow Knight',
            description: "Hollow Knight is a 2D Metroidvania action-adventure game, that takes place in Hallownest, a fictional ancient kingdom. The player controls an insect-like, silent, and nameless knight while exploring the underground world.",
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMRhUUmgUG2O_14GaYtfCTgbWLLf_JsfD7ZtRZWYdpavh7biWVrrR-RjEbZ-GzcdY4DSE&usqp=CAU',
            price: 15,
            discord: "https://discord.com/invite/hollowknight",
            trailer: "https://www.youtube.com/watch?v=UAO2urG23S4", 
            review: "Its not hard to get lost in the deep, subterranean world of Hollow Knight – and I mean that in more ways than one. The expansive catacombs of Hallownest have countless paths to explore and secrets to find. But more than that, its rich with lore, history, and purpose that drew me into a 2D Metroidvania kingdom I wanted to uncover every inch of. The deeper I went into Hollow Knight, the more I was surprised at just how much content and freedom it has to offer. I could wander in basically any direction and find bosses to fight, upgrades to collect, and secrets to uncover. But whats truly captivating about the exploring this long-dead kingdom is its atmosphere. Art, music, color tone, sound, and a million other little details combine to give each area of the map a distinct sense of place, and those areas jigsaw together in a way that feels intentional and alive."
          },
      ]
  
    try {
      const seedItems = await Game.create(newGames)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })


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