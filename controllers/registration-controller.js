
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const registrationForm = require('../models/registrationForm-model');

//=============FOR FORM SUBMISSION==============
exports.getRegistrationData = asyncHandler(async(req, res, next) => {
    try {
        const data = {
            firstName : "vartika",
            lastName : "johari",
        }
        const insertData = await registrationForm.insert({data}).exec()
            .then(result => {
                // Code to handle successful insertion
                console.log("Insertion successful:", result);
            })
            .catch(error => {
                // Handle errors from the promise chain
                console.error("Error during insertion:", error);
            });
        console.log(insertData);
        res.status(200).json({
            success: true,
            data: 'Value inserted into the database'
        });
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        });
    }
})
//==============================================

