const express = require('express');
const path = require('path');

const router = express.Router();
var formData;

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'editor.html'));
});


router.post('/data', (req, res) => {
    formData = req.body;
});

router.get('/data', (req, res) => {
    console.log(formData);
    return res.send(formData);
})


module.exports = router;