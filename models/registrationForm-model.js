const dependencies = require('../dependencies');
const mongoose = dependencies.mongoose;
const validatorPackage = dependencies.validatorPackage;

//THIS PAKAGE IN INSTALL BECAUSE WE WANT TO GET THE UNIQUE VALUE, WHEN USER TRY TO INPUT DATA
const uniqueValidator = dependencies.uniqueValidator;
const bcrypt = dependencies.bcrypt;
const rateLimit = dependencies.rateLimit;
const jwt = dependencies.jwt;

//THIS WE DONE BECAUSE WE WANT TO CALL SCHEMA INSIDE ANOTHER SCHEMA
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    streetAddress : {
        type: String,
        maxLength: [100, "must be 100 character long"],
        trim: true,
        match: [/^[A-Za-z0-9 .-/]+$/, "Street address must contain letters (upper or lower case), space or dot operator or '-' operator, or '/' operator"],
        required: true
    },
    country: {
        type: String,
        required:true,

    },
    state:{
        type: String,
        required: true,
        trim: true,
        maxLength: [25, 'State must be 25 characters long']
    },
    city:{
        type: String,
        required: true,
        trim: true,
        maxLength: [25, 'City must be 25 characters long']
    },
    postalCode: {
        type: Number,
        required: true,
        trim: true,
        maxLength: [30, 'Postal code must be 30 character long']
    }
});

const registrationForm = new Schema({
    firstName: {
        type: String,
        maxLength : [50, 'First name must be 50 character long'],
        trim: true,
    },
    lastName: {
        type: String,
        maxLength: [50, 'First name must be 50 character long'],
        trim: true,
    },
    username: {
        type: String,
        maxLength: [50, 'Username must be 50 character long'],
        match: [/^[A-Za-z0-9 .]+$/, "Username must contain letters (upper or lower case), space or dot operator"],
        trim: true,
    },
    addmissionno : {
        type: Number,
        match: [/\d{10}/,"Addmission number should only have digits'"],
        minLength: [10,"Addmission number have maximum 10 digits"],
        trim: true,
        require: true,
        index: true,
        unique: true
    },
    address: [addressSchema],
    isActive: Boolean,
});

//THIS IS FOR UNIQUE VALUE ACCEPTOR
registrationForm.plugin(uniqueValidator, {message: '{PATH} : {VALUE} is already exists!!!'})

const registrationFormModel = mongoose.model('registrationForm', registrationForm);

module.exports = registrationFormModel;

