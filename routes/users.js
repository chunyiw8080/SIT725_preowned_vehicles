/** Imported modules */
const express = require('express');
const moment = require('moment-timezone');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/** Imported files */
const db = require('../db/crud');
const model = require('../dataModels/userModel');
const authentication = require('../middleware/authentication');

/** Module Instantiation */
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/**
 * User login page
 */
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'login.html'));
});

/**
 * Receive login requests from the front-end
 * Once successfully logged in, set the session for the user, which contains username and uuid
 * Session will be used to verify the user's permission to perform specific operations throuth verification middleware
 */
router.post('/login', async (req, res) => {
  try{
    const data = await db.findRecords(model, {username: req.body.username, password: req.body.password}, model.findOne, null);
    if(!data){
      return res.status(400).send('Incorrect username or password');
    }else{
      //create session for users
      req.session.username = data.username;
      req.session.uuid = data.uuid;
      console.log(req.body);
      return res.status(200).send('Login Successfully');
    }
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * User registration 
 */
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'registration.html'));
});

/**
 * Accept registration requests from the front-end and parse the registration form
 * If username is not provided, take email as default username
 * Randmonly generate a uuid for new user
 */
router.post('/register', authentication.register, async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  username = username ? username : req.body.email;
  let uuid = uuidv4();
  try{
    let now = new Date();
    const data = await db.createNewRecord(model, {...req.body, username: username, password: req.body.password, uuid: uuid, reg_date: moment(now).toDate()});
    console.log('reg data: ', data);
    return res.status(200).send('Success');
  }catch(err){
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

/**
 * Get user profile after verifying login status through session
 */
router.get('/profile', authentication.login, async function(req, res){
  let uuid = req.session.uuid;
  const data = await db.findRecords(model, {uuid: uuid}, model.findOne, null);
  return res.status(200).send(data);
});

router.post('/logout', authentication.login, function(req, res){
  try{
    req.session.destroy();
    if(!req.session){
      return res.status(205).send("Logout");
    }
  }catch(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
  
});

module.exports = router;
