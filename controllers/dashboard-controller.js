const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');

exports.findDataFromDatabase = asyncHandler(async(req,res,next) => {
    try{
        const idData = req.body;
        const findValue = await registrationForm.findOne({ _id : idData, });
        if(findValue){
            res.status(200).json({
                success: true,
                mesgcode: 1,
                mesgtext: findValue,
                token: req.token,
            });
        } else {
            res.status(200).json({
                success: false,
                mesgcode: 2,
                mesgtext: 'some error',
            });
        }
    } catch(error){
        res.status(400).json({
            success:false,
            mesgcode: 1,
            mesgtext: error.message,
        })
        next(error);
    }
})