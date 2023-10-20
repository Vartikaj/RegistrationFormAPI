const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const fs = require("fs");

const countryModel = require('../../models/country-model');

exports.getInsertData = asyncHandler(async(req,res,next) => {
    try{
        fs.readFile("country.json", "utf-8", (err, data) => {
            const dataAdded = JSON.parse(data);
            console.log(dataAdded);
        });
        res.status(200).json({
            success: true,
            data: 'data entered'
        })
        next();
    } catch (error) {
        res.status(200).json({
            success: false,
            data: error.message
        })
    }
})
