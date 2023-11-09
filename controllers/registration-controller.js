
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');
const uniqueValidator = dependencies.uniqueValidator;


//=============FOR FORM SUBMISSION==============
exports.postRegistrationData = asyncHandler(async (req, res, next) => {
    try {
        /**
         * FIRST CHECK USERNAME OR ADMISSION NO. IS ALREADY EXIST OR NOT
         */
        console.log(req);
        console.log(req.body.username);
        console.log(req.body.addmissionno);

        const checkData = await registrationForm.findOne({
            $or:[
                {username : req.body.username},
                {addmissionno : req.body.addmissionno}
            ]
        });

        if (!checkData) {
            const regData = await registrationForm(req.body);
            const token = await regData.generateAuthToken();
            const insertData = await regData.save();
            res.status(200).json({
                success: true,
                mesgcode: 1,
                mesgtext: "Data Inserted!!"
            });
        } else {
            if (checkData.username == req.body.username) {
                res.status(200).json({
                    success: true,
                    // mesgtext: (checkData) ? `${req.body.username}  username is already present` : `${req.body.addmissionno}  Addmission number is already present`,
                    mesgtext: 'Username is already present',
                    mesgcode: 4
                });
            }

            if(checkData.addmissionno == req.body.addmissionno) {
                res.status(200).json({
                    success: true,
                    mesgtext: 'Addmission number is already present',
                    mesgcode: 5
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            mesgcode: 0,
            mesgtext: 'Error Something wrong'
        });
    }
});
//==============================================



