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
            res.status(200).json({
                success: false,
                mesgcode: 2,
                message: 'Incorrect Password'
            })
        } else {
            if(contentData) {
                const token = await contentData.generateAuthToken();

                // res.cookie('token', token, {
                //     httpOnly : true, 
                //     //sameSite: 'strict', 
                //     //secure: true, 
                //     expires: new Date(Date.now() + 600000)
                // });
                
                await contentData.incrementLoginCount();
                // res.cookie('token', token, {httpOnly : true, sameSite: 'strict', secure: false});
                res.status(200).json({
                    success : true,
                    mesgcode : 1,
                    message : 'Successfully Login',
                    data : contentData,
                    token: token,
                    id : contentData._id
                });
            } else {
                res.status(200).json({
                    success : false,
                    mesgcode : 2,
                    message : 'Kindly check username' 
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