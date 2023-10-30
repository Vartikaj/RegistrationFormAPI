
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const registrationForm = require('../models/registrationForm-model');

//=============FOR FORM SUBMISSION==============
exports.postRegistrationData = asyncHandler(async(req, res, next) => {
    try {

        const insertData = await registrationForm.create(req.body)
            .then(result => {
                console.log("Insertion successful:", result);
            })
            .catch(error => {
                console.error("Error during insertion:", error);
            });
        res.status(200).json({
            success: true,
            data: insertData,
        });
    } catch (error) {
        console.error('Error while inserting data : ', error);
        next(error);
    }
});
//==============================================

exports.postUsername = asyncHandler(async(req,res,next) => {
    try{
        const checkData = await registrationForm.find(req.body.username);

        if(!checkData){
            res.status(200).json({
                success: true
            });
        }else {
            res.status(400).json({
                success: true,
                data: "Error because of duplicate data ", error,
            });
        }
        
    } catch (error) {
        console.error('Error while inserting data : ', error);
        next(error);
    }
})

