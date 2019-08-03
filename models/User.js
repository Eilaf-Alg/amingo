const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: "male"
    },
    date: {
        type: Date,
        default: Date.now 
    },
    /* We have square brackets below cz we have multiple objects stored*/
    followers: [{
        type: Schema.ObjectId, //ObjectId comes from MongoDB and Schema from mongoose
        ref: 'user'
    }]
});

module.exports = User = mongoose.model('user', UserSchema);