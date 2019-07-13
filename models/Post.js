const mongoose = require("mongoose");
const Schema = mongoose.Schema; // we onky want schema part from mongoose not all of it, Unlike in server.js
const User = require("./User"); //import User since we are using it now


/* a Schema (an Object) is what describes what goes inside a document
a document is what one entry or row in a database contains
a list of documents makes a collection
a list of collections makes a database
*/

/* Here we use 'new' because we are creating an instance of Schema and storing it in PostSchema
such as: const cat = new Animal () 
*/
const PostSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: "user"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Line to allow us to export Post.js and 'post, is the name of our collection
// which will appear in the online Db page
module.exports = Post = mongoose.model("post", PostSchema);
 