const express = require('express');
const db = require('../db/crud');
const model = require('../dataModels/postModel');
const router = express.Router();

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

module.exports = router;