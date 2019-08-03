/* CODE BELOW IS ONE FROM MINHAG'S GIT HUB */

/******* V. IMPP NOTEE!!! must install CORS (CROSS ORIGIN ..) "npm install cors" otherwise server.js will not accept 
 * connecting or accepting requests from any other external server. such as the React's front-end server
 ***********************************************************/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express(); // app is an instance of express
const User = require('./models/User');
const Post = require('./models/Post');
const keys = require('./config/keys');
const passport = require('passport'); // this is for authentication purposes
const cors = require('cors'); //  by default, server does not accept requests from outside


// configure express to use CORS
app.use(cors());

// configure express to read body from a POST request
app.use(bodyParser.urlencoded({ extended: false }));
// must configure ( bodyParser with JSON ) as one, together
app.use(bodyParser.json()); //************** WITHOUT THIS LINE, CONNECTING TO FRONT-END DIDN'T WORK ****************/

// Database connection string
const db = keys.mongoURI;

// connect to mongo with mongoose
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=> console.log("Db Connected"))
    .catch(err => console.log(err));

// Init passportjs
app.use(passport.initialize());
// Import the function 'passport' from the file passport.js and invoke it (call it) immediately
require("./config/passport")(passport);

app.get('/', (req, res) => res.json({
    msg: "Hello Amingo!!"
}));

/* Route names and linking the route js files */
//User
const userRoutes = require('./routes/User')
app.use('/users', passport.authenticate('jwt', {session: false}) ,userRoutes); //same middleware added as for posts route
//Post
const postRoutes = require('./routes/Post')
app.use('/posts', passport.authenticate('jwt', {session: false}) ,postRoutes); /* adding the middle argument to authenticate
is necessary to prevent users from posting unless they are logged in. Also called: middleware */
//Auth
const authRoutes = require('./routes/Auth');
app.use('/auth', authRoutes);



// // code below is Temporary to test and allow us to connect to React ************************
// app.get('/', (req,res) => res.json({
//     msg: "Helloo Amingo!!"
// }));

// app.post('/register-user', (req,res) => {
//     res.json({msg: 'done'})
// });
// //************************ Temporary ************************************************** */


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Your application is runnint @ http://localhost:${port}`));




/* MY OLD SERVER CODE IS BELOW: try it again, uncomment it and push it to heroku and then try posting in postman */

// const bodyParser = require("body-parser");
// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const User = require("./models/User"); //import the file we created
// const Post = require("./models/Post"); //import the file we created

// /* the line below to guide the request to the next file to be checked */
// const userRoutes = require('./routes/User'); // here we import the other file
// app.use('/users', userRoutes); // here we configure it. the server or app will append '/users' before all routes in User.js file


// //connect to the DB
// const db =
//   "mongodb+srv://astroAmigo:astrolabs@cluster0-srjrx.mongodb.net/test?retryWrites=true&w=majority";

// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("Db Connected"))
//   .catch(err => console.log(err));

// // Body parser middleware, used to help us access the res.body.xxx and req.body.xxx
// app.use(bodyParser.urlencoded({ extended: false }));

// /* GET home page. */
// app.get("/", (req, res) =>
//   res.json({
//     msg: "Hello! Amigo !"
//   })
// );

// /* create a new user, post to Db */
// app.post("/users", (req, res) => {
//   // We create a newUser object that holds the (name email password) we created in the other User.js file
//   const newUser = new User({
//     name: req.body.name, //name on the left is the exact way we declared it in User.js
//     email: req.body.email, //name on the right is what we provide to postman on the actual post request
//     password: req.body.password // we are able to access the parameters using re(x).body. something bcs of body parser
//   });
//   // use the created object
//   newUser
//     .save()
//     .then(user => res.json(user))
//     .catch(err => res.json(err));
// });

// /* route to display all users saved in the db */
// app.get("/users", (req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => console.log(err));
// });

// /* post to Db */
// app.post("/posts", (req, res) => {
//   // findOne() below is a function from mongoose
//   User
//   .findOne({ email: req.body.email })
//   .then(user => {
//     // if user is not null, the condition will return true
//     console.log("User found", user); // avoid using user.email cz user might be NULL and cause an error
//     if (user) {
//       const newPost = new Post({
//         message: req.body.message,
//         user: user // this user is the one used above and not coming from User.js file
//       });

//       // the object we just created
//       newPost
//         .save()
//         .then(post => res.json(post))
//         .catch(err => res.json(err));
//     } else {
//       return res.status(400).json({ message: "User not found" });
//     }
//   });
// });

// /* fetch all posts of specific user by email */
// app.post("/users/posts", (req, res) => {

//     User
//     .findOne({ email: req.body.email })
//     .then(userVariable => {
//       console.log("User found", userVariable); // avoid using user.email cz user might be NULL and cause an error
//       Post.find({ user: userVariable })
//       .then(posts => res.json(posts))
//       .catch(err => console.log(err));
//       }) 
//       .catch(err => res.json (err));
// });


// const port = process.env.PORT || 5000;

// app.listen(port, () =>
//   console.log("Server running at http://localhost:", port)
// );

// /* 

// //mongodb+srv://astroAmigo:JNPc-:T797Eq8jR@cluster0-srjrx.mongodb.net/test?retryWrites=true&w=majority

// */