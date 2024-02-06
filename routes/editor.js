const express = require('express');
const path = require('path');
const authentication = require('../middleware/authentication');
const db = require('../db/crud');
const model = require('../dataModels/postModel');
const router = express.Router();
var formData;

router.get('/', authentication.login, (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'editor.html'));
});

router.get('/update/:id', authentication.login, async (req,res) => {
    let id = req.params.id;
    const data = await db.findRecords(model, {_id: id}, model.findById, null);
    res.render('editor', {data: data});
})

router.post('/data', (req, res) => {
    formData = req.body;
});

router.get('/data', (req, res) => {
    return res.send(formData);
})


module.exports = router;