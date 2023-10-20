const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const validatorPackage = require('validator');

//THIS PAKAGE IN INSTALL BECAUSE WE WANT TO GET THE UNIQUE VALUE, WHEN USER TRY TO INPUT DATA
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

module.exports = {
    mongoose : mongoose,
    express : express,
    router : router,
    validatorPackage : validatorPackage,
    uniqueValidator : uniqueValidator,
    bcrypt : bcrypt,
    rateLimit : rateLimit,
    jwt : jwt,
};