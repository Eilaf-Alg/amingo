const express = require("express"); 
const User = require("../models/User"); //importing the file looks different cz we are inside a folder

const router = express.Router(); // to allow us to use the routes outside the file server.js
/* When a GET or POST request is made, the first file to be checked for routes would be server.js then the other ones 
in the other ones such as User.js, we change app.post() app.get() all to router.post() ...
*/

/**
 * Post route for creating a new user.
 * 
 * @name POST: /users/
 * 
 * @param {string} name - Name of user
 * @param {string} email - Email of customer
 * @param {password} password - Password of customer
 */
//http://localhost:5000/users/
/* THE ROUTE BELOW IS REMOVED BECAUE IT DOES THE SAME 
FUNCTIONALITY AS REGISTER ROUTE, BUT DOESNT AUTHENTICATE  */
// router.post('/', (req, res) => {
//     const newUser = new User(({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     }))

//     newUser
//         .save()
//         .then(user => res.json(user))
//         .catch(err => console.log(err))
// });

 
/**
 * Get route for fetching all users from users collection.
 * 
 * @name GET: /users/
 */
//http://localhost:5000/users/
/* REMOVED THIS OPTION TO REPLACE IT WITH INFO ONLY ABOUT LOGGED IN USER, NOT ALL USERS */
// router.get('/', (req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => console.log(err)) 
// });
//http://localhost:5000/users/
/* return info about logged in user only, not all users */
router.get('/', (req, res) => {
    res.json(req.user); /*user is added to the req object by findById FX in passport.js
    passport.js function is always executed before this file is loaded because of the 
    middleware line we added in server.js for authentication purposes
    */
});

/**
 * Post route for: following a user
 * 
 * @name POST: /users/:userId/follow
 */
/* for this route we can also use GET method and it will work bcs we are not using anything in the body. 
but it is best practice is to use POST method whenever we make changes to the DB. 
GET should be use for fetching data but not modifying data in Database.

Steps to use this route: log in as any user through "http://localhost:5000/auth/login" and 
copy the token returned after logging in. then navigate to this route and provide the token in the header in Postman to indicate
that you are currently logged in (since you cannot follow someone without logging in)
Then provide the userId you want to follow by writing it in the URL of this route. 
Finally click post button in postman. clicking post means you have followed the other user with the ID you provided in the URL

From the steps above, its clear that we don't pass any parameters in the body of this post and hence this is 
why it would also work if we use GET
*/
router.post('/:userId/follow', (req, res) => {
    //Fetch the object of logged in user
    User.findById(req.user.id) // this user is coming from the token: which is the logged in user who wants to follow
        .then( loggedInUser => {
            //Fetch the object of user to follow
            User.findById(req.params.userId) // this is the Id of the user to be followed, which comes from the URL
                .then(userToFollow =>{
                    //Add user into followers list
                    loggedInUser.followers.push(userToFollow); // push a new user into the followers array
                    loggedInUser
                        .save()
                        .then( _user =>{
                            res.json(_user)
                        })
                        .catch(err => res.json(err))
                })
                .catch(err => res.json({"message": "Invalid user to follow"}));
        })
})
 
/**
 * Get route for fetching all the posts of a user.
 * 
 * @name POST: /posts/
 * 
 * @param {string} email - Email of customer
 */
//http://localhost:5000/users/posts

router.post('/posts', (req, res) => {
    // User model (mongoose) will find an email from req.body
    User.findOne({email: req.body.email})
        // Once mongo responds...
        .then( user => {
            // Post model (mongoose) will search for user
            Post.find({user: user})
                // Then when mongo responds...
                .then(posts => {
                    // res (express) will output the result
                    res.json(posts)
                })
                // If Post model fails, log the error
                .catch(err => console.log(err)) 
        })
        // If User model fails, log the error.
        .catch(err => res.json(err))
});

/**
 * Get route for feching list of a user's followers
 * 
 * @name GET: /users/followers
 */
router.get('/followers', (req, res) => {
    User.findById(req.user.id)
        .populate('followers') // populate is a function from mongoose
        .then(user=> {
            res.json(user)
        })
})

module.exports = router;