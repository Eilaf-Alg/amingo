var bodyParser = require('body-parser')

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/User'); //import the file we created
//connect to the DB
const db = "mongodb+srv://astroAmigo:astrolabs@cluster0-srjrx.mongodb.net/test?retryWrites=true&w=majority";

mongoose
.connect(db, {useNewUrlParser: true})
.then( () => console.log ("Db Connected") )
.catch(err => console.log(err));


// Body parser middleware
app.use(express.urlencoded( {extended: false}));

/* GET home page. */
app.get('/', (req,res) => res.json({
	msg: "Hello! Amigo"
}));

/* post to Db */
app.post('/users', (req, res) => {
	const newUser = new User({
	    name: req.body.name,
	    email: req.body.email,
	    password: req.body.password
	});

	newUser
	    .save()
	    .then(user => res.json(user))
	    .catch(err => res.json(err));
});

/* route to display all users saved in the db */
app.get('/users', (req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running at http://localhost:', port));



/* 

mongodb+srv://astroAmigo:JNPc-:T797Eq8jR@cluster0-srjrx.mongodb.net/test?retryWrites=true&w=majority
*/