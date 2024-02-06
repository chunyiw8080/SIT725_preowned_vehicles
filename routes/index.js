const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'index.html'));
});

router.get('/chat', (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'chat.html'));
});

router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'hint.html'));
})

router.get('/filter', (req, res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'filter.html'));
});

router.post('/filter', (req, res) => {
    console.log(req.body);
})

module.exports = router;
