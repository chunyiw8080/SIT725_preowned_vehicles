const express = require('express');
const multer = require('multer');
const moment = require('moment-timezone');
const path = require('path');

const db = require('../db/crud');
const model = require('../dataModels/postModel');
const router = express.Router();
const config = require('../config/config');

const timezone = config.timezone;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/userUploads') // images storage path
    },
    filename: function (req, file, cb) {
      // Get file suffix name
      const ext = path.extname(file.originalname);
      // Generate new file name and append the origin suffix name
      cb(null, file.fieldname + '-' + Date.now() + ext)
    }
});
const upload = multer({ storage: storage });

router.get('/', async function(req,res){
    try{
        let sort = req.body.sort ? req.body.sort : -1;
        const data = await db.findRecords(model, null, model.find, {post_date: sort});
        
        return res.send(data);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
/**
 * router for user to crearte new post
 * upload.array: 10 images maximum to be uploaded
 */
router.post('/new', upload.array('image', 10), async function(req, res) {
    console.log('files: ', req.files);
  
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
            post_date: moment.tz(now, timezone).toDate(), //current date and time
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


module.exports = router;