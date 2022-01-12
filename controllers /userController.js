const express = require('express')
const bcrypt = require('bcrypt')

//import user Model
const User = require('../models/users')

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
    //we need to encrypt our passwords
    //we can use the npm package 'bcrypt' to do this
    //we need to import the library at the top of pur file
    //first we need to generate salt
    const salt = bcrypt.genSaltSync(10)
    // salt is a random garbage we add to our encrpyted passwords
    //the number we pass to genSaltSync determines how much Salt is added
    //the higher the number is more secure, but the longer it takes.
    // now we're going to generate the actually hash password 
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

    // first lets see if someone else already has this username
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
    //we need to get the user with that username
    User.findOne({username: req.body.username}, (error, foundUser) => {
        if(foundUser) {
            //if they do exist we need to compare passwords
            //we can can compare passwords using bcrypt compareSync function
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            //compareSync returns true if they match
            //and false if doesn't match
            //if passwords match login them in
            if (validLogin) {
                req.session.currentUser = foundUser
                // we are letting session know that we logged in
                res.redirect('/games')
            }else {
                //if they dont match send a message
                res.send('Invalid Username or Password')
            }
        }else {
            //if they dont exist we need to send a message
            res.send('Invalid Username or Password')
        }
    })
})

//destroy session route SIGNOUT

router.get('/signout', (req, res) => {
    //this DESTROYS the session
    req.session.destroy()
    res.redirect('/games')
})



module.exports = router