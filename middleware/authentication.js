const db = require('../db/crud');
const model = require('../dataModels/userModel');

async function register(req, res, next){
    let email = req.body.email;
    let phone = req.body.phone;
    try{
        const email_data = await db.findRecords(model, {email: email}, model.findOne, null);
        const phone_data = await db.findRecords(model, {phone: phone}, model.findOne, null);

        if(email_data || phone_data){
            return res.status(409).send('Conflict: email or phone exists');
        }else{
            next();
        }
    }catch(err){
        return res.status(500).send('Internal Server Error');
    }
};

function login(req, res, next){
    if(!req.session){
        return res.status(403).send('Not login');
    }else{
        next();
    }
}


module.exports = {register, login};