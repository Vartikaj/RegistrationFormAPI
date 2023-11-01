const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');

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
                mesgtext : req.body.username
            });
        } else {
            res.status(200).json({
                success : false,
                mesgcode : 2,
                mesgtext : 'Kindly check username' 
            });
        }
    } catch (error){
        req.status(400).json({
            sucess: false,
            mesgcode: error.message,
            mesgtext: 'Something wrong'
        });
        next(error);
    }
});
//==============================================