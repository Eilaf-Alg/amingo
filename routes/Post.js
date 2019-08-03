const express = require("express");
const Post = require("../models/Post"); 
const User = require("../models/User"); 

const router = express.Router(); 

/* I commented this code below for this route bcs somehow we can rewrite it in a SIMPLER WAY .
we no longer need to create a user as its already in the request? */

// Method: POST
// Creates a new post
// http://localhost:5000/posts
// router.post('/', (req, res) => {
//     User
//     .findOne({email: req.body.email})
//     .then( user => {
//         console.log("User found", user);
//         if (user) {
//             const newPost = new Post({
//                 message: req.body.message,
//                 user: user
//             })
//             newPost
//                 .save()
//                 .then(post=> res.json (post))
//                 .catch(err => res.json(err))
//         } else {
//             return res.status(400).json({message: "User not found"})
//         }
//     })
// });

//~SAME ROUTE AS ABOVE, REWRITED IN A SIMPLER WAY 
/**
 * Post route for creating a new message
 * 
 * @name POST: /posts/
 * 
 * @param {string} message - message to post in posts collection
 */
router.post('/', (req, res) => {
    const newPost = new Post({
        message: req.body.message,
        user: req.user
    })
    newPost
        .save()
        .then(post=> res.json (post))
        .catch(err => res.json(err))
});

//Method: GET
// Route to fetch all the posts from collection
/** This route is the exact thing as the route below it. 
The only difference is when we pass a user as an argument in find() fx we fetch the posts of 
only that user but not all users */

// router.get('/', (req, res) => {
//     Post.find()
//         .then(posts => res.json(posts))
//         .catch(err => console.log(err)) 
// });



//Method: GET
// Get Route to fetch logged in user posts
// http://localhost:5000/posts
router.get('/', (req, res) => {
    Post.find({user: req.user})
        .then(posts => res.json(posts))
        .catch(err => console.log(err)) 
});



/**
 * Post route to like a post
 * 
 * @name POST: /posts/:id/like
 * @param {string} id - Id of the post
 */
router.post('/:id/like', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.likes.push(req.user); // push a user into the likes array. to unlike we need to use shift array method
            post.save()
                .then(_post=>{
                    res.json({"message": "success"}) // instead of returning the post, just return a succes message 
                })
        })
})

module.exports = router;