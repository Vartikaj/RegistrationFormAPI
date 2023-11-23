const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const validatorPackage = require('validator');

//THIS PAKAGE IN INSTALL BECAUSE WE WANT TO GET THE UNIQUE VALUE, WHEN USER TRY TO INPUT DATA
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

module.exports = {
    mongoose : mongoose,
    express : express,
    router : router,
    validatorPackage : validatorPackage,
    uniqueValidator : uniqueValidator,
    bcrypt : bcrypt,
    rateLimit : rateLimit,
    jwt : jwt,
    cipher:cipher,
    decipher:decipher,
};