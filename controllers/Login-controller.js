const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');

//LOGIN THE USER INTO THEIR ACCOUNT
exports.postLoginData = asyncHandler(async(req, res, next) => {
    try{
        const password = req.body.password;
        const contentData = await registrationForm.findOne({username : req.body.username});
        const isMatch = await contentData.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid username or password'})
        } else {
            console.log(contentData);
            if(contentData) {
                const token = contentData.generateAuthToken();
                console.log(token);
                await contentData.incrementLoginCount();

                res.cookie('token', token, {httpOnly : true, sameSite: 'strict', secure: false});

                res.status(200).json({
                    success : true,
                    mesgcode : 1,
                    mesgtext : req.body,
                    data : contentData,
                    tokn

                });
            } else {
                res.status(200).json({
                    success : false,
                    mesgcode : 2,
                    mesgtext : 'Kindly check username' 
                });
            }
        }
    } catch (error){
        res.status(400).json({
            sucess: false,
            mesgcode: error.message,
            mesgtext: 'Something wrong'
        });
        next(error);
    }
});
//==============================================