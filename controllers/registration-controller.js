
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
        const checkData = await registrationForm.findOne({
            $or:[
                {username : req.body.username},
                {addmissionno : req.body.addmissionno}
            ]
        });
        console.log(checkData);

        if (!checkData) {
            await registrationForm.create(req.body)
                .then(result => {
                    res.status(200).json({
                        success: true,
                        mesgcode: 1,
                        mesgtext: 'Insertion successful'
                    });
                })
                .catch(error => {
                    res.status(200).json({
                        success: true,
                        mesgcode: 2,
                        mesgtext: 'Error during insertion'
                    });
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
            mesgtext: 'Something wrong'
        });
    }
});
//==============================================

//LOGIN THE USER INTO THEIR ACCOUNT
exports.postLoginData = asyncHandler(async(req, res, next) => {
    try{
        console.log(req.body.username);
        const contentData = await registrationForm.findOne({username : req.body.username});
        console.log(contentData);
        if(contentData) {
            res.status(200).json({
                success : true,
                mesgcode : 1,
                mesgtext : 'Login into portal' 
            });
        } else {
            res.status(200).json({
                success : false,
                mesgcode : 2,
                mesgtext : 'Kindly check username' 
            });
        }
    } catch (error){
        req.status(200).json({
            sucess: false,
            mesgcode: error.message,
            mesgtext: 'Something wrong'
        });
        next(error);
    }
});
//==============================================

