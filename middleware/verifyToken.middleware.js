
const dependencies = require('../dependencies');
const registrationForm = require('../models/registrationForm-model');
const jwt = dependencies.jwt;


const verifyToken = async(req, res, next) => {
    try {
        const clientToken = req.headers['authorization'];
        
        if(!clientToken){
            return res.status(403).json({
                message : 'No Token Provided',
                mesgcode: 2
            });
        }

        jwt.verify(clientToken.split(' ')[1], process.env.JWT_SECRET, (error, decoded) => {
            if(error) { 
                return res.status(200).json({
                    message : 'Failed to authenticate token',
                    mesgcode: 2
                });
            }

            req.decoded = decoded;
            console.log(req.decoded);
            next();
        })
    } catch (error) {
        return res.status(401).json({
            message : error.message,
            mesgcode: 2
        });  
    }
};
module.exports = verifyToken;