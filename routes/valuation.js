const { exec } = require('child_process');
const express = require('express');
const path = require('path');

var router = express.Router();
const scriptPath = path.join(__dirname, '..', 'public', 'python', 'app', 'prediction.py');

router.post('/', (req, res) => {
    const formData = req.body;
    console.log(formData);
    //res.send('Form data posted');

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
        // const content = fs.readFileSync('public/result.ejs').toString();
        // let page = ejs.render(content, {result: result});
        // res.send(page);
        res.render('valuation', {result: `The suggest price is ${result}`});

        console.log("Python Script output: ", result);
    });
    // python exiting return code
    pythonProcess.on('close', function(code){
        console.log(`Python script exited with code ${code}`);
    });
})

router.get('/', (req,res) => {
    res.render('valuation', {result: null});
});

module.exports = router;