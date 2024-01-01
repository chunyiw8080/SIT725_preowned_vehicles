const db = require('./db');

db();

/**
 * 
 * @param {*} model document object model
 * @param {*} record data to be inserted into database
 */
async function createNewRecord(model, record){
    try{
        const data = await model.create(record);
        //console.log(data);
        return data;
    }catch (err){
        console.log(err);
    }
} 

/**
 * 
 * @param {*} model document object model
 * @param {*} query Conditions used to query the database
 * @param {*} deleteFunction delete method (deleteOne/deleteMany)
 */
async function deleteRecords(model, query, deleteFunction){
    try{
        const data = await deleteFunction.call(model, query);
        return data;
    }catch(err){
        console.log(err);
    }
}

/**
 * 
 * @param {*} model Document object model
 * @param {*} query Conditions used to query the database
 * @param {*} update method to update records(updateOne/updateMany)
 * @param {*} newRecord new data
 */
async function updateRecords(model, query, update, newRecord){
    try{
        const data = await update.call(model, query, newRecord);
        return data;
    }catch(err){
        console.log(err);
    }
}

/**
 * 
 * @param {*} model Document object model
 * @param {*} query Conditions used to query the database
 * @param {*} search method to find the record(findOne/findMany/findById)
 * @param {*} sortCondition Sort method (1: Ascending , -1: Descending)
 * @returns 
 */
async function findRecords(model, query, search, sortCondition){
    try{
        const data = await search.call(model, query).sort(sortCondition);
        //console.log(data);
        return data;
    }catch(err){
        console.log('Error: ', err);
        return;
    }
}

module.exports = {createNewRecord, deleteRecords, updateRecords, findRecords};