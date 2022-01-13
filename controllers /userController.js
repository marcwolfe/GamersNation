const express = require('express')
const bcrypt = require('bcrypt')


const User = require('../models/users')

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
    
    const salt = bcrypt.genSaltSync(10)
    
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

    User.findOne({username: req.body.username}, (error, userExists) => {
        if(userExists){
            res.send('Username is taken')
        }else {
            User.create(req.body, (error, createdUser) => {
                req.session.currentUser = createdUser
                res.redirect('/games')
            })
        }
    })
})

router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
})

router.post('/signin', (req, res) => {
    
    User.findOne({username: req.body.username}, (error, foundUser) => {
        if(foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)

            if (validLogin) {
                req.session.currentUser = foundUser
                
                res.redirect('/games')
            }else {
               
                res.send('Invalid Username or Password')
            }
        }else {
            
            res.send('Invalid Username or Password')
        }
    })
})


router.get('/signout', (req, res) => {
    
    req.session.destroy()
    res.redirect('/games')
})



module.exports = router