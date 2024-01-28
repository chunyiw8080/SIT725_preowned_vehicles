/** Imported Modules */
const { exec } = require('child_process');
const express = require('express');
const path = require('path');

var router = express.Router();
const scriptPath = path.join(__dirname, '..', 'public', 'python', 'app', 'prediction.py');

/**
 * Generate a child process to execute python script to get prediction price and return to front-end
 */
router.post('/', (req, res) => {
    const formData = req.body;
    console.log(formData);
    const jsonString = JSON.stringify(formData);

    // execute python script
    const pythonProcess = exec('python' + ' ' + scriptPath + ' ' + jsonString, function(err, stdout, stderr){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }
    })

    // Send form data to python script
    pythonProcess.stdin.write(jsonString);
    pythonProcess.stdin.end();

    // Read python output
    pythonProcess.stdout.on('data', function(data){
        const result = data.toString();
        console.log('result: ', result);
        return res.send(result);
    });
    
    // python exiting return code
    pythonProcess.on('close', function(code){
        console.log(`Python script exited with code ${code}`);
    });
})

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'html', 'form_uploaded.html'));
});

module.exports = router;