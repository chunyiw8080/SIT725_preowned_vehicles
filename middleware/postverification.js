const db = require('../db/crud');
const model = require('../dataModels/postModel');

/**
 * Get user uuid from session and post data, if the two uuid are same, pass control to the next method.
 */
module.exports = async function(req, res, next){
    if(!req.session){
        return res.status(403).send('Not login');
    }

    const s_uuid = req.session.uuid;

    const data = await db.findRecords(model, {_id: req.params.id}, model.findById, null);
    if(!data){
        return res.status(404).send('Not Found');
    }
    
    const p_uuid = data.uuid;

    if(s_uuid === p_uuid){
        next();
    }else{
        return res.status(403).send('Invalid Operation');
    }
    
}