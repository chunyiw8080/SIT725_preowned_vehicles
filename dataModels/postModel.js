const mongoose = require('mongoose');

//user object structure, basic structure for user table in the database.
let postSchema = new mongoose.Schema({
    status: {type: Number, enum: [0,1], required: true},

    car_model: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    seats: {type: Number, required: true},
    km_driven: {type: Number, required: true},
    fuel: {
        type: String,
        enum: ['Petrol', 'Diesel'],
        required: true
    },
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic'],
        required: true
    },
    mileage: {type: Number, required: true},
    engine: {type: Number, required: true},
    max_power: {type: Number, required: true},
    torque: {type: Number, required: true},
    seller_type: {
        type: String,
        enum: ['Individual', 'Dealer'],
        default: 'Individual'
    },
    owner: {
        type: String,
        enum: ['First', 'Second', 'Third', 'Forth & Above'],
        default: 'First'
    },

    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: [], required: true},
    poster_name: {type: String, required: true},
    uuid: {type: String, required: true},
    post_date: {type: Date, requied: true},
    contact: {type: String},

    

});

//object to operate database documents
let postModel = mongoose.model('posts', postSchema);

module.exports = postModel;