const dependencies = require('../dependencies');
const jwt = dependencies.jwt;

const Register = require('../models/registrationForm-model');
const auth = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        const verifyUsers = jwt.verifyToken(token, process.env.SECRET_KEY);
        console.log(verifyUsers);

    } catch(error) {
        res.status(401).send(error);
    }
}

module.exports = auth;