
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');

const verifyToken = async(req, res, next) => {
    try {

        // // const token = req.cookies.token;
        // // console.log(`Token : ${token}`);
        const clientToken = req.headers;
        console.log(`ClientToken : ${clientToken}`);
        // // if(clientToken){
        // //     res.status(401).json({message : "Token is not correct from client side"});
        // // } else {
        //     const user = await registrationForm.findByToken({token : req.token});
        //     if(!user){
        //         throw new Error("Unauthorized!!");
        //     }

        //     res.json({
        //         type: true,
        //         data : user
        //     });
        // // }
    } catch (error) {
        res.status(401).json({message : error.message});  
    }
};
module.exports = verifyToken;