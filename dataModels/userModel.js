const mongoose = require('mongoose');

//user object structure, basic structure for user table in the database.
let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    uuid: String,
    reg_date: Date
});

//object to operate database documents
let userModel = mongoose.model('users', userSchema);

module.exports = userModel;