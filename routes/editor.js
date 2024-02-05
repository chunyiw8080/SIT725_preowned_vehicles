const express = require('express');
const path = require('path');
const authentication = require('../middleware/authentication');

const router = express.Router();
var formData;

router.get('/', authentication.login, (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'editor.html'));
});


router.post('/data', (req, res) => {
    formData = req.body;
});

router.get('/data', (req, res) => {
    return res.send(formData);
})


module.exports = router;