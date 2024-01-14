/** Imported modules */
const express = require('express');
const moment = require('moment-timezone');
const md5 = require('md5');
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

router.post('/login', async (req, res) => {
  try{
    let password = md5(req.body.password);
    const data = await db.findRecords(model, {username: req.body.username, password: password}, model.findOne, null);
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

router.post('/register', authentication.register, async (req, res) => {
  console.log(req.body);
  //take email as default username
  let username = req.body.username;
  username = username ? username : req.body.email;
  let uuid = uuidv4();
  try{
    let now = new Date();
    const data = await db.createNewRecord(model, {...req.body, username: username, password: md5(req.body.password), uuid: uuid, reg_date: moment(now).toDate()});
    console.log('reg data: ', data);
    return res.status(200).send('Success');
  }catch(err){
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

router.get('/profile', authentication.login, async function(req, res){
  let uuid = req.session.uuid;
  const data = await db.findRecords(model, {uuid: uuid}, model.findOne, null);
  return res.status(200).send(data);
});


module.exports = router;
