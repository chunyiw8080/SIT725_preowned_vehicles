/** Imported modules */
const express = require('express');
const multer = require('multer');
const moment = require('moment-timezone');
const path = require('path');

/** Imported files */
const db = require('../db/crud');
const model = require('../dataModels/postModel');
const router = express.Router();
const config = require('../config/config');
const authentication = require('../middleware/authentication');

const timezone = config.timezone;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define file upload path
        cb(null, __dirname + '/../public/userUploads') 
    },
    filename: function (req, file, cb) {
      // Get file suffix name
      const ext = path.extname(file.originalname);
      // Generate new file name and append the origin suffix name
      cb(null, file.fieldname + '-' + Date.now() + ext)
    }
});
const upload = multer({ storage: storage });

/**
 * Page to list all posts
 */
router.get('/', async function(req,res){
    try{
        let sort = req.body.sort ? req.body.sort : -1;
        const data = await db.findRecords(model, {status: 1}, model.find, {post_date: sort});
        
        return res.send(data);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

/**
 * Router for user to crearte new post
 * upload.array: 10 images maximum to be uploaded
 * Images will be upload to the local folder: /public/userUploads, once successfully upload, the images' url will be store in the DB.
 */ 
router.post('/new',  upload.array('image', 10), async function(req, res) {
    console.log('files: ', req.files);
    console.log('req.body: ', req.body);
  
    try {
        const now = new Date();
        console.log(now);
  
        // Process each file and construct a relative path to the image
        let urls = req.files.map(file => {
            let fileName = path.basename(file.path);
            return '/userUploads/' + fileName;
        });
  
        // Set the data to be passed into the database
        const recordData = {
            ...req.body, // general form data
            status: 1,
            post_date: moment.tz(now, timezone).toDate(), //current date and time
            poster_name: req.session.username,   
            uuid: req.session.uuid,
            image: urls // array to store image url
        };
        console.log('urls: ', urls);
  
        const data = await db.createNewRecord(model, recordData);
        console.log(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
  
    res.send('New post has been created');
});

/**
 * Posts detailed page
 */
router.get('/:id', async function(req, res){
    let id = req.params.id;
    try{
        const data = await db.findRecords(model, {_id: id}, model.findById, null);
        return res.send(data);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

/**
 * Posts delete
 * Verify user permissions through session, if pass, mark posts status as 1, which will not be showd on post list
 */
router.delete('/:id', authentication.login, async function(req, res){
    let uuid = req.session.uuid;
    let id = req.params.id;

    try{
        const data = db.findRecords(model, {_id: id, uuid: uuid}, model.findOne, null);
        if(data){
            const del = await db.updateRecords(model, {_id: id, uuid: uuid}, model.updateOne, {status: 0});
            console.log(del);
            return res.status(200).send("Post has been deleted");
        }else{
            return res.status(403).send("Invalid Operation");
        }
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
    
});

router.patch('/:id', async function(req, res){

});


module.exports = router;