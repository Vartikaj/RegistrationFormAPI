
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');

const verifyToken = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        const clientToken = req.headers.authorization;
        console.log("Token : " + token);
        console.log("Client Token : " + clientToken);
        if(token != clientToken){
            res.status(401).json({message : "Token is not correct from client side"});
        } else {
            const user = await registrationForm.findByToken(token);
            if(!user){
                throw new Error("Unauthorized!!");
            }

            req.user = user;
            next();
        }
    } catch (error) {
        res.status(401).json({message : error.message});
    }
};

module.exports = verifyToken;