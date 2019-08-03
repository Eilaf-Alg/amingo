const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

const router = express.Router();

//Register a new user route
//http://localhost:5000/auth/register
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email.toLowerCase()}) /*if we do req.body.email() withour LowerCase we face a problem. 
        Mongoose is case sensitive and emails are not. so Mongoose will accept a@gmail.com and A@gmail.com as 2 different emails 
        but they are the same in real life */
        .then(user => {
            if(user) {
                // statuses have a certain rule to follow. Depending on the nature of it, the 1st digit changes, 2nd 2 digits are more specific to the status itself. not category
                res.status(400).json({"message": "Email alerady exists!"});
                console.log('this email already exists:', req.body.email);
            } else {
                console.log('the req:', req.body.name); /* logging the req recieved from front-end to know that 
                if the request appears in this console of the server, then that means the back-end had successfully recieved
                from front-end, hence, connection is successful
                */
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: req.body.password,
                    gender: req.body.gender
                });
                /* Boilerplate code below. bcrypt is for hashing */
                bcrypt.genSalt((err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});

//Login route
//http://localhost:5000/auth/login
/**
 * Post route for login.
 * 
 * @name POST: /auth/login/
 * 
 * @param {string} email - email of the user
 * @param {string} password - password of user
 */
router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
     .then(user=>{
         if(!user) {
             return res.status(400).json({"message": "Email doesn't exist"});
         } else {
             bcrypt.compare(req.body.password, user.password)
                 .then(isMatch => {
                     
                     if (isMatch) { /* The user id below is used from the user which we get back from the passport fx */
                         const payload = {id: user.id, name: user.name, email: user.email};
 
                         // Sign Token
                         jwt.sign(
                             payload,
                             keys.secret,
                             (err, token) => {
                                 res.json({
                                     success: true,
                                     token: token,
                                     name: user.name
                                 });
                             }
                         );
                     } else {
                         return res.status(400).json({"message": "Password is invalid"})
                     }
                 })
         }
     })
 });


module.exports = router;