
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');
const jwt = dependencies.jwt;


const verifyToken = async(req, res, next) => {
    try {
        const clientToken = req.headers['authorization'];
        
        if(!clientToken){
            return res.status(403).json({message : 'No Token Provided'});
        }

        jwt.verify(clientToken.split(' ')[1], process.env.JWT_SECRET, (error, decoded) => {
            if(error) { 
                return res.status(401).json({
                    message : 'Failed to authenticate token'
                });
            }

            req.decoded = decoded;
            console.log(req.decoded);
            next();
        })
    } catch (error) {
        res.status(401).json({message : error.message});  
    }
};
module.exports = verifyToken;