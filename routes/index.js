const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'index.html'));
});

router.get('/chat', (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'chat.html'));
});

module.exports = router;
