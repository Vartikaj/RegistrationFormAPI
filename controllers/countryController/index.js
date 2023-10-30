const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const fs = require("fs");
const util = require('util');
const path = require('../../models/country-model');
const readFile = util.promisify(fs.readFile);


exports.getInsertData = asyncHandler(async(req,res,next) => {
    try{
        let result = await readFile("./controllers/countryController/country.json", "utf8");
        const fileData = JSON.parse(result);
        var countryCode = await path.find();
        for(let datafile of fileData){
            try {
                const presentData = await path.findOne({"code": datafile.code}).exec();
                if (presentData) {
                    await fs.promises.appendFile('country-log.txt', datafile.code);
                } else {
                    await path.insertMany(datafile);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        res.status(200).json({
            success: true,
            data: 'data successfully file'
        })
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }
})


//GET THE LIST OF COUNTRY DATA
exports.getListOfData = asyncHandler(async(req, res, next) => {
    try {
        const getData = await path.find().exec();
        if(getData){
            console.log(getData);
        }
        res.status(200).json({
            success: true,
            data: getData
        })
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }
})
//=============================


