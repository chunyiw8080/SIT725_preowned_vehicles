/**
 * 
 * @param {*} success callback when successfully connect to database
 * @param {*} error callback when failed to connect to database
 */
module.exports = function(success, error){
    if (typeof error !== 'function'){
        error = function(){
            console.log('Unable to connect to the database');
        }
    }
    if (typeof success !== 'function'){
        success = function(){
            console.log('No crud function is called');
        }
    }
    //Import mongoose module
    const mongoose = require('mongoose');
    //Import database configurations
    const {dbHost, dbPort, dbName} = require('../config/config');
    //connect to MongoDB
    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

    //set callback
    mongoose.connection.once('open', () => {
        console.log('Connect to database');
        success();
    });
    mongoose.connection.once('error', () => {
        error();
    });
    mongoose.connection.once('close', () => {
        console.log('Connection interrupted');
    });

}