const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');
const decipher = dependencies.decipher;

exports.findDataFromDatabase = asyncHandler(async(req,res,next) => {
    try{
        const idData = req.decoded._id;
        // the decipher function
        let decryptedData = decipher.update(idData, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        console.log("decrypted data : " + decryptedData);
        console.log(idData);
        const findValue = await registrationForm.findOne({ _id : decryptedData });
        console.log(findValue);
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
        next(error);
    } catch(error){
        res.status(200).json({
            success:false,
            mesgcode: 1,
            mesgtext: error.message,
        })
    }
})