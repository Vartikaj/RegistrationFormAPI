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
        
        const importedData = JSON.parse(result);
        var sizeOfArray = importedData.length;
        console.log("Size of : " + sizeOfArray);
        var countryCode = await path.find();
        var stringData = JSON.stringify(countryCode);
        console.log(stringData);
        await path.insertMany(importedData);
        
        res.status(200).json({
            success: true,
            data: 'data successfully imported'
        })
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }
})
