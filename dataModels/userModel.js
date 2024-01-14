const mongoose = require('mongoose');

//user object structure, basic structure for user table in the database.
let userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true},
    firstname: String,
    lastname: String,
    uuid: {type: String, unique: true},
    reg_date: Date,
    DOB: Date,
    avatar: String,
    email: {type: String, required: true, unique: true}, 
    phone: {type: Number, required: true, unique: true}
});

//object to operate database documents
let userModel = mongoose.model('users', userSchema);

module.exports = userModel;