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
const postVerfication = require('../middleware/postverification');

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
 * Receive front-end requests and return all post data
 */
router.get('/getallposts', async function(req,res){
    try{
        let sort = req.body.sort ? req.body.sort : -1;
        const data = await db.findRecords(model, {status: 1}, model.find, {post_date: sort});
        return res.json(data);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }  
});

/**
 * Receive front-end requests and return all posts by author
 */
router.get('/getpostsbyauthor/:uuid', async function(req, res) {
    try {
        let sort = req.query.sort ? req.query.sort : -1; // Get sort from query parameters
        let uuid = req.params.uuid; // Get uuid from route parameters
        if (!uuid) {
            return res.status(400).send("Missing uuid in request");  // No uuid provided
        }
        const data = await db.findRecords(model, {status: 1, uuid: uuid}, model.find, {post_date: sort});
        return res.json(data);
    } catch(err) { 
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

/**
 * Page to show all posts
 */
router.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'allposts.html'));
});

/**
 * Router for user to crearte new post
 * upload.array: 10 images maximum to be uploaded
 * Images will be upload to the local folder: /public/userUploads, once successfully upload, the images' url will be store in the DB.
 */ 
router.post('/new',  authentication.login, upload.array('image', 10), async function(req, res) {
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
router.get('/id/:id', authentication.login, async function(req, res){
    let id = req.params.id;
    try{
        const data = await db.findRecords(model, {_id: id}, model.findById, null);
        // console.log(data);
        return res.render('post', {data: data});
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

router.get('/api/:id', async (req, res) => {
    let id = req.params.id;
    try{
        const data = await db.findRecords(model, {_id: id}, model.findById, null);
        console.log(data);
        return res.json(data);
    }catch(err){
        return res.status(500).send(err);
    }
})
/**
 * Posts delete
 * Verify user permissions through middleware function, if pass, mark posts status as 1, which will not be showd on post list
 */
router.delete('/:id', postVerfication, async function(req, res){
    let uuid = req.session.uuid;
    let id = req.params.id;
    try{
        const del = await db.updateRecords(model, {_id: id, uuid: uuid}, model.updateOne, {status: 0});
        console.log(del);
        return res.status(200).send("Post has been deleted");
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
    
});


/**
 * Posts delete in profiles
 */
router.delete('/del/:id', async (req, res) => {
    try {
        const result = await db.deleteRecords(model, {_id: req.params.id}, model.deleteOne);
        if(result.deletedCount > 0) {
            res.status(200).json({message: "Post deleted successfully"});
        } else {
            res.status(404).json({message: "No post found with the given id"});
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "An error occurred while deleting the post"});
    }
});


/**
 * Posts edit in profiles
 */
// router.get('/edit/:id', async function(req, res){
//     let id = req.params.id;
//     console.log(id);
//     try{
//         const data = await db.findRecords(model, {_id: id}, model.findOne, null);
//         console.log(data);
//         return res.render('postupdate', {data: data});
//     }catch(err){
//         return res.status(500).send(err);
//     }
    
// });


/**
 * Allow user to update their post.
 * Get current post data and return to the editor.
 * -------------------- (Use verfication middleware after frontend page is done) ------------------------
 */
router.post('/update/:id', postVerfication, async function(req, res){
    let id = req.params.id;
    let updateData = req.body;
    for (let key in updateData) {
        if (updateData[key] === null || updateData[key] === undefined) {
            delete updateData[key];
        }
    }
    
    const data = await db.updateRecords(model, {_id: id}, model.updateOne, {...updateData});
    return res.redirect(`/posts/id/${id}`);
});

router.get('/userposts', (req, res) => {
    let uuid = req.session.uuid;
    try{
        if(uuid){
            const data = db.findRecords(model, {uuid: uuid}, model.find, null);
            return res.status(200).json(data);
        }else{
            return res.status(403).send('Not logged in');
        }
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }   
});

module.exports = router;